<script setup lang="ts">
import { useSettingStore } from './../../src/store/setting';
import { storeToRefs } from 'pinia';

const settingStore = useSettingStore()
const { isActivated } = storeToRefs(settingStore)
const { activate, deactivate } = settingStore

function toggleEditMode() {
  if (isActivated.value) return deactivate()
  if (!isActivated.value) return activate()
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
