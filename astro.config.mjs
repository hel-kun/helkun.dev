import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
const mdxIntegrations = [AutoImport({
  imports: ["./src/components/blog/card/UrlCard.astro", "./src/components/blog/card/TwitterCard.astro", "./src/components/blog/card/ImgCard.astro", "./src/components/blog/Blockquote.astro", "./src/components/blog/Box.astro", "./src/components/blog/WarningBox.astro", "./src/components/ui/YoutubePlayer.astro"]
}), mdx()];


// https://astro.build/config
export default defineConfig({
  integrations: [...mdxIntegrations, tailwind(), react()],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});