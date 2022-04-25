<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useKuromojiStore } from '@/stores/kuromoji'
import { Tokenize } from '../utils/KuromojiTypes'

const kuromoji = useKuromojiStore()
const route = useRoute()

const keyword = ref('')
const tokenizedKeywords = ref<Tokenize[]>()

const tokenizeKeywords = async () => {
  keyword.value = String(route.query.keyword)
  tokenizedKeywords.value = kuromoji.tokenizer.tokenize(keyword.value)
  console.log(tokenizedKeywords.value)
}

watch(() => route.query, () => tokenizeKeywords())

onMounted(async () => {
  tokenizeKeywords()
})
</script>

<template>
    <!-- <div class="flex items-center justify-center w-full h-full z-50 absolute left-0 top-0 bg-black bg-opacity-80">
        <div class="flex justify-center items-center space-x-1 text-sm text-white">

            <svg fill='none' class="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                <path clip-rule='evenodd'
                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                    fill='currentColor' fill-rule='evenodd' />
            </svg>

            <div>Pesquisando ...</div>
        </div>
    </div> -->

    <div class="p-4">
        <div class="text-2xl text-center">
            <span v-for="(item, index) in tokenizedKeywords" :key="index" class="mr-1">
                <span class="japanese_tokenizer_proper_noun" v-if="item.pos === '名詞' && item.pos_detail_1 === '固有名詞'" v-text="item.surface_form" />

                <span class="japanese_tokenizer_noun" v-if="item.pos === '名詞' && item.pos_detail_1 !== '固有名詞'" v-text="item.surface_form" />

                <span class="japanese_tokenizer_adjetive" v-if="item.pos === '助詞'" v-text="item.surface_form" />
                <span class="japanese_tokenizer_verb" v-if="item.pos === '動詞'" v-text="item.surface_form" />

                <span class="japanese_tokenizer_white_space" v-if="item.pos === '記号' && item.pos_detail_1 === '空白'" />
            </span>
        </div>
    </div>
</template>
