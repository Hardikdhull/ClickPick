package com.ivar7284.clickpicapp.viewModels

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.ivar7284.clickpicapp.interfaces.ApiServices
import com.ivar7284.clickpicapp.objects.retrofitInstance
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.io.InputStream
import java.io.OutputStream
import kotlin.concurrent.thread

class pdfViewModel(val fileDir: File): ViewModel() {

    private val BASE_URL1 = "http://panel.mait.ac.in:8005"

    private var pdfFileName: File
    private var dirPath: String
    private var fileName: String
    lateinit var isFileReadyObserver: MutableLiveData<Boolean>

    init {

        dirPath = "$fileDir/cert/pdffiles"
        val dirFile = File(dirPath)
        if (!dirFile.exists()) dirFile.mkdirs()
        fileName = "demos.pdf"
        val file = "$dirPath/$fileName"
        pdfFileName = File(file)
        if (pdfFileName.exists()){
            pdfFileName.delete()
        }
        isFileReadyObserver = MutableLiveData()
    }

    fun downloadFile(pdfUrl: String){
        thread {
            val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL1)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            val pageGenapi = retrofit.create<ApiServices>(ApiServices::class.java)
            pageGenapi.downloadPdfFile(pdfUrl)
                .enqueue(object : Callback<ResponseBody>{
                    override fun onResponse(
                        call: Call<ResponseBody>,
                        response: Response<ResponseBody>
                    ) {
                        if (response.isSuccessful){
                            isFileReadyObserver.postValue(true)
                            val result = response.body()?.byteStream()
                            result?.let {
                                writeToFile(it)
                            }?:kotlin.run {
                                isFileReadyObserver.postValue(false)
                            }
                        }else{
                            isFileReadyObserver.postValue(false)
                        }
                    }

                    override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                        isFileReadyObserver.postValue(false)
                    }

                })

        }
    }

    fun getPdfFile(): File = pdfFileName

    private fun writeToFile(inputStream: InputStream){
        try {
            val fileReader = ByteArray(4096)
            var fileSizeDownloaded = 0
            val fos: OutputStream = FileOutputStream(pdfFileName)
            do {
                val read = inputStream.read(fileReader)
                if (read != -1) {
                    fos.write(fileReader, 0, read)
                    fileSizeDownloaded += read
                }
            } while (read != -1)
            fos.flush()
            fos.close()
            isFileReadyObserver.postValue(true)
        }catch (e: IOException){
            isFileReadyObserver.postValue(false)
        }

    }
}