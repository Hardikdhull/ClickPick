package com.ivar7284.clickpicapp

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ivar7284.clickpicapp.adapters.cartAdapter
import com.ivar7284.clickpicapp.cartDatabase.CartDB
import com.ivar7284.clickpicapp.dataclasses.cartModel

class CartActivity : AppCompatActivity(), cartAdapter.OnRemoveItemClickListener {

    private lateinit var home: View
    private lateinit var search: View
    private lateinit var cart: View
    private lateinit var print: View
    private lateinit var profile: View
    private lateinit var cartItems: RecyclerView
    private lateinit var checkoutBtn: Button

    private lateinit var cartItemsAdapter: cartAdapter
    private val cartList = mutableListOf<cartModel>()

    private lateinit var dbHelper: CartDB

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cart)
        overridePendingTransition(0, 0)

        Log.d("cartAdapter", "onCreate() called")

        //db initialize
        dbHelper = CartDB(this)

        //recyclerview
        cartItems = findViewById(R.id.cartItems)
        cartItems.layoutManager = LinearLayoutManager(applicationContext)
        cartItems.setHasFixedSize(true)

        cartItemsAdapter = cartAdapter(cartList, dbHelper, this)
        cartItems.adapter = cartItemsAdapter

        loadCartItemsFromDB()
        Log.d("dbconnection", cartList.toString())

        //checkoutBtn
        checkoutBtn = findViewById(R.id.checkoutBtn)
        checkoutBtn.setOnClickListener {
            startActivity(Intent(applicationContext, PaymentGatewayActivity::class.java))
        }

        //bottom navigation
        home = findViewById(R.id.Chome)
        search = findViewById(R.id.Csearch)
        cart = findViewById(R.id.Ccart)
        print = findViewById(R.id.Cprint)
        profile = findViewById(R.id.Cprofile)

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
    private fun loadCartItemsFromDB() {
        cartList.clear()
        val cartItemsFromDB = dbHelper.getAllCartItems()
        Log.d("dbconnection", cartItemsFromDB.toString())
        cartList.addAll(cartItemsFromDB)
        cartItemsAdapter.updateData(cartList)
    }
    override fun onRemoveItemClick(position: Int) {
        // Remove item from the list and notify adapter
        dbHelper.deleteCartItem(cartList[position])
        cartList.removeAt(position)
        cartItemsAdapter.notifyItemRemoved(position)

    }
    //
}