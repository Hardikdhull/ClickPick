package com.ivar7284.clickpicapp.cartDatabase

import android.annotation.SuppressLint
import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.ivar7284.clickpicapp.dataclasses.cartModel

class CartDB(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {

    companion object {
        private const val DATABASE_VERSION = 1
        private const val DATABASE_NAME = "CartDatabase"
        private const val TABLE_NAME = "cartItems"
        private const val KEY_ID = "id"
        private const val KEY_PRODUCT_IMAGE = "productImage"
        private const val KEY_PRODUCT_NAME = "productName"
        private const val KEY_PRODUCT_PRICE = "productPrice"
        private const val KEY_PRODUCT_QUANTITY = "productQuantity"
        private const val KEY_ORDER_ID = "orderID"
    }

    override fun onCreate(db: SQLiteDatabase?) {
        val createTableQuery = "CREATE TABLE $TABLE_NAME " +
                "($KEY_ID INTEGER PRIMARY KEY," +
                "$KEY_PRODUCT_IMAGE TEXT," +
                "$KEY_PRODUCT_NAME TEXT," +
                "$KEY_PRODUCT_PRICE TEXT," +
                "$KEY_PRODUCT_QUANTITY TEXT," +
                "$KEY_ORDER_ID INTEGER)"
        db?.execSQL(createTableQuery)
    }

    override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
        db?.execSQL("DROP TABLE IF EXISTS $TABLE_NAME")
        onCreate(db)
    }

    fun addCartItem(cartItem: cartModel) {
        val db = this.writableDatabase
        val values = ContentValues().apply {
            put(KEY_PRODUCT_IMAGE, cartItem.productImage)
            put(KEY_PRODUCT_NAME, cartItem.productName)
            put(KEY_PRODUCT_PRICE, cartItem.productPrice)
            put(KEY_PRODUCT_QUANTITY, cartItem.productQuantity)
            put(KEY_ORDER_ID, cartItem.orderID)
        }
        db.insert(TABLE_NAME, null, values)
        db.close()
    }

    @SuppressLint("Range")
    fun getAllCartItems(): MutableList<cartModel> {
        val cartItemsList = mutableListOf<cartModel>()
        val selectQuery = "SELECT * FROM $TABLE_NAME"
        val db = this.readableDatabase
        val cursor = db.rawQuery(selectQuery, null)
        if (cursor.moveToFirst()) {
            do {
                val cartItem = cartModel(
                    productImage = cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_IMAGE)),
                    productName = cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_NAME)),
                    productPrice = cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_PRICE)),
                    productQuantity = cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_QUANTITY)),
                    orderID = cursor.getInt(cursor.getColumnIndex(KEY_ORDER_ID))
                )
                cartItemsList.add(cartItem)
            } while (cursor.moveToNext())
        }
        cursor.close()
        db.close()
        return cartItemsList
    }

    fun deleteCartItem(cartItem: cartModel) {
        val db = this.writableDatabase
        db.delete(TABLE_NAME, "$KEY_ORDER_ID=?", arrayOf(cartItem.orderID.toString()))
        db.close()
    }

    fun deleteCartItemById(id: Int) {
        val db = this.writableDatabase
        db.delete(TABLE_NAME, "$KEY_ID = ?", arrayOf(id.toString()))
        db.close()
    }

    fun deleteAllCartItems() {
        val db = this.writableDatabase
        db.delete(TABLE_NAME, null, null)
        db.close()
    }
}
