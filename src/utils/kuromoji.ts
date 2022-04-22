declare const kuromoji: any

export const startKuromoji = async () => {
  console.log('Loading Kuromoji ...')

  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: '/dict' })
      .build(async (err: boolean, tokenizer: any) => {
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
