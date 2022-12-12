<script setup lang="ts">
import { useTimerStore } from './../store/timer'
import { useSettingStore } from './../store/setting'
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

const timerStore = useTimerStore()
const { minutes, seconds } = storeToRefs(timerStore)
const { timerSwitchOn, timerSwitchOff, timerPause, setInitialTime } = timerStore

const settingStore = useSettingStore()
const { stopEditing } = settingStore

function toggleTimer() {
  if (timerStore.isRunning) {
    timerPause()
    if (minutes.value === '0' && seconds.value === '00') {
      timerSwitchOff()
    }
    return
  }
  if (!timerStore.isRunning) {
    if (settingStore.isEditable) setInitialTime()
    stopEditing()
    timerSwitchOn()
    return
  }
}

const captionButton = computed(() => {
  return timerStore.isRunning ? ' pause' : ' start'
}) 
</script>

<template>
  <button class="start" @click="toggleTimer()">{{ captionButton }}</button>
</template>

<style lang="scss" scoped>
.start {
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  color: white;
  opacity: .5;

  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;

  &:hover {
    opacity: 1;
  }

  @media screen and (orientation : landscape) {
    font-size: 4vh;
    padding: 1vh;
    padding-bottom: 3vh;
    letter-spacing: 2vh;
    text-indent: 2vh;
  }

  @media screen and (orientation : portrait) {
    font-size: 6vw;
    padding: 1vw;
    padding-bottom: 3vw;
    letter-spacing: 2vw;
    text-indent: 2vw;
  }
}
</style>
