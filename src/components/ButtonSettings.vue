<script setup lang="ts">
import { useSettingStore } from './../../src/store/setting';
import { useTimerStore } from './../../src/store/timer';
import { storeToRefs } from 'pinia';

const settingStore = useSettingStore()
const { isEditable } = storeToRefs(settingStore)
const { activate, deactivate } = settingStore

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)
const { timerSwitchOff } = timerStore

function toggleEditMode() {
  if (isEditable.value) return deactivate()
  if (!isEditable.value && !isRunning.value) return activate()
  if (isRunning.value) {
    timerSwitchOff()
    activate()
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
