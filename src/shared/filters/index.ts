import { App } from 'vue'
import dayjs from 'dayjs'

const filters = {
  momentJa (date: string) {
    const locale = localStorage.getItem('locale')
    const format = locale !== 'ja' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY年MM月DD日 HH:mm:ss'
    return date ? dayjs(date).format(format) : null
  }
}

export const setGlobalFilter = (app: App) => {
  app.config.globalProperties.$filters = filters
}
