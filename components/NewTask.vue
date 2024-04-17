<template>
    <div>
      <textarea
        v-model="title"
        @keydown.tab="createTask"
        @keyup.enter="createTask"
        @focus="focused = true"
        @blur="createTask"
        class="focus:bg-white focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer overflow-hidden"
        :class="{
          'h-7': !focused,
          'h-20': focused,
        }"
        style="outline: none !important"
        :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
      />
    </div>
</template>

<script setup lang="ts">
import type { Task } from "@/types";
import { nanoid } from "nanoid";
const emit = defineEmits<{
  (e: "add", payload: Task): void;
}>();
const focused = ref(false);
const title = ref("");
function createTask(e: Event) {
  if (e.type === 'blur') {
    focused.value = false;
  }
  if (title.value.trim()) {
    e.preventDefault();
    emit("add", {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid(),
      type: 'task'
    } as Task);
  }
  title.value = "";
}
</script>