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
    return
  }
  if (!timerStore.isRunning) {
    // TODO only set initial time, if any entry was made
    if (settingStore.isEditable && hasBeenEdited) setInitialTime()
    stopEditing()
    timerSwitchOn()
    return
  }
}

const hasBeenEdited = computed(() => {
  // TODO determine if user entered new values
  return true
})

const captionButton = computed(() => {

  if (!timerStore.isRunning
    && !settingStore.isEditable
    && !timerStore.wasRunning) return 'start'

  if (!timerStore.isRunning
    && settingStore.isEditable) return 'continue'

  if (timerStore.isRunning
    && !settingStore.isEditable) return 'pause'

  if (timerStore.wasRunning) return 'continue'
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
    padding: 5vh 1vh 3vh;
    letter-spacing: 2vh;
    text-indent: 2vh;
  }

  @media screen and (orientation : portrait) {
    font-size: 6vw;
    padding: 5vw 1vw 3vw;
    letter-spacing: 2vw;
    text-indent: 2vw;
  }
}
</style>
