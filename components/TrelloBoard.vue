<template>
    <div class="flex-grow">
      <div class="flex gap-4 overflow-x-auto items-start h-full">

        <draggable
          v-model="columns"
          group="columns"
          item-key="id"
          class="flex gap-4 items-start"
          :animation="150"
          handle=".drag-handle"
        >
          <template #item="{element: column}: {element: Column}">
            <div class="column bg-gray-200 p-4 rounded min-w-[250px]">
                <header class="font-medium mb-4 flex">
                  <DragHandle :style="style" />
                  <input
                    class="bg-transparent w-100 focus:bg-white rounded px-1"
                    @keyup.enter="($event.target as HTMLInputElement).blur()"
                    type="text"
                    v-model="column.title"
                    @keydown.backspace="column.title === '' ? columns = columns.filter(c => c.id !== column.id) : null"

                  />
                </header>
                <draggable
                  v-model="column.tasks"
                  group="tasks"
                  item-key="id"
                  :animation="150"
                  handle=".drag-handle"
                >
                  <template #item="{element: task}: {element: Task}">
                    <div class="task" >
                      <TrelloBoardTask :task="task" :column="column.id" @delete-task="column.tasks = column.tasks.filter(task => task.id !== $event)" />
                    </div>
                  </template>
                </draggable>
                <footer>
                  <NewTask @add="column.tasks.push($event)" />
                </footer>
            </div>
          </template>
        </draggable>
        <NewColumn @add-column="columns.push($event)" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';
import type { Column, HandlerStyle, Task } from '~/types';

const style: HandlerStyle = 'column';

const columns = useLocalStorage<Column[]>('trelloBoard', [
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
], {
    // provided by Vueschool
    serializer: {
      read: (value) => {
        return JSON.parse(value).map((column: Column) => {
          column.tasks = column.tasks.map((task: Task) => {
            task.createdAt = new Date(task.createdAt);
            return task;
          });
          return column;
        });
      },
      write: (value) => JSON.stringify(value),
    },
  })

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