import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";

const mdxIntegrations = [
  AutoImport({
    imports: [
      "./src/components/blog/UrlCard.astro",
      "./src/components/blog/TwitterCard.astro",
      "./src/components/blog/ImgCard.astro",
      "./src/components/blog/Blockquote.astro",
      "./src/components/blog/Box.astro",
    ],
  }),
  mdx(),
]

// https://astro.build/config
export default defineConfig({
  integrations: [...mdxIntegrations, tailwind()],
});