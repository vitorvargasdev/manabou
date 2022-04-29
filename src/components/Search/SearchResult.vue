<script setup lang="ts">
import { watchEffect, watch, ref } from 'vue'
import { useKuromojiStore } from '@/stores/kuromoji'
import { useSearchStore } from '@/stores/search'
import { JapaneseToFurigana } from '@/utils/analysis'
import { Word } from '@/utils/word-types'
import axios from 'axios'

const kuromoji = useKuromojiStore()
const searchStore = useSearchStore()

watch(() => searchStore.selected_word, async (val) => {
  await fetchWord((await kuromoji.tokenize(val))[0].basic_form)
})

const fetchedData = ref<Word[]>()

const fetchWord = async (word: string) => {
  searchStore.setLoading(true)

  await axios.get(`https://manabou.herokuapp.com/fetch_word?word=${word}`)
    .then(res => {
      fetchedData.value = res.data
    })
    .finally(() => {
      searchStore.setLoading(false)
    })
}
</script>

<template>
    <div class="mt-4 border-t">
        <div class="grid sm:grid-cols-1 md:grid-cols-12 my-4 p-4" v-for="item in fetchedData" :key="item.id">
            <div class="md:col-span-4 lg:col-span-3">
                <span class="japanese text-3xl"
                    v-if="item.readings[0].kanji"
                    v-html="JapaneseToFurigana(item.readings[0].kanji, item.readings[0].kana)" />
                <span v-text="item.readings[0].kana" class="japanese text-3xl" v-else />
            </div>
            <div class="col-span-8 p-4">
                <div v-for="(sense, index) in item.senses" :key="sense.id" class="mb-4">
                  <div class="text-gray-400 text-xs font-semibold">{{ sense.part_of_speech }}</div>
                  <div class="inline-block">
                    <span class="text-sm text-gray-500">{{ index + 1 }}. </span>
                    <span class="text-lg font-medium text-gray-900">{{ sense.definition }}</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
