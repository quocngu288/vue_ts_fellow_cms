import { createApp } from 'vue'
import App from '@/App.vue'
import { setupRouter } from '@/router'
import { setupPinia } from '@/plugins/pinia'
import { setupAntDesign } from '@/plugins/ant-design'
import { setupAntDesignIcon } from '@/plugins/ant-design-icon'
import { setupVeeValidate } from '@/plugins/vee-validate'
import { setupGlobalComponent } from '@/plugins/global-component'
import { setupI18n } from '@/plugins/i18n'
import { setGlobalFilter } from '@/shared/filters'

/* ============
 * CSS Default
 * ============
 */
import '@/assets/scss/main.scss'
import '@/plugins/axios'

async function setupApp () {
  const app = createApp(App)
  // Configure Router
  setupRouter(app)

  // Configure Pinia
  setupPinia(app)

  // Configure Ant Design
  setupAntDesign(app)

  // Configure Ant Design Icon
  setupAntDesignIcon(app)

  // Configure Vee Validate
  setupVeeValidate(app)

  // Configure Global Components ( create with prefix Base... )
  setupGlobalComponent(app)

  // Configure Global Filters
  setGlobalFilter(app)

  // Configure i18n
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)
  app.mount('#app')
}
setupApp().then()
