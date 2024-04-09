<template>
    <div :title="task.createdAt.toLocaleDateString()" class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex relative">
        <DragHandle :style="style" />
        {{ task.title }}
        <font-awesome-icon icon="fa-solid fa-pen" class="hover:bg-gray-400 p-2 rounded-full absolute top-1 right-1 opacity-0 edit-icon" @click="emitEditTask(task)" />
    </div>
</template>

<script setup lang="ts">
import type { HandlerStyle, Task } from '~/types';
const style: HandlerStyle = 'task';

defineProps<{
    task: Task
}>();

const emit = defineEmits<{
    (e: 'edit-task', payload: Task): void;
}>();

const emitEditTask = (task: Task) => {
    console.log('edit me!')
    console.log(task);
    emit('edit-task', task);
}
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

    .task:hover .edit-icon {
        opacity: 1;
    }

</style>