<script setup lang="ts">
import RingOuter from './components/RingOuter.vue'
import RingInner from './components/RingInner.vue'
import DisplayTime from './components/DisplayTime.vue'
import ButtonStart from './components/ButtonStart.vue'
import ButtonSettings from './components/ButtonSettings.vue'

</script>

<template>
  <div class="wrapper">

    <RingOuter />

    <RingInner>

      <template v-slot:time>
        <DisplayTime />
      </template>

      <template v-slot:start>
        <ButtonStart />
      </template>

      <template v-slot:settings>
        <ButtonSettings />
      </template>

    </RingInner>

  </div>
</template>

<style lang="scss">
body {
  align-items: center;
  background: #2B2A30;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
  // somehow line-height is set to 24px automatically causing the colon to be located too high
  line-height: normal;

  .wrapper {
    align-items: center;
    display: flex;
    justify-content: center;
    // position: absolute;


    border-radius: 50%;
    box-shadow: -5px 14px 44px #000000, 5px -16px 50px rgba(255, 255, 255, 0.15);

    @media screen and (orientation : landscape) {
      height: 80vh;
      width: 80vh;
    }

    @media screen and (orientation : portrait) {
      height: 80vw;
      width: 80vw;
    }

    max-height: 518px;
    max-width : 518px;
  }
}
</style>
