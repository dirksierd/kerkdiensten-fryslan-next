import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  modules: ['nitro-cloudflare-dev'],
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-sky-100',
      },

      htmlAttrs: {
        lang: 'nl',
      },

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;800&display=swap',
        },
      ],
    },
  },
})
