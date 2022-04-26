<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useKuromojiStore } from '@/stores/kuromoji'
import { useSearchStore } from '@/stores/search'
import { furiganaToKuromoji } from '@/utils/analysis'
import { Tokenize } from '@/utils/kuromoji-types'

const kuromoji = useKuromojiStore()
const searchStore = useSearchStore()

const listWords = ref<Tokenize[]>()

const tokenizeListWords = async () => {
  listWords.value = await kuromoji.tokenize(searchStore.keyword)
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

            <span class="japanese_tokenizer"
                v-if="item.pos !== '記号' && item.pos_detail_1 !== '空白' && !(item.basic_form === '*' && item.pos_detail_1 === '数')"
                v-html="furiganaToKuromoji(item)" />

            <span data-tooltip="" v-if="item.pos === '記号' && item.pos_detail_1 === '空白'" v-text="item.surface_form" />
        </div>
    </div>
</template>
