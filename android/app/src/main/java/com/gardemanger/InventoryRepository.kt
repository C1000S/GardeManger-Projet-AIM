package com.gardemanger

/**
 * Point d'accès unique aux données d'inventaire.
 * TODO(Rémi) : ajouter Room comme source locale + synchro pull/push.
 */
class InventoryRepository(private val api: GardeMangerApi = ApiClient.api) {
    suspend fun pantries(): List<PantryDto> = api.getPantries()
    suspend fun items(pantryId: String): List<ItemDto> = api.getItems(pantryId)
}
