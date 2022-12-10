import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
	// state
	const isEditable: boolean = ref(false)
	// getters (computed())
	// actions
	function startEditing() {
		isEditable.value = true
	}
	function stopEditing() {
		isEditable.value = false
	}

	return { isEditable, startEditing, stopEditing }
})
