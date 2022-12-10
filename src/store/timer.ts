import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
	// state
	const isRunning: boolean = ref(false)
	const minutes: string = ref('11')
	const seconds: string = ref('05')
	const centiSeconds: number = ref(0)
	// getters (computed())
	// actions
	function timerSwitchOn(): void {
		isRunning.value = true
	}
	function timerSwitchOff(): void {
		isRunning.value = false
	}
	function dropMinute(): void {
		minutes.value = (+minutes.value - 1).toString().padStart(1, '0')
		seconds.value = '59'
		centiSeconds.value = 99
	}
	function dropSecond(): void {
		seconds.value = (+seconds.value - 1).toString().padStart(2, '0')
		centiSeconds.value = 99
	}
	function dropCentiSecond(): void {
		centiSeconds.value--
	}

	return {
		isRunning,
		minutes,
		seconds,
		centiSeconds,
		timerSwitchOn,
		timerSwitchOff,
		dropMinute,
		dropSecond,
		dropCentiSecond,
	}
})
