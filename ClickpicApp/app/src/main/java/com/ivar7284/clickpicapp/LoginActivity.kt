package com.ivar7284.clickpicapp

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.ivar7284.clickpicapp.dataclasses.LoginReq
import com.ivar7284.clickpicapp.dataclasses.LoginResponse
import com.ivar7284.clickpicapp.objects.retrofitInstance
import retrofit2.Call
import retrofit2.Response
import javax.security.auth.callback.Callback

class LoginActivity : AppCompatActivity() {

    private lateinit var signupBtn: TextView
    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var loginBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        overridePendingTransition(0,0)

        email = findViewById(R.id.email_et)
        password = findViewById(R.id.password_et)
        loginBtn = findViewById(R.id.loginBtn)

        loginBtn.setOnClickListener {
            //connection to backend
            loginUser()
        }

        //sign up
        signupBtn = findViewById(R.id.signupBtn_tv)
        signupBtn.setOnClickListener {
            startActivity(Intent(applicationContext, RegisterActivity::class.java))
            finish()
        }

    }

    private fun loginUser() {
        val mail = email.text.toString()
        val pass = password.text.toString()
        val loginReq =LoginReq(mail,pass)

        retrofitInstance.api.login(loginReq).enqueue(object: retrofit2.Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>){
                if(response.isSuccessful){
                    //login successfull
                    val accessToken = response.body()?.access
                    saveAccessToken(accessToken)//saves the token in shared space
                    Toast.makeText(applicationContext, "Login successful!", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(applicationContext, HomeActivity::class.java))
                    finish()
                } else {
                    // Login failed
                    Toast.makeText(this@LoginActivity, "Login Failed: ${response.message()}", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Log.e("loginerror", "Login Failed: ${t.message}")
                Toast.makeText(this@LoginActivity, "Login Failed: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun saveAccessToken(accessToken: String?) {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        with(sharedPreferences.edit()) {
            putString("access_token", accessToken)
            apply()
        }
    }
    //
}