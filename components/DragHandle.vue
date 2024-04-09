<template>
    <span class="drag-handle cursor-move pr-2">
        <span v-if="style === 'column'">
            <font-awesome-icon icon="fa-solid fa-grip-vertical" size="sm" class="text-black" />
        </span>
        <span v-else>
            <font-awesome-icon icon="fa-solid fa-grip-vertical" size="xs" class="text-gray-500" />
        </span>
    </span>
</template>



<script setup lang="ts">
import type { HandlerStyle } from '~/types';

    defineProps<{style: HandlerStyle}>();
</script>