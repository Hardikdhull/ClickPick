package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import androidx.core.widget.addTextChangedListener
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

class SearchActivity : AppCompatActivity() {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View
    private lateinit var searchET: EditText

    private val BASE_URL = "http://panel.mait.ac.in:8005/"
    private val cartList = mutableListOf<cartModel>()
    private lateinit var listItems: RecyclerView
    private lateinit var itemsAvailableAdapter: itemsAvailableAdapter

    private lateinit var dbHelper: CartDB

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)
        overridePendingTransition(0,0)


        //db
        dbHelper = CartDB(this)

        //searching logic
        searchET = findViewById(R.id.search_et)

        listItems = findViewById(R.id.listItems)
        listItems.layoutManager = LinearLayoutManager(applicationContext)
        listItems.setHasFixedSize(true)

        itemsAvailableAdapter = itemsAvailableAdapter(arrayListOf(), cartList, dbHelper)
        listItems.adapter = itemsAvailableAdapter

        fetchDataAndFilter("")

        searchET.addTextChangedListener {
            fetchDataAndFilter(it.toString())
        }



        //bottom navigation
        home = findViewById(R.id.Shome)
        search = findViewById(R.id.Ssearch)
        cart = findViewById(R.id.Scart)
        print = findViewById(R.id.Sprint)
        profile = findViewById(R.id.Sprofile)

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
    private fun fetchDataAndFilter(searchTerm: String) {
        val accessToken = getAccessToken()

        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
            .addInterceptor { chain ->
                val original = chain.request()
                val requestBuilder = original.newBuilder()
                    .header("Authorization", "Bearer $accessToken")
                    .method(original.method, original.body)
                val request = requestBuilder.build()
                chain.proceed(request)
            }
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build()

        val itemListApi = retrofit.create(ApiServices::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val products = itemListApi.getItemList()
                val filteredProducts = products.filter { it.item.toLowerCase().contains(searchTerm.toLowerCase()) }
                withContext(Dispatchers.Main) {
                    itemsAvailableAdapter.updateData(filteredProducts)
                }
            } catch (e: Exception) {
                Log.e("fetching error", "Error is ${e.message.toString()}")
            }
        }
    }
    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token",null)
    }
    //
}