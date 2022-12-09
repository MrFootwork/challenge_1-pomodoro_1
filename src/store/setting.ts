import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
	// state
	const isEditable: boolean = ref(false)
	// getters (computed())
	// actions
	function activate() {
		isEditable.value = true
	}
	function deactivate() {
		isEditable.value = false
	}

	return { isEditable, activate, deactivate }
})
