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
                  <div class="task">
                    <TrelloBoardTask :task="task" />
                  </div>
                </template>
              </draggable>
              <footer>
                <button class="text-gray-500">+ add a card</button>
              </footer>
          </div>
        </template>
      </draggable>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';
import type { Column, HandlerStyle, Task } from '~/types';

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
      },
      {
        title: "Develop cool new feature",
        createdAt: new Date(),
        id: nanoid(),
      },
      { title: "Fix page nav bug", createdAt: new Date(), id: nanoid() },
    ],
  },
  { title: "Sprint", id: nanoid(), tasks: [] },
  { title: "In Progress", id: nanoid(), tasks: [] },
  { title: "QA", id: nanoid(), tasks: [] },
  { title: "Complete", id: nanoid(), tasks: [] },
])
</script>

<style lang="scss" scoped>

</style>