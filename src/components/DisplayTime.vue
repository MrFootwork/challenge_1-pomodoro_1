<script setup lang="ts">
import { useSettingStore } from './../../src/store/setting'
import { useTimerStore } from './../../src/store/timer'
import { storeToRefs } from 'pinia'
import { computed, watchEffect, reactive } from 'vue'

const settingStore = useSettingStore()
const { isEditable } = storeToRefs(settingStore)

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)
const { timerSwitchOff } = timerStore

const disabled = computed(() => {
  return !isEditable.value
})

const timeDisplay = reactive({
  minutes: "15",
  seconds: "00"
})

// this runs the timer 
watchEffect(() => {
  if (isRunning.value) {
    let countDown = setInterval(() => {

      let currentMinutes = +timeDisplay.minutes
      let currentSeconds = +timeDisplay.seconds

      if (currentMinutes === 0 && currentSeconds < 1) timerSwitchOff()
      if (!isRunning.value) return clearInterval(countDown)

      if (currentSeconds === 0) {
        timeDisplay.minutes = (--currentMinutes).toString().padStart(1, '0')
        timeDisplay.seconds = '59'
        return
      }

      timeDisplay.seconds = (--currentSeconds).toString().padStart(2, '0')

    }, 1000)
  }
}
)
</script>

<template>
  <div class="time">
    <div class="minutes">
      <!-- <input type="text" v-model="timeDisplay.minutes" :disabled="disabled" /> -->
      <input type="text" v-model="timeDisplay.minutes" :disabled="disabled" />
    </div>
    <div class="colon">:</div>
    <div class="seconds">
      <input type="text" v-model="timeDisplay.seconds" :disabled="disabled" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* actual time */
.time {
  display: flex;
  font-family: "bebas";
  font-size: 196px;
  margin: 30px auto;
  position: relative;
  top: 30px;

  input[type="text"] {
    border: 0;
    border-bottom: 1px dashed white;
    background: none;
    color: white;
    font-family: "bebas";
    font-size: 196px;
    height: 170px;
    width: 150px;
    text-align: center;
    outline: none;

    &:disabled {
      border-bottom: none;
    }
  }
}
</style>
