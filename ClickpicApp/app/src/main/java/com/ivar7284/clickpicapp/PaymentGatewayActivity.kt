package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import com.razorpay.Checkout
import com.razorpay.PaymentResultListener
import org.json.JSONObject

class PaymentGatewayActivity : AppCompatActivity(), PaymentResultListener {

    private lateinit var paymentStatus: TextView
    private lateinit var amount: EditText
    private lateinit var payNow: Button
    private lateinit var backBtn: ImageButton

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_gateway)

        Checkout.preload(applicationContext)

        paymentStatus = findViewById(R.id.paymentStatus)
        amount = findViewById(R.id.amount)
        payNow = findViewById(R.id.payNowBtn)
        backBtn = findViewById(R.id.backBtn)

        backBtn.setOnClickListener {
            finish()
        }


        payNow.setOnClickListener {
            savePayment(100)
        }

    }
    private fun savePayment(amount:Int){
        try {
            // Validate input amount
            if (amount <= 0) {
                Toast.makeText(this, "Invalid amount", Toast.LENGTH_SHORT).show()
                return
            }

            val checkout = Checkout()
            checkout.setKeyID("rzp_test_cIeIMt02HKSwSy")

            val options = JSONObject()
            options.put("key", "rzp_test_cIeIMt02HKSwSy")
            options.put("name", "RAZERPAY GATEWAY")
            options.put("description", "abc")
            options.put("theme.color", "#c1121f")
            options.put("currency", "INR")
            options.put("amount", amount * 100)
            options.put("image","http://panel.mait.ac.in:8005/media/stationery/display-images/istockphoto-158424399-612x612.jpg")

            val retry = JSONObject()
            retry.put("enabled", true)
            retry.put("max_count", 4)
            retry.put("retry", retry)

            val prefill = JSONObject()
            prefill.put("email", " ")
            prefill.put("contact", " ")

            options.put("prefill", prefill)

            checkout.open(this, options)
        } catch (e: Exception) {
            Toast.makeText(this, "Error in payment: ${e.message}", Toast.LENGTH_SHORT).show()
            e.printStackTrace()
        }
    }

    @SuppressLint("SetTextI18n")
    override fun onPaymentSuccess(p0: String?) {
        paymentStatus.text = "Payment Successful: $p0"
        paymentStatus.setTextColor(Color.GREEN)
    }

    override fun onPaymentError(p0: Int, p1: String?) {
        paymentStatus.text = "Payment Failure: $p1"
        paymentStatus.setTextColor(Color.RED)
    }
    //
}