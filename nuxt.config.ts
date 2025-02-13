// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: "老狗图片工厂",
      link: [
        {
          rel: "manifest",
          href: "/manifest.json",
        },
        {
          rel: "shortcut icon",
          href: "/favicon.png",
        },
        {
          rel: "icon",
          href: "/favicon.png",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  $development: {},
  $production: {},
  css: ["~/assets/css/base.css"],
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      domain: "",
    },
  },
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],
  // imports: {
  //   autoImport: true,
  // },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "zh",
        name: "简体中文",
      },
    ],
    vueI18n: "./i18n.config.ts",
    // By default, Nuxt i18n module attempts to redirect users to their preferred language by detecting their browser's language. This is controlled by the detectBrowserLanguage option.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
});
