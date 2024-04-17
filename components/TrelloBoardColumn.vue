<template>
    <div class="column bg-gray-200 p-2 rounded min-w-[250px] max-h-full flex flex-col overflow-hidden" :class="column.id">
        <header class="font-medium mb-4 flex">
            <DragHandle :style="style" />
            <input
                class="bg-transparent w-100 focus:bg-white rounded px-1"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                type="text"
                v-model="column.title"
                @keydown.backspace="onBackspace"
            />
        </header>
        <draggable
            v-model="column.tasks"
            group="tasks"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            class="tasks overflow-y-auto space-y-2"
        >
            <template #item="{element: task}: {element: Task}">
                <div class="task" >
                    <TrelloBoardTask
                        :new="isEditing"
                        :task="task"
                        :column="column.id"
                        @add-another-task="addAnotherTask($event)"
                        @delete-task="column.tasks = column.tasks.filter(task => task.id !== $event)"
                    />
                </div>
            </template>
        </draggable>
        <footer class="mt-2">
            <button @click="addTask()" class="hover:bg-gray-300 w-full text-left p-1 rounded">+ Add A Card</button>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';
import type { Column, HandlerStyle, Task } from '~/types';


const props = defineProps<{
    column: Column
}>();

const emit = defineEmits<{
    (e: 'delete-column', payload: string): void
}>();

const column = ref<Column>(props.column);
const isEditing = ref<boolean>(false);
const style: HandlerStyle = 'column';

const addTask = () => {
    isEditing.value = true;
    const newTask = {
        title: '',
        createdAt: new Date(),
        id: nanoid(),
        type: 'task',
        isNew: true
    }
    column.value.tasks.push(newTask);
}

const addAnotherTask = (newTask: boolean) => {
    if (isEditing.value && newTask) {
        addTask();
        console.log('add new');
    } else if (!newTask) {
        isEditing.value = false;
    }
}

const onBackspace = () => {
    if (column.value.title === '') {
        console.log('mi');
        emit('delete-column', column.value.id);
    } else {
        return null;
    }
}

</script>

<style scoped>
  html {
    --scrollbarBG: #CFD8DC;
    --thumbBG: #90A4AE;
  }
  .tasks::-webkit-scrollbar {
    width: 5px;
  }
  .tasks {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }
  .tasks::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }
  .tasks::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG) ;
  }
</style>