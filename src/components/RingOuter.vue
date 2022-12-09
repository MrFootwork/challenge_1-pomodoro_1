<script setup lang="ts">
import { useTimerStore } from './../store/timer';
import { storeToRefs } from 'pinia';

const timerStore = useTimerStore()
const { isRunning } = storeToRefs(timerStore)

</script>

<template>
  <div class="ring" :class="{ ending: !isRunning }">
    <svg width="518" height="518" viewBox="0 0 518 518">
      <circle stroke-width="9px" x="0" y="y" cx="259" cy="259" r="254" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
/* outer glow */
.ring {
  position: absolute;
  left: 0;
  stroke: #09A65A;
  top: 0;
  z-index: 1;

  &.ending circle {
    stroke: #900A0A;
  }
}
</style>
