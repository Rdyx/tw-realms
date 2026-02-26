<script setup lang="ts">
const colorMode = useColorMode();
const theme = useState<string>("light");

onMounted(() => {
	theme.value = localStorage.getItem("theme") || colorMode.value;
	colorMode.preference = theme.value;
});

const switchTheme = () => {
	theme.value = localStorage.getItem("theme") === "light" ? "dark" : "light";
	colorMode.preference = theme.value;
	localStorage.setItem("theme", theme.value);
};
</script>

<template>
	<UApp>
		<h1 class="text-3xl font-bold underline">Hello world!</h1>

		<UButton
			size="sm"
			color="primary"
			variant="ghost"
			:icon="theme === 'light' ? 'i-lucide-sun' : 'i-lucide-moon'"
			@click="switchTheme"
		/>

		<NuxtRouteAnnouncer />
		<NuxtPage />
	</UApp>
</template>
