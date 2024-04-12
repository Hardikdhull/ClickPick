package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.ivar7284.clickpicapp.dataclasses.costCalculator
import com.ivar7284.clickpicapp.dataclasses.costCalculatorResponse
import com.ivar7284.clickpicapp.interfaces.ApiServices
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.json.JSONArray
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader

class PrintActivity : AppCompatActivity() {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View

    private lateinit var filepicker: Button
    private lateinit var bwpages: EditText
    private lateinit var coloredpages: EditText
    private lateinit var payBtn: Button
    private lateinit var customMessage: EditText
    private lateinit var printOnlyOneSide: CheckBox
    private lateinit var addBtn: Button

    private lateinit var costCalculator: LinearLayout
    private lateinit var firstPageGenerator: LinearLayout

    private val READ_REQUEST_CODE = 42

    private val BASE_URL = "http://panel.mait.ac.in:8005/"

    private lateinit var fileUri: String
    private lateinit var actualFile: ByteArray

    @RequiresApi(Build.VERSION_CODES.Q)
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_print)
        overridePendingTransition(0, 0)

        //initializing json file
        var jsonFile = JSONArray()

        //file picking code
        filepicker = findViewById(R.id.filepicker)
        filepicker.setOnClickListener {
            openFilePicker()
        }

        bwpages = findViewById(R.id.bwpages)
        coloredpages = findViewById(R.id.coloredpages)
        payBtn = findViewById(R.id.payBtn)
        customMessage = findViewById(R.id.customMessage)
        printOnlyOneSide = findViewById(R.id.printOnlyOneSide)
        addBtn = findViewById(R.id.addBtn)

        val printOneSideBoolean: Boolean = printOnlyOneSide.isChecked

        payBtn.setOnClickListener {

            val details = costCalculator(
                fileUri,
                arrayListOf(bwpages.text.toString()),
                arrayListOf(coloredpages.text.toString())
            )

            Log.d("file printing", details.toString())

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

            val costCalculatorapi = retrofit.create<ApiServices>(ApiServices::class.java)

            costCalculatorapi.getCalculatedCost(details)
                .enqueue(object : Callback<costCalculatorResponse> {
                    override fun onResponse(
                        call: Call<costCalculatorResponse>,
                        response: Response<costCalculatorResponse>
                    ) {
                        Log.d("file printing", response.body().toString())

                        startActivity(
                            Intent(
                                applicationContext,
                                PaymentGatewayActivity::class.java
                            )
                        )
                        filepicker.text = "Click to Choose"
                    }

                    override fun onFailure(
                        call: Call<costCalculatorResponse>,
                        t: Throwable
                    ) {
                        Log.d("file printing", t.message.toString())
                    }
                })
            jsonFile = JSONArray()
        }

        addBtn.setOnClickListener {
            val jsonArray = JSONArray()
            jsonArray.put(actualFile)
            jsonArray.put(bwpages.text.toString())
            jsonArray.put(coloredpages.text.toString())
            jsonArray.put(customMessage.text.toString())
            jsonArray.put(printOneSideBoolean)
            Log.d("json array", jsonArray.toString())
            jsonFile.put(jsonArray)
            Log.d("json array", jsonFile.toString())

            if (jsonArray.length() != 0 && jsonFile.length() != 0) {
                Toast.makeText(
                    applicationContext,
                    "FILL THE FORM AGAIN FOR ADDING NEXT FILE",
                    Toast.LENGTH_LONG
                ).show()
                fileUri = ""
                filepicker.text = "Click to Choose Another"
                bwpages.text = null
                coloredpages.text = null
                customMessage.text = null
                printOnlyOneSide.isChecked = false
            }

        }


        //top navigation
        costCalculator = findViewById(R.id.printcal)
        firstPageGenerator = findViewById(R.id.pageGen)
        costCalculator.setOnClickListener {
            startActivity(Intent(applicationContext, PrintActivity::class.java))
            finish()
        }
        firstPageGenerator.setOnClickListener {
            startActivity(Intent(applicationContext, PageGenActivity::class.java))
            finish()
        }

        //bottom navigation
        home = findViewById(R.id.Phome)
        search = findViewById(R.id.Psearch)
        cart = findViewById(R.id.Pcart)
        print = findViewById(R.id.Pprint)
        profile = findViewById(R.id.Pprofile)

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

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }

    private fun openFilePicker() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "application/*"
        startActivityForResult(intent, READ_REQUEST_CODE)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == READ_REQUEST_CODE && resultCode == Activity.RESULT_OK && data != null) {
            // Get the URI of the selected PDF file
            val selectedFileUri: Uri = data.data ?: return

            fileUri = selectedFileUri.toString()
            Log.d("file printing", fileUri)

            val fileName = selectedFileUri.lastPathSegment ?: "Unknown file"
            filepicker.text = fileName

            // Read the content of the PDF file
            GlobalScope.launch(Dispatchers.IO) {
                val inputStream = contentResolver.openInputStream(selectedFileUri)
                val content = inputStream?.readBytes()
                inputStream?.close()

                // Use 'content' as the byte array representing the file
                if (content != null) {
                    actualFile = content
                    Log.d("1234567890", "${content}")
                } else {
                    Toast.makeText(
                        applicationContext,
                        "Error in getting the content",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    //
}

