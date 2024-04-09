<template>
    <div >
      <draggable
        v-model="columns"
        group="columns"
        item-key="id"
        class="flex gap-4 overflow-x-auto items-start"
        :animation="150"
        handle=".drag-handle"
      >
        <template #item="{element: column}: {element: Column}">
          <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
              <header class="font-bold mb-4 flex">
                <DragHandle :style="style" />
                <p>{{ column.title }}</p>
              </header>
              <draggable
                v-model="column.tasks"
                group="tasks"
                item-key="id"
                :animation="150"
                handle=".drag-handle"
              >
                <template #item="{element: task}: {element: Task}">
                  <div class="task" @contextmenu.prevent="showContextMenu($event, column, task)">
                    <TrelloBoardTask :task="task" />
                  </div>
                </template>
              </draggable>
              <footer>
                <NewTask @add="column.tasks.push($event)" />
              </footer>
          </div>
        </template>
      </draggable>

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
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';
import type { Actions, Column, HandlerStyle, Item, SelectedItem, Task } from '~/types';

const style: HandlerStyle = 'column';

const columns = ref<Column[]>([
{
    title: "Backlog",
    id: nanoid(),
    tasks: [
      {
        title: "Create marketing landing page",
        createdAt: new Date(),
        id: nanoid(),
        type: 'task'
      },
      {
        title: "Develop cool new feature",
        createdAt: new Date(),
        id: nanoid(),
        type: 'task'
        
      },
      { title: "Fix page nav bug", createdAt: new Date(), id: nanoid(), type: 'task' },
    ],
    type: 'column'
  },
  { title: "Sprint", id: nanoid(), tasks: [], type: 'column' },
  { title: "In Progress", id: nanoid(), tasks: [], type: 'column' },
  { title: "QA", id: nanoid(), tasks: [], type: 'column' },
  { title: "Complete", id: nanoid(), tasks: [], type: 'column' },
])


const showMenu = ref<boolean>(false);
const menuX = ref<number>(0);
const menuY = ref<number>(0);
const targetItem = ref<SelectedItem>({column: undefined, task: undefined});

// Context menu code inspired by Selena J
// https://medium.com/@sj.anyway/custom-right-click-context-menu-in-vue3-b323a3913684
const contextMenuActions = ref<Actions[]>([
  { label: 'Delete', action: 'delete' },
]);

const showContextMenu = (event: MouseEvent, column: Column, task: Task) => {
  event.preventDefault();
  showMenu.value = true;
  targetItem.value.column = column;

  if (task) {
    targetItem.value.task = task;
  }

  const rect = event.target as HTMLElement;
  const ref = rect.getBoundingClientRect();
  const elementPositionX: number = event.clientX - ref.left;
  const toAdd: number = ref.width - elementPositionX;


  menuX.value = event.clientX + toAdd;
  menuY.value = ref.top;
};

const closeContextMenu = () => {
  showMenu.value = false;
};

function handleActionClick(action: string){
  const selectedColumn = targetItem.value.column as Column;
  const selectedTask = targetItem.value.task as Task;

  if (action === 'delete') {
    const columnIndex: number = columns.value.findIndex(column => column.id === selectedColumn.id);

    columns.value[columnIndex].tasks = columns.value[columnIndex].tasks.filter(task => task.id !== selectedTask.id);
  }

  closeContextMenu();
}


</script>

<style scoped>
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