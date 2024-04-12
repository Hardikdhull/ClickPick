package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ivar7284.clickpicapp.adapters.pastOrderListAdapter
import com.ivar7284.clickpicapp.interfaces.ApiServices
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class PastOrdersActivity : AppCompatActivity() {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View

    private lateinit var details: LinearLayout
    private lateinit var activeOrders: LinearLayout
    private lateinit var pastOrders: LinearLayout

    private lateinit var pastOrderList: RecyclerView
    private lateinit var pastOrderListAdapter: pastOrderListAdapter
    private val BASE_URL = "http://panel.mait.ac.in:8005/"

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_past_orders)
        overridePendingTransition(0,0)


        val accessToken = getAccessToken()

        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
            .addInterceptor{chain ->
                val original = chain.request()
                val requestBuilder = original.newBuilder()
                    .header("Authorization", "Bearer $accessToken")
                    .method(original.method, original.body)
                val request = requestBuilder.build()
                Log.d("fetching error",request.toString())
                chain.proceed(request)
            }
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build()

        val pastOrderListapi = retrofit.create<ApiServices>(ApiServices::class.java)

        pastOrderList = findViewById(R.id.pastOrderList)
        pastOrderList.layoutManager = LinearLayoutManager(applicationContext)
        pastOrderList.setHasFixedSize(true)

        pastOrderListAdapter = pastOrderListAdapter(arrayListOf())
        pastOrderList.adapter = pastOrderListAdapter

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val products = pastOrderListapi.pastOrderlist()
                withContext(Dispatchers.Main) {
                    // Update the adapter with the new data
                    Log.d("fetching error", products.toString())
                    pastOrderListAdapter.updateData(products)
                }

            } catch (e: Exception) {
                Log.e("fetching error", "Error is ${e.message.toString()}")
            }
        }


        //top navigation
        details = findViewById(R.id.Pdetails)
        activeOrders = findViewById(R.id.Pactiveorders)
        pastOrders = findViewById(R.id.Ppastorders)

        details.setOnClickListener {
            startActivity(Intent(applicationContext,ProfileActivity::class.java))
            finish()
        }
        activeOrders.setOnClickListener {
            startActivity(Intent(applicationContext,ActiveOrdersActivity::class.java))
            finish()
        }
        pastOrders.setOnClickListener {
            startActivity(Intent(applicationContext,PastOrdersActivity::class.java))
            finish()
        }

        //bottom navigation
        home = findViewById(R.id.APhome)
        search = findViewById(R.id.APsearch)
        cart = findViewById(R.id.APcart)
        print = findViewById(R.id.APprint)
        profile = findViewById(R.id.APprofile)

        home.setOnClickListener {
            startActivity(Intent(applicationContext,HomeActivity::class.java))
            finish()
        }
        search.setOnClickListener {
            startActivity(Intent(applicationContext,SearchActivity::class.java))
            finish()
        }
        cart.setOnClickListener {
            startActivity(Intent(applicationContext,CartActivity::class.java))
            finish()
        }
        print.setOnClickListener {
            startActivity(Intent(applicationContext,PrintActivity::class.java))
            finish()
        }
        profile.setOnClickListener {
            startActivity(Intent(applicationContext,ProfileActivity::class.java))
            finish()
        }

    }
    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token",null)
    }
    //
}