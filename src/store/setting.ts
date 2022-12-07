import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
	// state
	const isActivated: boolean = ref(false)
	// getters (computed())
	// actions
	function activate() {
		isActivated.value = true
	}
	function deactivate() {
		isActivated.value = false
	}

	return { isActivated, activate, deactivate }
})
