<template>
    <div class="flex gap-4 overflow-x-auto items-start">
        <div v-for="column in columns" :key="column.id" class="column bg-gray-200 p-5 rounded min-w-[250px]">
            <header class="font-bold mb-4">{{ column.title }}</header>
            <TrelloBoardTask v-for="task in column.tasks" :task="task" :key="task.id" />
            <footer>
              <button class="text-gray-500">+ add a card</button>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import type { Column } from '~/types';

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