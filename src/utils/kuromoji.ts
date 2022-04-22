import { KuromojiBuilder, Tokenizer } from './KuromojiTypes'

declare const kuromoji: KuromojiBuilder

export const startKuromoji = async (): Promise<Tokenizer> => {
  console.log('Loading Kuromoji ...')

  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: '/dict' })
      .build(async (err: boolean, tokenizer: Tokenizer) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }

        console.log('Kuromoji loaded')

        resolve(tokenizer)
        return tokenizer
      })
  })
}
