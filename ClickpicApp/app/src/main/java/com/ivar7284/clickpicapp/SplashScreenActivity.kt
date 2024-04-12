package com.ivar7284.clickpicapp

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import java.util.Timer
import java.util.TimerTask

class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splashscreen)
        overridePendingTransition(0,0)
        val timer = Timer()
        timer.schedule(object : TimerTask() {
            override fun run() {
                val accessToken = getAccessToken()
                if (accessToken != null){
                    startActivity(Intent(applicationContext, HomeActivity::class.java))
                    finish()
                }else {
                    startActivity(Intent(applicationContext, LoginActivity::class.java))
                    finish()
                }
            }
        }, 500)
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
}

