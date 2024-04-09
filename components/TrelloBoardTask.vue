<template>
    <div ref="card" :title="task.createdAt.toLocaleDateString()" class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex relative">
        <DragHandle :style="style" />
        <textarea
            class="bg-transparent resize-none w-full focus:bg-white rounded focus-visible:outline-none"
            type="text"
            @keydown.enter.prevent="($event.target as HTMLInputElement).blur()"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            @blur="() => isEdit = false"
            @keydown.backspace="task.title === '' ? handleActionClick('delete') : null"
            v-model="task.title"
            v-if="isEdit"
            ref="textarea"
            :style="{height: taskTitle?.clientHeight + 'px'}"
        />
        <p ref="taskTitle" v-else>{{ task.title }}</p>
        <!--  -->
        <font-awesome-icon icon="fa-solid fa-pen" class="hover:bg-gray-400 bg-white p-2 rounded-full absolute top-1 right-1 opacity-0 edit-icon" @click="showContextMenu($event)" />

        <div class="overlay" @click="closeContextMenu" v-if="showMenu" />
      <ContextMenu
        v-if="showMenu"
        :actions="contextMenuActions"
        @action-clicked="handleActionClick"
        :x="menuX"
        :y="menuY"
      />
    </div>
</template>

<script setup lang="ts">
import type { Actions, HandlerStyle, Task } from '~/types';
const style: HandlerStyle = 'task';

const props = defineProps<{
    task: Task,
    column: string
}>();

const emit = defineEmits<{
    (e: 'delete-task', payload: string): void
}>()
const isEdit = ref<boolean>(false);
const card = ref<HTMLElement | null>(null);
const textarea = ref<HTMLTextAreaElement | null>(null);
const taskTitle = ref<HTMLParagraphElement | null>(null);

const editTask = () => {
    isEdit.value = true;
    nextTick(() => {
        (textarea.value as HTMLTextAreaElement).focus();
    })
}

const showMenu = ref<boolean>(false);
const menuX = ref<number>(0);
const menuY = ref<number>(0);

// Context menu code inspired by Selena J
// https://medium.com/@sj.anyway/custom-right-click-context-menu-in-vue3-b323a3913684
const contextMenuActions = ref<Actions[]>([
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete' },
]);

const showContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  showMenu.value = true;

  const screen = window.innerWidth;
  
  const rect = card.value as HTMLElement;
  const ref = rect.getBoundingClientRect();
  
  let value = ref.width;
  if (event.clientX > screen - ref.width) {
    value = 0 - 150;
  }

  menuX.value = value;
  menuY.value = 0;
};

const closeContextMenu = () => {
  showMenu.value = false;
};

function handleActionClick(action: string){
  if (action === 'delete') {
    console.log('delete me');
    emit('delete-task', props.task.id);
  }
  else {
    editTask();
  }

  closeContextMenu();
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

    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 49;
  }

  .overlay::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .overlay:hover {
    cursor: pointer;
  }

</style>