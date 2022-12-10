<script setup lang="ts">
import { useSettingStore } from './../store/setting';
import { useTimerStore } from './../store/timer';

const settingStore = useSettingStore()
const { startEditing, stopEditing } = settingStore

const timerStore = useTimerStore()
const { timerPause, setInitialTime } = timerStore

function toggleEditMode() {
  if (!settingStore.isEditable && !timerStore.isRunning) return startEditing()
  if (settingStore.isEditable) {
    setInitialTime()
    stopEditing()
    return
  }
  if (timerStore.isRunning) {
    timerPause()
    startEditing()
    return
  }
}
</script>

<template>
  <button class="settings" @click="toggleEditMode()">
    <img src="./../../public/images/gear.svg" alt="Settings" />
  </button>
</template>

<style lang="scss" scoped>
.settings {
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
}
</style>
