package com.gardemanger

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class InventoryUiState(
    val loading: Boolean = false,
    val items: List<ItemDto> = emptyList(),
    val error: String? = null,
)

class InventoryViewModel(
    private val repo: InventoryRepository = InventoryRepository(),
) : ViewModel() {

    private val _state = MutableStateFlow(InventoryUiState())
    val state: StateFlow<InventoryUiState> = _state.asStateFlow()

    fun load() {
        _state.value = _state.value.copy(loading = true, error = null)
        viewModelScope.launch {
            try {
                val pantryId = repo.pantries().firstOrNull()?.id
                val items = if (pantryId != null) repo.items(pantryId) else emptyList()
                _state.value = InventoryUiState(loading = false, items = items)
            } catch (e: Exception) {
                _state.value = InventoryUiState(loading = false, error = e.message ?: "Erreur réseau")
            }
        }
    }
}
