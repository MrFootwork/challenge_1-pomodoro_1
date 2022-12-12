<script setup lang="ts">
import { useTimerStore } from './../store/timer';
import { storeToRefs } from 'pinia';

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)

</script>

<template>
  <div class="ring" :class="{ ending: !isRunning }"></div>
</template>

<style lang="scss" scoped>
/* outer glow */
.ring {
  position: absolute;

  @media screen and (orientation : landscape) {
    height: 80vh;
    width: 80vh;
  }

  @media screen and (orientation : portrait) {
    min-height: 80vw;
    min-width: 80vw;
  }

  max-height: 600px;
  max-width : 600px;


  @media screen and (orientation : landscape) {
    border: 2vh solid #00aa51;
  }

  @media screen and (orientation : portrait) {
    border: 2vw solid #00aa51;
  }

  border-radius: 50%;

  &.ending {
    @media screen and (orientation : landscape) {
      border: 2vh solid #9d0000;
    }

    @media screen and (orientation : portrait) {
      border: 2vw solid #9d0000;
    }
  }
}
</style>
