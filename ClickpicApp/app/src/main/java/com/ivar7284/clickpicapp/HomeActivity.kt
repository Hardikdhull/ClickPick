package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ivar7284.clickpicapp.adapters.itemsAvailableAdapter
import com.ivar7284.clickpicapp.cartDatabase.CartDB
import com.ivar7284.clickpicapp.dataclasses.cartModel
import com.ivar7284.clickpicapp.interfaces.ApiServices
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class HomeActivity : AppCompatActivity(){

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View
    private lateinit var itemsAvailable: RecyclerView
    private lateinit var itemsAvailableAdapter: itemsAvailableAdapter

    private val BASE_URL = "http://panel.mait.ac.in:8005/"
    private val cartList = mutableListOf<cartModel>()

    private lateinit var dbHelper: CartDB

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        overridePendingTransition(0,0)

        //db
        dbHelper = CartDB(this)

        //add data to the item list dataclass
        val accessToken = getAccessToken()
        Log.d("fetching error", accessToken.toString())
        val okHtttpClient = OkHttpClient.Builder()
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
            .client(okHtttpClient)
            .build()

        val itemListapi = retrofit.create<ApiServices>(ApiServices::class.java)

        itemsAvailable = findViewById(R.id.itemsAvailable)
        itemsAvailable.layoutManager = LinearLayoutManager(applicationContext)
        itemsAvailable.setHasFixedSize(true)

        itemsAvailableAdapter = itemsAvailableAdapter(arrayListOf(), cartList, dbHelper)
        itemsAvailable.adapter = itemsAvailableAdapter

        Log.d("cartdatahomeactivity", cartList.toString())


        CoroutineScope(Dispatchers.IO).launch {
            try {
                val products = itemListapi.getItemList()
                withContext(Dispatchers.Main) {
                    // Update the adapter with the new data
                    Log.d("fetching error", products.toString())
                    itemsAvailableAdapter.updateData(products)
                }
            } catch (e: Exception) {

                Log.e("fetching error", "Error is ${e.message.toString()}")
            }
        }


        //bottom navigation
        home = findViewById(R.id.Hhome)
        search = findViewById(R.id.Hsearch)
        cart = findViewById(R.id.Hcart)
        print = findViewById(R.id.Hprint)
        profile = findViewById(R.id.Hprofile)

        home.setOnClickListener {
            startActivity(Intent(applicationContext,HomeActivity::class.java))
            finish()
        }
        search.setOnClickListener {
            startActivity(Intent(applicationContext,SearchActivity::class.java))
            finish()
        }
        cart.setOnClickListener {
            startActivity(Intent(applicationContext, CartActivity::class.java))
            Log.d("connectiondb", dbHelper.getAllCartItems().toString())
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