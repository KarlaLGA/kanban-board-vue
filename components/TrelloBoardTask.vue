<template>
    <div :title="task.createdAt.toLocaleDateString()" class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px]  flex">
        <DragHandle :style="style" />
        <span>{{ task.title }}</span>
    </div>
</template>

<script setup lang="ts">
import type { HandlerStyle, Task } from '~/types';
const style: HandlerStyle = 'task';

defineProps<{
    task: Task
}>();
</script>

<style scoped>
    .sortable-drag .task {
        transform: rotate(5deg);
        background-image: none;
        opacity: 1;
        transform: translateZ(10);

    }
    .sortable-ghost .task {
        position: relative;
    }
    .sortable-ghost .task::after {
        content: "";
        @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
    }

</style>