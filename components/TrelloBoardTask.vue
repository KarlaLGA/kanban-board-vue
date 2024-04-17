<template>
    <div ref="card" :title="task.createdAt.toLocaleDateString()" class="task bg-white p-2 rounded shadow-sm max-w-[250px] flex relative">
      <DragHandle :style="style" />
      <textarea
        class="bg-transparent resize-none w-full focus:bg-white rounded focus-visible:outline-none"
        type="text"
        @keydown.enter="onEnterKey"
        oninput='this.style.height = "0px";this.style.height = this.scrollHeight + "px"'
        @blur="onEscape"
        @keydown.esc="onEscape"
        @keydown.backspace="task.title === '' ? handleActionClick('delete') : null"
        v-model="task.title"
        v-if="isEdit"
        ref="textarea"
        :style="{height: taskTitle?.clientHeight + 'px'}"
      />
      <p ref="taskTitle" v-else>{{ task.title }}</p>
      <font-awesome-icon icon="fa-solid fa-pen" class="hover:bg-gray-400 bg-white p-2 rounded-full absolute top-1 right-1 opacity-0 edit-icon" @click="showContextMenu($event)" />

      <ContextMenu
        v-if="showMenu"
        :actions="contextMenuActions"
        :event="event"
        :element="card"
        :on-close="closeContextMenu"
        @action-clicked="handleActionClick"
      />
    </div>
</template>

<script setup lang="ts">
import type { Actions, HandlerStyle, Task } from '~/types';
const style: HandlerStyle = 'task';

const props = withDefaults(
  defineProps<{
    task: Task,
    column: string,
    new: boolean
  }>(), {
    new: false
  });

const emit = defineEmits<{
    (e: 'delete-task', payload: string): void,
    (e: 'add-another-task', payload: boolean): void
}>()

const isEdit = ref<boolean>(props.new);
const card = ref<HTMLElement | null>(null);
const task = ref<Task>(props.task);
const textarea = ref<HTMLTextAreaElement | null>(null);
const taskTitle = ref<HTMLParagraphElement | null>(null);

onMounted(() => {
  if (props.new) {
    card.value?.scrollIntoView();
    nextTick(() => {
        (textarea.value as HTMLTextAreaElement).focus();
    })
  }
})

const editTask = () => {
    isEdit.value = true;
    nextTick(() => {
        (textarea.value as HTMLTextAreaElement).select();
    })
}

const onEnterKey = (e: Event) => {
  e.preventDefault();
  isEdit.value = false;
  if (task.value.title === '') {
    emit('delete-task', props.task.id);
    emit('add-another-task', false);
  } else {
    emit('add-another-task', true);
  }
}

const onEscape = () => {
  isEdit.value = false;
  if (task.value.title === '') {
    emit('delete-task', props.task.id);
    emit('add-another-task', false);
  }
}


// Menu
const showMenu = ref<boolean>(false);
const event = ref<MouseEvent | null>(null);

// Context menu code inspired by Selena J
// https://medium.com/@sj.anyway/custom-right-click-context-menu-in-vue3-b323a3913684
const contextMenuActions = ref<Actions[]>([
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete' },
]);

const showContextMenu = (e: MouseEvent) => {
  e.preventDefault();

  showMenu.value = true;
  event.value = e;
};

const closeContextMenu = (e?: Event) => {
  showMenu.value = false;
};

function handleActionClick(action: string){
  if (action === 'delete') {
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

    

</style>