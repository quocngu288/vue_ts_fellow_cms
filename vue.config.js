const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV != 'production',
  publicPath:
    process.env.NODE_ENV === "staging"
      ? "/cms/"
      : "/",

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
      enableInSFC: true
    }
  }
})
