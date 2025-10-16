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
import com.ivar7284.clickpicapp.adapters.activeOrderListAdapter
import com.ivar7284.clickpicapp.interfaces.ApiServices
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ActiveOrdersActivity : AppCompatActivity() {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View

    private lateinit var details: LinearLayout
    private lateinit var activeOrders: LinearLayout
    private lateinit var pastOrders: LinearLayout

    private lateinit var activeOrderList: RecyclerView
    private lateinit var activeOrderListAdapter: activeOrderListAdapter
    private val BASE_URL = "http://panel.mait.ac.in:8005/"

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_active_orders)
        overridePendingTransition(0,0)

        //add data to the active order item list dataclass
        val accessToken = getAccessToken()
        Log.d("fetching error", accessToken.toString())
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

        val activeOrderListapi = retrofit.create<ApiServices>(ApiServices::class.java)

        activeOrderList = findViewById(R.id.activeOrderList)
        activeOrderList.layoutManager = LinearLayoutManager(applicationContext)
        activeOrderList.setHasFixedSize(true)

        activeOrderListAdapter = activeOrderListAdapter(arrayListOf())
        activeOrderList.adapter = activeOrderListAdapter

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val products = activeOrderListapi.activeOrderList()
                withContext(Dispatchers.Main) {
                    // Update the adapter with the new data
                    Log.d("fetching error", products.toString())
                    activeOrderListAdapter.updateData(products)
                }

            } catch (e: Exception) {
                Log.e("fetching error", "Error is ${e.message.toString()}")
            }
        }


        //top navigation
        details = findViewById(R.id.Adetails)
        activeOrders = findViewById(R.id.Aactiveorders)
        pastOrders = findViewById(R.id.Apastorders)

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
        home = findViewById(R.id.AAhome)
        search = findViewById(R.id.AAsearch)
        cart = findViewById(R.id.AAcart)
        print = findViewById(R.id.AAprint)
        profile = findViewById(R.id.AAprofile)

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