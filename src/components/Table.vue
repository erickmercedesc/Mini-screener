<script setup>
import { computed, onMounted, ref } from 'vue';
import Pair from '../pair';

const pairs = ref([]);

const sortedPairs = computed(() => {
    if (!sortBy.value) {
        return pairs.value;
    }

    return pairs.value.sort((a, b) => {
        if (sortDirection.value === 'asc') {
            return a[sortBy.value] - b[sortBy.value];
        }

        return b[sortBy.value] - a[sortBy.value];
    });
});

const sortBy = ref(null);
const sortDirection = ref('asc');

const loadPair = () => {
    const pair = localStorage.getItem('pairs') || '[]';
    return JSON.parse(pair);
}

const changeSort = (by) => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    sortBy.value = by;
}

onMounted(async () => {
    const refKline = await Pair.getKlines('BTCUSDT');
    const loadedPairs = loadPair();
    
    for (const pair of loadedPairs) {
        const klines = await Pair.getKlines(`${pair}USDT`);

        pairs.value.push({
            name: `${pair}USDT`,
            price: klines.last,
            rsTotal: Math.round((klines.getRelativeScore() / refKline.getRelativeScore()) * 100),
            rs1M: Math.round((klines.getPerformance(30) / refKline.getPerformance(30)) * 100),
            rs3M: Math.round((klines.getPerformance(30 * 3) / refKline.getPerformance(30 * 3)) * 100),
            rs6M: Math.round((klines.getPerformance(30 * 6) / refKline.getPerformance(30 * 6)) * 100),
            rs12M: Math.round((klines.getPerformance(30 * 12) / refKline.getPerformance(30 * 12)) * 100),
        });
    }
    
});

</script>

<template>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Par
                </th>

                <th @click="changeSort('price')" scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Precio
                    </div>
                </th>

                <th @click="changeSort('rsTotal')" scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        RS Total
                    </div>
                </th>

                <th @click="changeSort('rs1M')" scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        RS 1M
                    </div>
                </th>

                <th @click="changeSort('rs3M')" scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        RS 3M
                    </div>
                </th>

                <th @click="changeSort('rs6M')" scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        RS 6M
                    </div>
                </th>

                <th @click="changeSort('rs12M')" scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        RS 12M
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="pair in sortedPairs" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                    {{ pair.name }}
                </th>

                <td class="px-6 py-4">
                    {{ pair.price }}
                </td>

                <td class="px-6 py-4">
                    {{ pair.rsTotal }}
                </td>

                <td class="px-6 py-4">
                    {{ pair.rs1M }}
                </td>

                <td class="px-6 py-4">
                    {{ pair.rs3M }}
                </td>

                <td class="px-6 py-4">
                    {{ pair.rs6M }}
                </td>

                <td class="px-6 py-4">
                    {{ pair.rs12M }}
                </td>

            </tr>
        </tbody>
    </table>
</div>

</template>