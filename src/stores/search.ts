import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    keyword: '' as string,
    selected_word: '' as string,
    loading: false as boolean
  }),

  actions: {
    async setKeyword (keyword: string) {
      this.keyword = keyword
    },
    async setSelectedWord (word: string) {
      this.selected_word = word
    },
    async setDefaultKeyword (defaultValue?: string) {
      return defaultValue !== undefined
        ? (this.keyword = defaultValue)
        : ''
    },
    async setLoading (loading: boolean) {
      this.loading = loading
    }
  }
})
