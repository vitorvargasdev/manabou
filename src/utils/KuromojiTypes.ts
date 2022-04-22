type Tokenizer = {
    tokenize: (
        text: string
    ) => object;
}

type KuromojiBuild = {
    build: (
        token: (
            err: boolean,
            tokenizer: Tokenizer
        ) => object
    ) => Tokenizer;
}

type KuromojiBuilder = {
    builder: (
        dicPath: {
            dicPath: string
        }
    ) => KuromojiBuild
}

export { Tokenizer, KuromojiBuilder }
