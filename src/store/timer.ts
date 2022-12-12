import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
	// state
	const initialMinutes = ref('15')
	const initialSeconds = ref('00')
	const isRunning = ref(false)
	const minutes = ref('15')
	const seconds = ref('00')
	const centiSeconds = ref(0)
	// getters (computed())
	const wasRunning = computed(() => {
		return (
			minutes.value < initialMinutes.value ||
			seconds.value < initialSeconds.value ||
			centiSeconds.value !== 0
		)
	})

	// actions
	function timerSwitchOn(): void {
		isRunning.value = true
	}
	function timerSwitchOff(): void {
		isRunning.value = false
		seconds.value = initialSeconds.value
		minutes.value = initialMinutes.value
		centiSeconds.value = 0
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
		minutes.value = minutes.value.padStart(1, '0')
		seconds.value = seconds.value.padStart(2, '0')
		centiSeconds.value = 0
	}

	return {
		isRunning,
		minutes,
		seconds,
		centiSeconds,
		wasRunning,
		timerSwitchOn,
		timerSwitchOff,
		timerPause,
		setInitialTime,
		dropMinute,
		dropSecond,
		dropCentiSecond,
	}
})
