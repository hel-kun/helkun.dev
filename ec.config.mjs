import { defineEcConfig } from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
    themes: ["dark-plus"],
    plugins: [
        pluginCollapsibleSections(),
        //pluginLineNumbers(),
    ],
    defaultLocale: "ja",
    styleOverrides: {},
})