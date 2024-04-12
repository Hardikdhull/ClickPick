package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.core.content.FileProvider
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.github.barteksc.pdfviewer.PDFView
import com.google.gson.GsonBuilder
import com.ivar7284.clickpicapp.dataclasses.generateFirstPage
import com.ivar7284.clickpicapp.dataclasses.generateFirstPageResponse
import com.ivar7284.clickpicapp.interfaces.ApiServices
import com.ivar7284.clickpicapp.viewModels.pdfViewModel
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import okio.ByteString.Companion.toByteString
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.IOException

class PageGenActivity : AppCompatActivity() {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View

    private lateinit var costCalculator: LinearLayout
    private lateinit var firstPageGenerator: LinearLayout

    private lateinit var subName: EditText
    private lateinit var subCode: EditText
    private lateinit var facultyName: EditText
    private lateinit var stuName: EditText
    private lateinit var facultyDesignation: EditText
    private lateinit var rollNo: EditText
    private lateinit var sem: EditText
    private lateinit var group: EditText
    private lateinit var genBtn: Button

    private val BASE_URL = "http://panel.mait.ac.in:8005/"
    private val BASE_URL1 = "http://panel.mait.ac.in:8005"

    lateinit var viewModel: pdfViewModel
    lateinit var progressBar: ProgressBar
    lateinit var pdfView: PDFView
    var completeURL: String = ""

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_page_gen)
        overridePendingTransition(0, 0)

        //adding data to the data class
        subName = findViewById(R.id.subName)
        subCode = findViewById(R.id.subCode)
        facultyName = findViewById(R.id.facultyName)
        facultyDesignation = findViewById(R.id.facultyDesignation)
        stuName = findViewById(R.id.stuName)
        rollNo = findViewById(R.id.rollNo)
        sem = findViewById(R.id.semester)
        group = findViewById(R.id.group)
        genBtn = findViewById(R.id.genBtn)


        genBtn.setOnClickListener {
            val details = generateFirstPage(
                subName.text.toString(),
                subCode.text.toString(),
                facultyName.text.toString(),
                stuName.text.toString(),
                facultyDesignation.text.toString(),
                rollNo.text.toString(),
                sem.text.toString(),
                group.text.toString()
            )

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
                .addConverterFactory(GsonConverterFactory.create(GsonBuilder().setLenient().create()))
                .client(okHttpClient)
                .build()

            val pageGenapi = retrofit.create<ApiServices>(ApiServices::class.java)

            pageGenapi.genFirstPage(details)
                .enqueue(object : Callback<generateFirstPageResponse> {
                override fun onResponse(
                    call: Call<generateFirstPageResponse>,
                    response: Response<generateFirstPageResponse>
                ) {
                    if (response.isSuccessful) {
                        val responseBody = response.body()
                        Log.d("Raw response", responseBody.toString())
                        if (responseBody != null) {
                            try {
                                val responseBodyString = responseBody.toString()
                                Log.d("Raw response", responseBodyString)
                                // Parse the response string here or handle it accordingly
                            } catch (e: IOException) {
                                Log.e("Raw response", "Error reading response body: ${e.message}")
                            }
                            val pdfContent = responseBody.pdfContent
                            val fileName = responseBody.fileName

                            initViewModel(pdfContent, fileName)
                        } else {
                            Log.d("Raw response", "Response body is null")
                        }
                    } else {
                        Log.d("Raw response", "Unsuccessful response: ${response.code()}")
                    }
                }

                override fun onFailure(
                    call: Call<generateFirstPageResponse>,
                    t: Throwable
                ) {
                    Log.d("Raw response", t.message.toString())
                }
            })
        }


        //pdf downloader


        //top navigation
        costCalculator = findViewById(R.id.Fprintcal)
        firstPageGenerator = findViewById(R.id.FpageGen)
        costCalculator.setOnClickListener {
            startActivity(Intent(applicationContext, PrintActivity::class.java))
            finish()
        }
        firstPageGenerator.setOnClickListener {
            startActivity(Intent(applicationContext, PageGenActivity::class.java))
            finish()
        }

        //bottom navigation
        home = findViewById(R.id.Fhome)
        search = findViewById(R.id.Fsearch)
        cart = findViewById(R.id.Fcart)
        print = findViewById(R.id.Fprint)
        profile = findViewById(R.id.Fprofile)

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

    private fun initViewModel(pdfContent: ByteArray, fileName: String) {
        viewModel = ViewModelProvider(this, object : ViewModelProvider.NewInstanceFactory() {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return pdfViewModel(filesDir) as T
            }
        }).get(pdfViewModel::class.java)

        progressBar = findViewById(R.id.progressBar)
        pdfView = findViewById(R.id.pdfView)

        viewModel.isFileReadyObserver.observe(this, Observer<Boolean> {
            progressBar.visibility = View.GONE
            if (!it) {
                Toast.makeText(applicationContext, "Failed to download PDF", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(applicationContext, "PDF downloaded", Toast.LENGTH_SHORT).show()
                try {
                    pdfView.fromBytes(pdfContent).load() // Load PDF directly from byte array
                } catch (e: Exception) {
                    Toast.makeText(applicationContext, "${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        })
    }

    private fun showDownloadNotification(downloadId: Long) {
        val notificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "download_channel",
                "Download Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            notificationManager.createNotificationChannel(channel)
        }

        val builder = NotificationCompat.Builder(this, "download_channel")
            .setSmallIcon(R.drawable.download_icon)
            .setContentTitle("Download in progress")
            .setContentText("Downloading file...")
            .setProgress(0, 0, true)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)

        notificationManager.notify(downloadId.toInt(), builder.build())
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }
    //
}