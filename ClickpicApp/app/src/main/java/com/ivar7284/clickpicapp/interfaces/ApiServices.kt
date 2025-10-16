package com.ivar7284.clickpicapp.interfaces

import com.ivar7284.clickpicapp.dataclasses.LoginReq
import com.ivar7284.clickpicapp.dataclasses.LoginResponse
import com.ivar7284.clickpicapp.dataclasses.activeOrderList
import com.ivar7284.clickpicapp.dataclasses.costCalculator
import com.ivar7284.clickpicapp.dataclasses.costCalculatorResponse
import com.ivar7284.clickpicapp.dataclasses.generateFirstPage
import com.ivar7284.clickpicapp.dataclasses.generateFirstPageResponse
import com.ivar7284.clickpicapp.dataclasses.itemList
import com.ivar7284.clickpicapp.dataclasses.pastOrderList
import com.ivar7284.clickpicapp.dataclasses.registerReq
import com.ivar7284.clickpicapp.dataclasses.registerResponse
import com.ivar7284.clickpicapp.dataclasses.userDetails
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Url

interface ApiServices {
    @POST("auth/login/")
    fun login(@Body loginReq: LoginReq): Call<LoginResponse>
    @POST("auth/register/")
    fun register(@Body registerRequest: registerReq): Call<registerResponse>
    @GET("auth/user-details/")
    suspend fun getuserDetails(): userDetails
    @GET("stationery/item-list/")
    suspend fun getItemList(): List<itemList>
    @GET("stationery/active-orders/")
    suspend fun activeOrderList(): List<activeOrderList>
    @GET("stationery/past-orders/")
    suspend fun pastOrderlist(): List<pastOrderList>
    @POST("stationery/generate-firstpage/")
    fun genFirstPage(@Body detailsForFirstPage: generateFirstPage): Call<generateFirstPageResponse>
    @POST("stationery/calculate-cost/")
    fun getCalculatedCost(@Body detailsForcostCalculator: costCalculator): Call<costCalculatorResponse>
    @GET
    fun downloadPdfFile(@Url pdfUrl: String): Call<ResponseBody>
}