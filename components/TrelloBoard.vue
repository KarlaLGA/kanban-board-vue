<template>
    <div class="flex-grow relative">
      <div class="board-wrapper absolute top-0 right-0 left-0 bottom-0">
        <div class="flex gap-4 overflow-x-auto items-start h-full board-container">
          <draggable
            v-model="columns"
            group="columns"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            class="flex gap-4 items-start h-full pb-2"
          >
            <template #item="{element: column}: {element: Column}">
                <TrelloBoardColumn :column="column" @delete-column="columns = columns.filter(col => col.id !== $event)" />
            </template>
          </draggable>
          <NewColumn @add-column="columns.push($event)" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';
import type { Column, Task } from '~/types';


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