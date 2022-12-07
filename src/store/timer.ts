import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
	// state
	const isRunning: boolean = ref(false)
	// getters (computed())
	// actions
	function switchOn() {
		isRunning.value = true
	}
	function switchOff() {
		isRunning.value = false
	}

	return { isRunning, switchOn, switchOff }
})
