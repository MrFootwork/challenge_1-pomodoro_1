<script setup lang="ts">
import { useTimerStore } from './../../src/store/timer'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)
const { switchOn, switchOff } = timerStore

function toggleTimer() {
  if (isRunning.value) return switchOff()
  if (!isRunning.value) return switchOn()
}

const captionButton = computed(() => {
  return isRunning.value ? 'stop' : 'start'
}) 
</script>

<template>
  <button class="start" @click="toggleTimer()">{{ captionButton }}</button>
</template>

<style lang="scss" scoped>
.start {
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  letter-spacing: 10px;
  line-height: 20px;
  background: none;
  color: white;
  opacity: .5;
  border: none;
  outline: none;
  text-transform: uppercase;
  margin-bottom: 20px;

  &:hover {
    opacity: 1;
  }
}
</style>
