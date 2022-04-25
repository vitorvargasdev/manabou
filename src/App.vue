<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useKuromojiStore } from '@/stores/kuromoji'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const kuromoji = useKuromojiStore()

const keyword = ref('') // * A word or phrase to tokenize and search
const loading = ref(true)

const setDefaultKeyword = () => {
  keyword.value = route.query.keyword !== undefined
    ? String(route.query.keyword)
    : ''
}

const search = async (keyword: string) => router.push(
  {
    name: 'search',
    query: { keyword }
  }
)

onMounted(async () => {
  await kuromoji.loadTokenizer()
  setDefaultKeyword()
  loading.value = false
})
</script>

<template>
  <div v-show="loading" class="flex items-center justify-center w-full h-full z-50 absolute bg-black bg-opacity-80">
    <div class="flex justify-center items-center space-x-1 text-sm text-white">

      <svg fill='none' class="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
        <path clip-rule='evenodd'
          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
          fill='currentColor' fill-rule='evenodd' />
      </svg>

      <div>Carregando dicionário ...</div>
    </div>
  </div>

  <div class="p-4">
    <img src="./assets/logo.png" alt="" class="w-40 mx-auto">

    <div class="md:p-4 flex flex-row justify-center">
      <input v-model="keyword" class="w-full md:w-3/5 rounded-lg shadow-md p-4 text-gray-600" type="text"
        placeholder="Digite aqui!">

      <button @click.stop="search(keyword)"
        class="ml-2 p-4 rounded-md shadow-md bg-green-500 hover:bg-green-600 text-white">
        Pesquisar
      </button>
    </div>

    <div v-if="loading" class="flex items-center justify-center">
      <svg fill='none' class="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
        <path clip-rule='evenodd'
          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
          fill='currentColor' fill-rule='evenodd' />
      </svg>
    </div>

    <div v-if="!loading" class="my-6 md:my-2 w-full flex flex-row justify-center">
      <div class="p-4 w-full md:w-4/5 bg-white rounded-lg shadow-lg">
        <router-view />
      </div>
    </div>

    <div class="text-md mx-auto p-4 md:mt-6 w-full md:w-4/5 text-center bg-white rounded-lg shadow-lg">
      Manabou está sendo desenvolvido com amor e carinho por <a href="https://instalando.dev/" target="_blank"
        class="text-green-600 hover:text-green-500">Vitor Soares (Instalando)</a>.
    </div>
  </div>
</template>
