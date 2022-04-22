export type Tokenizer = {
    tokenize: (
        text: string
    ) => object;
}

export type KuromojiBuild = {
    build: (
        token: (
            err: boolean,
            tokenizer: Tokenizer
        ) => object
    ) => Tokenizer;
}

export type KuromojiBuilder = {
    builder: (
        dicPath: {
            dicPath: string
        }
    ) => KuromojiBuild
}
