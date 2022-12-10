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
    timerSwitchOn()
    stopEditing()
    return
  }
}

const captionButton = computed(() => {
  return timerStore.isRunning ? 'stop' : 'start'
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
