import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    keyword: '' as string,
    selected_word: '' as string
  }),

  actions: {
    async setKeyword (keyword: string) {
      this.keyword = keyword
    },
    async setDefaultKeyword (defaultValue?: string) {
      return defaultValue !== undefined
        ? (this.keyword = defaultValue)
        : ''
    },
    async setDefaultWord (defaultValue?: string) {
      return defaultValue !== undefined
        ? (this.selected_word = defaultValue)
        : ''
    }
  }
})
