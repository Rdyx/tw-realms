import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
	collections: {
		news: defineCollection({
			type: "page",
			source: "news/*.md",
			schema: z.object({
				date: z.string(),
			}),
		}),
		wiki: defineCollection({
			type: "page",
			source: "wiki/*.md",
			schema: z.object({
				date: z.string(),
				lastEdited: z.string(),
			}),
		}),
	},
});
