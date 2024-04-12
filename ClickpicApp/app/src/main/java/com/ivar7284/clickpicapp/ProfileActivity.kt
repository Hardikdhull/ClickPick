package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.content.ContentUris
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.ivar7284.clickpicapp.dataclasses.userDetails
import com.ivar7284.clickpicapp.interfaces.ApiServices
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create
import java.lang.Exception

class ProfileActivity : AppCompatActivity() {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View

    private lateinit var logoutBtn: Button

    private lateinit var details: LinearLayout
    private lateinit var activeOrders: LinearLayout
    private lateinit var pastOrders: LinearLayout

    private val BASE_URL = "http://panel.mait.ac.in:8005/"

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)
        overridePendingTransition(0, 0)

        //access token
        val accessToken = getAccessToken()
        if (accessToken != null) {

            val okHttpClient =OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
                .addInterceptor{chain ->  
                    val original = chain.request()
                    val requestBuilder = original.newBuilder()
                        .header("Authorization", "Bearer $accessToken")
                        .method(original.method,original.body)
                    val request = requestBuilder.build()
                    chain.proceed(request)
                }
                .build()

            val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(okHttpClient)
                .build()
            val userServices = retrofit.create<ApiServices>(ApiServices::class.java)

            CoroutineScope(Dispatchers.Main).launch {
                try {
                    val user = userServices.getuserDetails()
                    if (user.name.isNotEmpty() && user.number.isNotEmpty() && user.email.isNotEmpty()) {
                        Log.d("user details", user.toString())
                        displayProduct(user)
                    }
                } catch (e: Exception) {
                    Log.e("user details", e.message.toString())
                    e.printStackTrace()
                }
            }
            //logout function
            logoutBtn = findViewById(R.id.logoutBtn)
            logoutBtn.setOnClickListener {
                clearAccessToken()
                startActivity(Intent(applicationContext, LoginActivity::class.java))
                finish()
            }
        }else{
            startActivity(Intent(applicationContext, LoginActivity::class.java))
            finish()
        }

        //top navigation
        details = findViewById(R.id.details)
        activeOrders = findViewById(R.id.activeorders)
        pastOrders = findViewById(R.id.pastorders)

        details.setOnClickListener {
            startActivity(Intent(applicationContext, ProfileActivity::class.java))
            finish()
        }
        activeOrders.setOnClickListener {
            startActivity(Intent(applicationContext, ActiveOrdersActivity::class.java))
            finish()
        }
        pastOrders.setOnClickListener {
            startActivity(Intent(applicationContext, PastOrdersActivity::class.java))
            finish()
        }

        //bottom navigation
        home = findViewById(R.id.Ahome)
        search = findViewById(R.id.Asearch)
        cart = findViewById(R.id.Acart)
        print = findViewById(R.id.Aprint)
        profile = findViewById(R.id.Aprofile)

        home.setOnClickListener {
            startActivity(Intent(applicationContext, HomeActivity::class.java))
            finish()
        }
        search.setOnClickListener {
            startActivity(Intent(applicationContext, SearchActivity::class.java))
            finish()
        }
        cart.setOnClickListener {
            startActivity(Intent(applicationContext, CartActivity::class.java))
            finish()
        }
        print.setOnClickListener {
            startActivity(Intent(applicationContext, PrintActivity::class.java))
            finish()
        }
        profile.setOnClickListener {
            startActivity(Intent(applicationContext, ProfileActivity::class.java))
            finish()
        }
    }

    private fun clearAccessToken() {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.remove("access_token")
        editor.apply()
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }

    private fun displayProduct(user: userDetails) {
        findViewById<TextView>(R.id.name).text = "Name: ${user.name}"
        findViewById<TextView>(R.id.phone).text = "Mobile No.: ${user.number}"
        findViewById<TextView>(R.id.email).text = "Email: ${user.email}"
    }
    //
}