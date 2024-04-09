<template>
    <div>
      <textarea
        v-model="title"
        @keydown.tab="createColumn"
        @keyup.enter="createColumn"
        @focus="focused = true"
        @blur="focused = false"
        class="focus:bg-gray-200 focus:shadow font-medium focus:opacity-100 hover:opacity-70 resize-none rounded w-full border-none bg-gray-200 p-4 cursor-pointer overflow-hidden min-w-[250px] opacity-50"
        :class="{
          'h-14': !focused,
          'h-20': focused,
        }"
        style="outline: none !important"
        :placeholder="!focused ? '+ Add A Column' : 'Enter a title for this column'"
      />
    </div>    
</template>

<script setup lang="ts">
import type { Column, Task } from "@/types";
import { nanoid } from "nanoid";
const emit = defineEmits<{
  (e: "addColumn", payload: Column): void;
}>();
const focused = ref(false);
const title = ref("");
function createColumn(e: Event) {
  if (title.value.trim()) {
    e.preventDefault();
    emit("addColumn", {
      title: title.value.trim(),
      id: nanoid(),
      tasks: [],
      type: 'column'
    } as Column);
  }
  title.value = "";
}
</script>