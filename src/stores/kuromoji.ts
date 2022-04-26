import { defineStore } from 'pinia'
import * as kuromoji from '@/utils/kuromoji'
import { Tokenizer, Tokenize } from '@/utils/kuromoji-types'

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
    },
    async getFirstWord (tokens: Tokenize[]) {
      return tokens.find(token =>
        token.pos !== '記号' &&
        token.pos_detail_1 !== '空白' &&
        token.pos_detail_1 !== '数'
      )
    }
  }
})
