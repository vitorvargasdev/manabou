import { KuromojiBuilder, Tokenizer } from './KuromojiTypes'

declare const kuromoji: KuromojiBuilder

export const startKuromoji = async (): Promise<Tokenizer> => {
  console.log('Loading Kuromoji ...')

  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: '/dict' })
      .build(async (err: boolean, tokenizer: Tokenizer) => {
        if (err) {
          console.log(tokenizer)
          reject(tokenizer)
        }

        console.log('Kuromoji loaded')

        resolve(tokenizer)
      })
  })
}
