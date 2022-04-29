type Reading = {
    kanji: string
    kana: string
}

type Sense = {
    id: number
    definition: string
    'part_of_speech': string
}

type Word = {
    id: number
    readings: Reading[]
    senses: Sense[]
}

export { Word }
