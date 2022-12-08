import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
	// state
	const isRunning: boolean = ref(false)
	// getters (computed())
	// actions
	function timerSwitchOn(): void {
		isRunning.value = true
	}
	function timerSwitchOff(): void {
		isRunning.value = false
	}

	return { isRunning, timerSwitchOn, timerSwitchOff }
})
