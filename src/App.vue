<script setup lang="ts">
import { onMounted } from 'vue'
import * as kuromoji from './utils/kuromoji'
import { Tokenizer } from './utils/KuromojiTypes'

onMounted(async () => {
  const tokenizer: Tokenizer = await kuromoji.startKuromoji()
  console.log(tokenizer.tokenize('こんにちは')[0].basic_form)
  // console.log(tokenizer.tokenize('こんにちは'))
})

</script>

<template>
  <div class="p-4">
    <img
      src="./assets/logo.png"
      alt=""
      class="w-40 mx-auto"
    >

    <div class="md:p-4 flex flex-row justify-center">
      <input
        class="w-full md:w-3/5 rounded-lg shadow-md p-4 text-gray-600"
        type="text"
        placeholder="Digite aqui!"
      >

      <button class="ml-2 p-4 rounded-md shadow-md bg-green-500 hover:bg-green-600 text-white">
        Pesquisar
      </button>
    </div>

    <div class="my-6 md:my-2 w-full flex flex-row justify-center">
      <div class="p-4 w-full md:w-4/5 bg-white rounded-lg shadow-lg">
        <router-view />
      </div>
    </div>

    <div class="text-md mx-auto p-4 md:mt-6 w-full md:w-4/5 text-center bg-white rounded-lg shadow-lg">
      Manabou está sendo desenvolvido com amor e carinho por <a
        href="https://instalando.dev/"
        target="_blank"
        class="text-green-600 hover:text-green-500"
      >Vitor Soares (Instalando)</a>.
    </div>
  </div>
</template>
