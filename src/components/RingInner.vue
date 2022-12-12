<script setup lang="ts">

</script>

<template>
  <div class="timer">
    <slot name="time"></slot>
    <slot name="start"></slot>
    <slot name="settings"></slot>
  </div>
</template>

<style lang="scss" scoped>
/* inner circle */
.timer {
  background: radial-gradient(71.4% 71.4% at 51.7% 28.6%, #3A393F 0%, #17171A 100%);
  box-shadow: inset 0px 0px 114px rgba(0, 0, 0, 0.45);

  position: absolute;

  @media screen and (orientation : landscape) {
    height: 80vh;
    width: 80vh;
  }

  @media screen and (orientation : portrait) {
    min-height: 80vw;
    min-width: 80vw;
  }

  max-height: 518px;
  max-width : 518px;

  border-radius: 50%;

  display : flex;
  flex-flow : column;
  justify-content: center;
  align-items : center;
}
</style>
