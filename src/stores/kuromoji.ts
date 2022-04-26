import { defineStore } from 'pinia'
import * as kuromoji from '@/utils/kuromoji'
import { Tokenizer } from '@/utils/kuromoji-types'

export const useKuromojiStore = defineStore('kuromoji', {
  state: () => ({
    tokenizer: {} as Tokenizer
  }),

  actions: {
    async loadTokenizer () {
      this.tokenizer = await kuromoji.startKuromoji()
    },
    async tokenize (text: string) {
      return this.tokenizer.tokenize(text)
    }
  }
})
