<template>
  <div class="overlay" @click="onClose">

    <div
      ref="menu"
      class="z-50 context-menu rounded"
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
  </div>
  
</template>

<script setup lang="ts">
import type { Actions } from '~/types';

const props = defineProps<{
  actions: Actions[],
  event: MouseEvent | null,
  element: HTMLElement | null,
  onClose: (payload: MouseEvent) => void,
}>();

const menu = ref<HTMLElement | null>(null);
const x = ref<Number>(0);
const y = ref<Number>(0);

const emit = defineEmits<{
    (e:'action-clicked', payload: string): void;
}>();

const emitAction = (action: string) => {
  emit('action-clicked', action);
};

const defineCoordinates = () => {

  const screen = window.innerWidth;
  const clickElement = props.element as HTMLElement;
  const clickEvent = props.event as MouseEvent;
  const menuWidth = (menu.value as HTMLElement).getBoundingClientRect().width;

  const rect = clickElement.getBoundingClientRect();  

  let xValue = rect.right;
  if (clickEvent.clientX > screen - rect.width) {
    xValue = rect.left - menuWidth;
  }

  x.value = xValue;
  y.value = rect.top;
}

onMounted(() => {
  defineCoordinates();
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