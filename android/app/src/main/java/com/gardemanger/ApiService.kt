package com.gardemanger

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

// --- DTOs : reflètent openapi.yaml ---
data class ItemDto(
    val id: String,
    val pantry: String,
    val product: String?,
    val label: String,
    val quantity: Double,
    val unit: String,
    val expirationDate: String?,
    val location: String,
    val status: String,
    val addedBy: String?,
)

data class PantryDto(
    val id: String,
    val name: String,
    val owner: String,
    val members: List<String>,
)

// --- Endpoints (sous-ensemble pour démarrer ; compléter d'après openapi.yaml) ---
interface GardeMangerApi {
    @GET("pantries")
    suspend fun getPantries(): List<PantryDto>

    @GET("pantries/{pantryId}/items")
    suspend fun getItems(
        @Path("pantryId") pantryId: String,
        @Query("location") location: String? = null,
        @Query("status") status: String? = null,
    ): List<ItemDto>
}

object ApiClient {
    // 10.0.2.2 = le localhost de la machine hôte, vu depuis l'émulateur Android.
    private const val BASE_URL = "http://10.0.2.2:3000/api/"

    private val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()

    private val okHttp = OkHttpClient.Builder()
        .addInterceptor(
            HttpLoggingInterceptor().apply { level = HttpLoggingInterceptor.Level.BODY },
        )
        .build()

    val api: GardeMangerApi = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttp)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()
        .create(GardeMangerApi::class.java)
}
