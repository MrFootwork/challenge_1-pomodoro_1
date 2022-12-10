<script setup lang="ts">
import { useSettingStore } from './../store/setting';
import { useTimerStore } from './../store/timer';
import { storeToRefs } from 'pinia';

const settingStore = useSettingStore()
const { isEditable } = storeToRefs(settingStore)
const { startEditing, stopEditing } = settingStore

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)
const { timerSwitchOff } = timerStore

function toggleEditMode() {
  if (!isEditable.value && !isRunning.value) return startEditing()
  if (isEditable.value) return stopEditing()
  if (isRunning.value) {
    timerSwitchOff()
    startEditing()
    return
  }
}
</script>

<template>
  <button class="settings" @click="toggleEditMode()">
    <img src="images/gear.svg" alt="Settings" />
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
