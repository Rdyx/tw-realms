export default defineAppConfig({
	ui: {
		button: {
			slots: {
				base: ["cursor-pointer"],
			},
		},
		navigationMenu: {
			slots: {
				childLinkDescription: ["italic"],
			},
		},
	},
});
