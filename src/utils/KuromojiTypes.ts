type Tokenize = {
    'basic_form': string
    'conjugated_type': string
    pos: string
    'pos_detail_1': string
    'pos_detail_2': string
    'pos_detail_3': string
    pronunciation: string
    reading: string
    'surface_form': string
    'word_id': string
    'word_position': string
    'word_type': string
}

type Tokenizer = {
    tokenize: (
        text: string
    ) => Tokenize[]
}

type KuromojiBuild = {
    build: (
        token: (
            err: boolean,
            tokenizer: Tokenizer
        ) => object
    ) => Tokenizer
}

type DicPath = {
    dicPath: string
}

type KuromojiBuilder = {
    builder: (
        dicPath: DicPath
    ) => KuromojiBuild
}

export { Tokenizer, KuromojiBuilder }
