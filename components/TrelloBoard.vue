<template>
    <div>
        <div v-for="column in columns" :key="column.id">
            <h2>{{ column.title }}</h2>
            <p v-for="task in column.tasks" :key="task.id">{{ task.title }}</p>
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