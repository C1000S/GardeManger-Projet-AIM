package com.gardemanger

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

object Routes {
    const val INVENTORY = "inventory"
    const val ADD_ITEM = "add_item"
}

@Composable
fun GardeMangerNavGraph() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Routes.INVENTORY) {
        composable(Routes.INVENTORY) {
            InventoryScreen(onAddClick = { navController.navigate(Routes.ADD_ITEM) })
        }
        composable(Routes.ADD_ITEM) {
            AddItemScreen(onBack = { navController.popBackStack() })
        }
    }
}
