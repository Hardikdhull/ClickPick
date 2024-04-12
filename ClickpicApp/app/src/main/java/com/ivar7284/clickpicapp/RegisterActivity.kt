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
import com.ivar7284.clickpicapp.dataclasses.registerReq
import com.ivar7284.clickpicapp.dataclasses.registerResponse
import com.ivar7284.clickpicapp.objects.retrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.HttpException
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    private lateinit var loginBtn: TextView
    private lateinit var name: EditText
    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var phone: EditText
    private lateinit var signupBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        overridePendingTransition(0, 0)

        name = findViewById(R.id.name_et)
        email = findViewById(R.id.email_et)
        phone = findViewById(R.id.phone_et)
        password = findViewById(R.id.password_et)
        signupBtn = findViewById(R.id.signupBtn)

        signupBtn.setOnClickListener {
            //creating user and uploading to backend
            val name: String = name.text.toString()
            val mob: String = phone.text.toString()
            val mail: String = email.text.toString()
            val pass: String = password.text.toString()
            val role = "STUDENT"

            val registerRequest = registerReq(name, mail, pass, mob, role)
            Log.i("loginerror", "${registerRequest}")
            retrofitInstance.api.register(registerRequest)
                .enqueue(object : Callback<registerResponse> {
                    override fun onResponse(
                        call: Call<registerResponse>,
                        response: Response<registerResponse>
                    ) {
                        if (response.isSuccessful) {
                            Toast.makeText(
                                applicationContext,
                                "Registration Successful",
                                Toast.LENGTH_SHORT
                            ).show()

                            //for auto login
                            val loginReq = LoginReq(mail, pass)
                            retrofitInstance.api.login(loginReq)
                                .enqueue(object : retrofit2.Callback<LoginResponse> {
                                    override fun onResponse(
                                        call: Call<LoginResponse>,
                                        response: Response<LoginResponse>
                                    ) {
                                        if (response.isSuccessful) {
                                            //login successful
                                            val accessToken = response.body()?.access
                                            saveAccessToken(accessToken)//saves the token in shared space
                                            Toast.makeText(
                                                applicationContext,
                                                "Login successful!",
                                                Toast.LENGTH_SHORT
                                            ).show()
                                            startActivity(
                                                Intent(
                                                    applicationContext,
                                                    HomeActivity::class.java
                                                )
                                            )
                                            finish()
                                        } else {
                                            // Login failed
                                            Toast.makeText(
                                                applicationContext,
                                                "Login Failed: ${response.message()}",
                                                Toast.LENGTH_SHORT
                                            ).show()
                                        }
                                    }

                                    override fun onFailure(
                                        call: Call<LoginResponse>,
                                        t: Throwable
                                    ) {
                                        Log.e("loginerror", "Login Failed: ${t.message}")
                                        Toast.makeText(
                                            applicationContext,
                                            "Login Failed: ${t.message}",
                                            Toast.LENGTH_SHORT
                                        ).show()
                                    }
                                })

                        } else {

                            Log.e("loginerror", "Registration Failed 1: ${response.message()}")
                            Toast.makeText(
                                applicationContext,
                                "Registration Unsuccessful: ${response.message()}",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<registerResponse>, t: Throwable) {
                        Log.e("loginerror", "Registration Failed: ${t.message}", t)
                        if (t is HttpException) {
                            val errorBody = t.response()?.errorBody()?.string()
                            Log.e("loginerror", "Error body: $errorBody")
                        }
                        Toast.makeText(
                            this@RegisterActivity,
                            "Registration Failed: ${t.message}",
                            Toast.LENGTH_SHORT
                        ).show()
                    }

                })
        }

        //login
        loginBtn = findViewById(R.id.loginBtn_tv)
        loginBtn.setOnClickListener {
            startActivity(Intent(applicationContext, LoginActivity::class.java))
            finish()
        }

    }

    private fun saveAccessToken(accessToken: String?) {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        with(sharedPreferences.edit()) {
            putString("access_token", accessToken)
            apply()
        }
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }
    //
}