<script setup lang="ts">
const { data: wikiList } = await useAsyncData(() => queryCollection("wiki").order("date", "DESC").all());
</script>

<template>
	<ContentRenderer v-for="wiki in wikiList" :value="wiki" />

	<template v-for="wiki in wikiList" :key="wiki.id">
		<ULink :to="wiki.path">
			{{ wiki.title }}
		</ULink>
		- {{ wiki.date }} <i v-if="wiki.lastEdited">(last edited: {{ wiki.lastEdited }})</i>
		<!-- {{ wiki }} -->
	</template>
</template>
