package com.ivar7284.clickpicapp.objects

import com.ivar7284.clickpicapp.interfaces.ApiServices
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import kotlin.reflect.KProperty

object retrofitInstance {

    private const val BASE_URL = "http://panel.mait.ac.in:8005/"

    private val retrofit =
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()


    val api = retrofit.create(ApiServices::class.java)

}
