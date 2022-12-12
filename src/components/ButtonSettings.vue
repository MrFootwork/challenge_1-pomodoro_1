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
  color: white;
  opacity: .3;

  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;

  &:hover {
    opacity: 1;
  }

  @media screen and (orientation : landscape) {
    font-size: 4vh;
    padding: 1vh;
    letter-spacing: 2vh;
  }

  @media screen and (orientation : portrait) {
    font-size: 6vw;
    padding: 1vw;
    letter-spacing: 2vw;
  }

  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}
</style>
