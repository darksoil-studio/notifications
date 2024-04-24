import { TemplateResult } from 'lit';

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import type { ReactiveElement } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { DirectiveResult, directive } from 'lit/directive.js';
import { Signal } from 'signal-polyfill';

import { effect } from './signals';

class SubscribeDirective extends AsyncDirective {
	private __signal?: Signal.State<any> | Signal.Computed<any>;
	private __unsubscribe?: () => void;
	private __template?: (value: any) => TemplateResult;

	override render<T>(
		signal: Signal.State<T> | Signal.Computed<T>,
		template: (value: T) => TemplateResult,
	) {
		if (signal !== this.__signal) {
			const oldUnsubscribe = this.__unsubscribe;
			this.__signal = signal;
			this.__template = template;

			this.__unsubscribe = effect(() => {
				const value = this.__signal!.get();
				// The subscribe() callback is called synchronously during subscribe.
				// Ignore the first call since we return the value below in that case.
				this.setValue(template(value));
			});

			if (oldUnsubscribe) {
				oldUnsubscribe();
			}
		}

		return template(this.__signal.get());
	}

	protected override disconnected(): void {
		this.__unsubscribe?.();
	}

	protected override reconnected(): void {
		// Since we disposed the subscription in disconnected() we need to
		// resubscribe here. We don't ignore the synchronous callback call because
		// the signal might have changed while the directive is disconnected.
		//
		// There are two possible reasons for a disconnect:
		//   1. The host element was disconnected.
		//   2. The directive was not rendered during a render
		// In the first case the element will not schedule an update on reconnect,
		// so we need the synchronous call here to set the current value.
		// In the second case, we're probably reconnecting *because* of a render,
		// so the synchronous call here will go before a render call, and we'll get
		// two sets of the value (setValue() here and the return in render()), but
		// this is ok because the value will be dirty-checked by lit-html.

		this.__unsubscribe = effect(() => {
			const value = this.__signal!.get();
			// The subscribe() callback is called synchronously during subscribe.
			// Ignore the first call since we return the value below in that case.
			this.setValue(this.__template!(value));
		});
	}
}

/**
 * Renders a signal and subscribes to it, updating the part when the store
 * changes.
 */
export const watch = directive(SubscribeDirective) as <T>(
	signal: Signal.State<T> | Signal.Computed<T>,
	template: (value: T) => TemplateResult,
) => DirectiveResult<typeof SubscribeDirective>;

type ReactiveElementConstructor = abstract new (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...args: any[]
) => ReactiveElement;

/**
 * Adds the ability for a LitElement or other ReactiveElement class to
 * watch for access to Preact signals during the update lifecycle and
 * trigger a new update when signals values change.
 */
export function SignalWatcher<T extends ReactiveElementConstructor>(
	Base: T,
): T {
	abstract class SignalWatcher extends Base {
		private __dispose?: () => void;
		private w = new Signal.subtle.Watcher(() => {
			this.requestUpdate();
		});

		override performUpdate() {
			// ReactiveElement.performUpdate() also does this check, so we want to
			// also bail early so we don't erroneously appear to not depend on any
			// signals.
			if (this.isUpdatePending === false) {
				return;
			}
			// If we have a previous effect, dispose it
			const lastDispose = this.__dispose;

			const c = new Signal.Computed(() => {
				super.performUpdate();
			});
			this.w.watch(c);
			this.__dispose = () => {
				this.w.unwatch(c);
			};
			c.get();
			lastDispose?.();
		}

		override connectedCallback(): void {
			super.connectedCallback();
			// In order to listen for signals again after re-connection, we must
			// re-render to capture all the current signal accesses.
			this.requestUpdate();
		}

		override disconnectedCallback(): void {
			super.disconnectedCallback();
			this.__dispose?.();
		}
	}
	return SignalWatcher;
}
