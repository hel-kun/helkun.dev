import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";
import rehypeSlug from "rehype-slug";
import { css } from '@emotion/react';
import vue from "@astrojs/vue";
const mdxIntegrations = [AutoImport({
  imports: ["./src/components/card/UrlCard.astro", "./src/components/card/TwitterCard.astro", "./src/components/card/ImgCard.astro", "./src/components/ui/Blockquote.astro", "./src/components/box/Box.astro", "./src/components/box/WarningBox.astro", "./src/components/ui/YoutubePlayer.astro"]
}), mdx()];


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), expressiveCode(), ...mdxIntegrations, vue()],
  markdown: {
    rehypePlugins: [rehypeSlug]
  }
});