// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "老狗图片工厂",
      link: [
        {
          rel: "shortcut icon",
          href: "favicon.png",
        },
        {
          rel: "icon",
          href: "favicon.png",
        },
        {
          rel: "manifest",
          href: "manifest.json",
        },
      ],
    },
  },
  // dir: { public: "public" },
  nitro: {
    prerender: {
      ignore: ["/manifest.json"],
    },
  },
  css: ["~/assets/css/base.css"],
  runtimeConfig: {
    public: {
      domain: "",
    },
  },
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],

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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
});
