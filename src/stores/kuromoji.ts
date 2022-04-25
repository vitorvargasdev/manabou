import { defineStore } from 'pinia'
import * as kuromoji from '../utils/kuromoji'
import { Tokenizer } from '../utils/KuromojiTypes'

export const useKuromojiStore = defineStore('kuromoji', {
  state: () => ({
    tokenizer: {} as Tokenizer
  }),

  actions: {
    async loadTokenizer () {
      this.tokenizer = await kuromoji.startKuromoji()
    }
  }
})
