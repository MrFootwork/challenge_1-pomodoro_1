<script setup lang="ts">
import { useSettingStore } from './../store/setting';
import { useTimerStore } from './../store/timer';
import { computed } from 'vue'

const settingStore = useSettingStore()
const { startEditing, stopEditing } = settingStore

const timerStore = useTimerStore()
const { timerPause, setInitialTime, timerSwitchOn } = timerStore

function toggleEditMode() {

  if (timerStore.isRunning) {
    timerPause()
    startEditing()
    return
  }
  if (!settingStore.isEditable
    && !timerStore.isRunning) {
    startEditing()
    return
  }
  if (settingStore.isEditable) {
    setInitialTime()
    stopEditing()
    timerSwitchOn()
    return
  }
}

const pathIcon = computed(() => {
  return settingStore.isEditable
    ? './../../images/check.svg'
    : './../../images/gear.svg'
})
</script>

<template>
  <button class="settings" @click="toggleEditMode()">
    <img class="settings-gear" :src="pathIcon" alt="Settings" />
  </button>
</template>

<style lang="scss" scoped>
.settings {
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  color: white;
  opacity: .4;

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

  .settings-gear {
    @media screen and (orientation : landscape) {
      width: 7vh;
      height: 7vh;
    }

    @media screen and (orientation : portrait) {
      width: 7vw;
      height: 7vw;
    }
  }
}
</style>
