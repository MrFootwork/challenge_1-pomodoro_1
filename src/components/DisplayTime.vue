<script setup lang="ts">
import { useSettingStore } from './../../src/store/setting'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const settingStore = useSettingStore()
const { isActivated } = storeToRefs(settingStore)

const disabled = computed(() => {
  return isActivated.value
})
</script>

<template>
  <div class="time">
    <div class="minutes">
      <input type="text" value="15" :disabled="disabled" />
    </div>
    <div class="colon">:</div>
    <div class="seconds">
      <input type="text" value="00" :disabled="disabled" />
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
