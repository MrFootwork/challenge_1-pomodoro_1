<script setup lang="ts">
import { useSettingStore } from './../store/setting'
import { useTimerStore } from './../store/timer'
import { storeToRefs } from 'pinia'
import { computed, watchEffect } from 'vue'

const settingStore = useSettingStore()
const { isEditable } = storeToRefs(settingStore)

const timerStore = useTimerStore()
const { timerSwitchOff, dropMinute, dropSecond, dropCentiSecond } = timerStore

const disabled = computed(() => {
  return !isEditable.value
})

// this runs the timer 
watchEffect(() => {
  if (timerStore.isRunning) {
    let countDown = setInterval(() => {
      // get time variables as number type
      const currentMinutes = +timerStore.minutes
      const currentSeconds = +timerStore.seconds
      const currentCentiSeconds = timerStore.centiSeconds
      // decrement minute and set seconds to 59
      if (currentMinutes > 0 && currentSeconds === 0 && currentCentiSeconds === 0) {
        dropMinute()
        return
      }
      // decrement seconds by 1
      if (currentSeconds > 0 && currentCentiSeconds === 0) {
        dropSecond()
        return
      }
      // decrement centiSeconds by 1
      dropCentiSecond()
      // stop timer
      if (currentMinutes === 0 && currentSeconds < 1) timerSwitchOff()
      if (!timerStore.isRunning) return clearInterval(countDown)
    }, 10)
  }
}
)
</script>

<template>
  <div class="time">
    <div class="minutes">
      <!-- <input type="text" v-model="timeDisplay.minutes" :disabled="disabled" /> -->
      <input class="inputMinutes" type="text" v-model="timerStore.minutes" :disabled="disabled" />
    </div>
    <div class="colon">:</div>
    <div class="seconds">
      <input class="inputSeconds" type="text" v-model="timerStore.seconds" :disabled="disabled" />
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
