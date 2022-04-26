import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    keyword: '' as string,
    selected_word: '' as string
  }),

  actions: {
    async setDefaultKeyword (defaultValue?: string) {
      return defaultValue !== undefined
        ? (this.keyword = defaultValue)
        : ''
    }
  }
})
