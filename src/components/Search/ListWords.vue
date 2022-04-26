<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useKuromojiStore } from '@/stores/kuromoji'
import { useSearchStore } from '@/stores/search'
import { furiganaToKuromoji } from '@/utils/analysis'
import { Tokenize } from '@/utils/kuromoji-types'

const kuromoji = useKuromojiStore()
const searchStore = useSearchStore()

const listWords = ref<Tokenize[]>()
const selectedWord = ref('')

const tokenizeListWords = async () => {
  listWords.value = await kuromoji.tokenize(searchStore.keyword)
  selectedWord.value = getFirstWord(listWords.value).surface_form
}

const getFirstWord = (tokens: Tokenize[]) => {
  return tokens.filter(token =>
    token.pos !== '記号' &&
        token.pos_detail_1 !== '空白' &&
        token.pos_detail_1 !== '数'
  )[0]
}

const selectWord = (word: string) => {
  selectedWord.value = word
}

watch(() => searchStore.keyword, async () => await tokenizeListWords())

onMounted(async () => {
  await tokenizeListWords()
})
</script>

<template>
    <div class="text-3xl text-center">
        <div v-for="(item, index) in listWords" :key="index" class="inline-block mt-4 m-1">
            <span class="japanese_tokenizer_normal" v-if="item.basic_form === '*' && item.pos_detail_1 === '数'"
                v-html="furiganaToKuromoji(item)" />

            <span class="japanese_tokenizer_selected" v-if="
                item.surface_form === selectedWord
            " v-html="furiganaToKuromoji(item)" />

            <span class="japanese_tokenizer" v-if="
                item.surface_form !== selectedWord &&
                item.pos !== '記号' &&
                item.pos_detail_1 !== '空白' &&
                !(item.basic_form === '*' &&
                    item.pos_detail_1 === '数'
                )
            "
            @click.stop="selectWord(item.surface_form)"
            v-html="furiganaToKuromoji(item)" />

            <span data-tooltip="" v-if="item.pos === '記号' && item.pos_detail_1 === '空白'" v-text="item.surface_form" />
        </div>
    </div>
</template>
