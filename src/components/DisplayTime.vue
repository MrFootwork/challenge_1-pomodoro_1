<script setup lang="ts">
import { useSettingStore } from './../../src/store/setting'
import { useTimerStore } from './../../src/store/timer'
import { storeToRefs } from 'pinia'
import { computed, watchEffect, reactive } from 'vue'

const settingStore = useSettingStore()
const { isActivated } = storeToRefs(settingStore)

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)
const { timerSwitchOff } = timerStore

const disabled = computed(() => {
  return isActivated.value
})

const time = reactive({
  minutes: 15,
  seconds: 0
})

const timeDisplay = computed(() => {
  return {
    minutes: ('' + time.minutes).padStart(2, '0'),
    seconds: ('' + time.seconds).padStart(2, '0'),
  }
})

// this runs the timer 
watchEffect(() => {
  if (isRunning.value) {
    let countDown = setInterval(() => {
      if (time.minutes === 0 && time.seconds < 1) timerSwitchOff()
      if (!isRunning.value) return clearInterval(countDown)
      if (time.seconds === 0) {
        time.minutes--
        time.seconds = 60
      }
      time.seconds--
    }, 1000)
  }
}
)
</script>

<template>
  <div class="time">
    <div class="minutes">
      <input type="text" :value="timeDisplay.minutes" :disabled="disabled" />
    </div>
    <div class="colon">:</div>
    <div class="seconds">
      <input type="text" :value="timeDisplay.seconds" :disabled="disabled" />
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
