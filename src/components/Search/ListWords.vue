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
  selectedWord.value = getFirstWord(listWords.value) || ''
}

const getFirstWord = (tokens: Tokenize[]): string => {
  return tokens.filter(token =>
    token.pos !== '記号' &&
        !(token.surface_form).match(/[a-z]/i) &&
        token.pos_detail_1 !== '空白' &&
        !(token.surface_form).match(/[0-9]/i)
  )[0]?.surface_form || ''
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
            <span class="japanese_tokenizer_normal" v-if="(item.surface_form).match(/[0-9]/i) || (item.surface_form).match(/[a-z]/i)"
                v-html="furiganaToKuromoji(item)" />

            <span class="japanese_tokenizer_selected" v-if="
                item.surface_form === selectedWord
            " v-html="furiganaToKuromoji(item)" />

            <span class="japanese_tokenizer" v-if="
                item.surface_form !== selectedWord &&
                item.pos !== '記号' &&
                !(item.surface_form).match(/[a-z]/i) &&
                item.pos_detail_1 !== '空白' &&
                !(item.surface_form).match(/[0-9]/i)
            "
            @click.stop="selectWord(item.surface_form)"
            v-html="furiganaToKuromoji(item)" />

            <span data-tooltip="" v-if="item.pos === '記号' && item.pos_detail_1 === '空白'" v-text="item.surface_form" />
        </div>
    </div>
</template>
