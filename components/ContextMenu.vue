<template>
    <div
      class="fixed z-50 context-menu rounded"
      :style="{ top: y + 'px', left: x + 'px' }"
  >
    <div
        v-for="action in actions"
        :key="action.action"
        @click="emitAction(action.action)"
    >
      {{ action.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Actions } from '~/types';

defineProps<{actions: Actions[], x: number, y: number}>();

const emit = defineEmits<{
    (e:'action-clicked', payload: string): void;
}>();

const emitAction = (action: string) => {
  emit('action-clicked', action);
};

</script>

<style scoped>
.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
}

.context-menu div {
  padding: 10px;
  cursor: pointer;
}

.context-menu div:hover {
  background-color: #f0f0f0;
}
</style>