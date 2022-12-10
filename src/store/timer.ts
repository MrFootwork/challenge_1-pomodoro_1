import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
	// state
	const initialMinutes: string = ref('11')
	const initialSeconds: string = ref('03')
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
		seconds.value = initialSeconds.value
		minutes.value = initialMinutes.value
	}
	function timerPause(): void {
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
	function setInitialTime() {
		initialMinutes.value = minutes.value.padStart(1, '0')
		initialSeconds.value = seconds.value.padStart(2, '0')
	}

	return {
		isRunning,
		minutes,
		seconds,
		centiSeconds,
		timerSwitchOn,
		timerSwitchOff,
		timerPause,
		setInitialTime,
		dropMinute,
		dropSecond,
		dropCentiSecond,
	}
})
