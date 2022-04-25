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
        <span v-for="(item, index) in tokenizedKeywords" :key="index">
            <span>{{ item.surface_form }}</span>
        </span>
    </div>
</template>
