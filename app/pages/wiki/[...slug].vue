<script setup lang="ts">
const route = useRoute();
console.log(route);

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("wiki").path(route.path).first();
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});

console.log(page);
</script>

<template>
	{{ $route.params.slug }}
	<template v-if="page">
		<ContentRenderer :value="page" />
	</template>
	<template v-else>
		<div class="empty-page">
			<h1>Page Not Found</h1>
			<p>Oops! The content you're looking for doesn't exist.</p>
			<NuxtLink to="/">Go back home</NuxtLink>
		</div>
	</template>
</template>
