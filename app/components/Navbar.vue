<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const { data: wikiList } = await useAsyncData(() => queryCollection("wiki").order("title", "ASC").all());

console.log(wikiList.value);
// menu items used for both desktop and drawer menu
const menuItems = computed<NavigationMenuItem[]>(() => [
	{
		label: "News",
		to: "/",
		active: route.path === "/",
	},
	{
		label: "Wiki",
		active: route.path.startsWith("/wiki"),
		children: wikiList.value?.map((wiki) => ({
			to: wiki.path,
			label: wiki.title,
			description: `${wiki.lastEdited ? "Last update: " + wiki.lastEdited : "Creation date: " + wiki.date}`,
			active: route.path === wiki.path,
		})),
	},
	{
		label: "Tools",
		to: "/tools",
		active: route.path.startsWith("/tools"),
	},
]);
</script>

<template>
	<UHeader title="tw-realms" to="/" mode="slideover" class="shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur">
		<!-- center navigation for desktop -->
		<UNavigationMenu
			class="w-2xl justify-center"
			variant="link"
			content-orientation="vertical"
			content-variant="link"
			:items="menuItems"
		/>

		<!-- right slot for extra controls -->
		<template #right>
			<UColorModeButton size="sm" variant="ghost" />
			<UButton
				color="neutral"
				variant="ghost"
				to="https://github.com/Rdyx/tw-realms"
				target="_blank"
				icon="i-simple-icons-github"
				aria-label="GitHub"
			/>
		</template>

		<!-- drawer content: vertical menu -->
		<template #body>
			<UNavigationMenu class="-mx-2.5" orientation="vertical" :items="menuItems" />
		</template>
	</UHeader>
</template>
