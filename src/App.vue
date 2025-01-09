<script setup>
import { ref } from 'vue';
import Table from './components/Table.vue'
import PairModal from './components/PairModal.vue'
import PrimaryButton from './components/PrimaryButton.vue';

const pairModalRef = ref(null);
</script>

<template>
  <div class=" min-h-screen text-center bg-gray-900">
    <div class="py-8 w-2/3 mx-auto">
      <h1 class="text-4xl font-bold text-white mb-4">Screener</h1>

      <div class="flex justify-end">
        <PrimaryButton @click="pairModalRef.open()" class="my-4">Pares</PrimaryButton>
      </div>

      <Table />
    </div>
  </div>

  <PairModal ref="pairModalRef" />
</template>