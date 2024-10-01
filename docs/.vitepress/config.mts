import fs from 'fs';
import { withMermaid } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
// Uncomment this to enable mermaid inside your site when this is solved: https://github.com/mermaid-js/mermaid/issues/4320
// export default withMermaid({
export default {
	vue: {
		template: {
			compilerOptions: {
				// treat all tags with a dash as custom elements
				isCustomElement: tag => tag.includes('-'),
			},
		},
	},
	vite: {
		optimizeDeps: {
			include: ['mermaid'],
		},
	},
	base: '/notifications',
	title: '@darksoil-studio/notifications',
	description: 'Notifications zome for holochain apps',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config

		sidebar: [
			{
				text: 'Setup',
				link: '/setup.md',
			},
			{
				text: 'API Reference',
				items: [
					{
						text: 'Integrity Zome',
						link: '/backend/doc/notifications_integrity/index.html',
						target: '_blank',
					},
					{
						text: 'Coordinator Zome',
						link: '/backend/doc/notifications/index.html',
						target: '_blank',
					},
					{
						text: 'Frontend',
						items: [
							{
								text: 'NotificationsStore',
								link: '/notifications-store.md',
							},
							{
								text: 'Elements',
								items: fs
									.readdirSync('./elements')
									.filter(file => file.endsWith('.md'))
									.map(el => ({
										text: el.split('.md')[0],
										link: `/elements/${el}`,
									})),
							},
						],
					},
				],
			},
		],

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/darksoil-studio/notifications',
			},
		],
		search: {
			provider: 'local',
		},
	},
	head: [
		[
			'script',
			{},
			// Synchronize the vitepress dark/light theme with the shoelace mode
			`
  function syncTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      const isShoelaceDark = document.documentElement.classList.contains('sl-theme-dark');
      if (isDark && !isShoelaceDark) document.documentElement.classList = "dark sl-theme-dark";
      if (!isDark && isShoelaceDark) document.documentElement.classList = "";
  }
  const attrObserver = new MutationObserver((mutations) => {
    mutations.forEach(mu => {
      if (mu.type !== "attributes" && mu.attributeName !== "class") return;
      syncTheme();
    });
  });
  attrObserver.observe(document.documentElement, {attributes: true});
  syncTheme();
        `,
		],
	],
};
