<script setup lang="ts">
const { data: newsList } = await useAsyncData(() => queryCollection("news").order("date", "DESC").all());
</script>

<template>
	<ContentRenderer v-for="news in newsList" :value="news" />
</template>
