<script setup lang="ts">
import { useSettingStore } from './../store/setting'
import { useTimerStore } from './../store/timer'
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
  seconds: "00",
  centiSeconds: 0
})

// this runs the timer 
watchEffect(() => {
  if (isRunning.value) {
    let countDown = setInterval(() => {
      // get time variables as number type
      let currentMinutes = +timeDisplay.minutes
      let currentSeconds = +timeDisplay.seconds
      // decrement minute and set seconds to 59
      if (currentMinutes > 0 && currentSeconds === 0 && timeDisplay.centiSeconds === 0) {
        timeDisplay.minutes = (--currentMinutes).toString().padStart(1, '0')
        timeDisplay.seconds = '59'
        timeDisplay.centiSeconds = 99
        return
      }
      // decrement seconds by 1
      if (currentSeconds > 0 && timeDisplay.centiSeconds === 0) {
        timeDisplay.seconds = (--currentSeconds).toString().padStart(2, '0')
        timeDisplay.centiSeconds = 99
        return
      }
      // decrement centiSeconds by 1
      --timeDisplay.centiSeconds
      // stop timer
      if (currentMinutes === 0 && currentSeconds < 1) timerSwitchOff()
      if (!isRunning.value) return clearInterval(countDown)
    }, 10)
  }
}
)
</script>

<template>
  <div class="time">
    <div class="minutes">
      <!-- <input type="text" v-model="timeDisplay.minutes" :disabled="disabled" /> -->
      <input class="inputMinutes" type="text" v-model="timeDisplay.minutes" :disabled="disabled" />
    </div>
    <div class="colon">:</div>
    <div class="seconds">
      <input class="inputSeconds" type="text" v-model="timeDisplay.seconds" :disabled="disabled" />
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
    outline: none;

    &:disabled {
      border-bottom: none;
    }
  }

  .inputMinutes {
    text-align: end;
  }

  .inputSeconds {
    text-align: justify;
  }
}
</style>
