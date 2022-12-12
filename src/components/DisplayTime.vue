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
      <input class="inputMinutes" type="text" v-model="timerStore.minutes" :disabled="disabled" />
    </div>
    <div class="colon">:</div>
    <div class="seconds">
      <input class="inputSeconds" type="text" v-model="timerStore.seconds" :disabled="disabled" />
    </div>
    <div class="centi-seconds">{{ `.${timerStore.centiSeconds}` }}</div>
  </div>
</template>

<style lang="scss" scoped>
/* actual time */
.time {
  font-family: "bebas";
  background: none;
  color: white;

  display: flex;
  align-items: baseline;

  @media screen and (orientation : landscape) {
    padding-top: 13vh
  }

  @media screen and (orientation : portrait) {
    padding-top: 13vw
  }

  .inputMinutes {
    text-align: end;
    padding: 0
  }

  .inputSeconds {
    text-align: justify;
    padding: 0
  }

  .centi-seconds {
    @media screen and (orientation : landscape) {
      font-size: 12vh;
      width: 12vh;
    }

    @media screen and (orientation : portrait) {
      font-size: 12vw;
      width: 12vw;
    }
  }

  input[type="text"] {
    border: 0;
    border-bottom: 1px dashed white;
    background: none;
    outline: none;

    font-family: "bebas";
    background: none;
    color: white;

    @media screen and (orientation : landscape) {
      height: 25vh;
      font-size: 30vh;
      width: 25vh;
    }

    @media screen and (orientation : portrait) {
      height: 25vw;
      font-size: 30vw;
      width: 25vw;
    }

    &:disabled {
      border-bottom: none;
    }
  }

  .colon {
    font-family: "bebas";

    @media screen and (orientation : landscape) {
      font-size: 25vh;
    }

    @media screen and (orientation : portrait) {
      font-size: 25vw;
    }
  }
}
</style>
