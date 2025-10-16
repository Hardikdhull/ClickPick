package com.ivar7284.clickpicapp.adapters

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.ivar7284.clickpicapp.R
import com.ivar7284.clickpicapp.cartDatabase.CartDB
import com.ivar7284.clickpicapp.dataclasses.cartModel
import com.ivar7284.clickpicapp.dataclasses.itemList

class itemsAvailableAdapter(private val itemList: MutableList<itemList>,
                            private val cartList: MutableList<cartModel>,
                            private val dbHelper: CartDB
)
    :RecyclerView.Adapter<itemsAvailableAdapter.myViewHolder>() {

    private val BASE_URL = "http://panel.mait.ac.in:8005"

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): myViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_list_views, parent, false)
        return myViewHolder(view)
    }

    override fun getItemCount(): Int {
        return itemList.size
    }

    fun updateData(newList: List<itemList>) {
        itemList.clear()
        itemList.addAll(newList)
        notifyDataSetChanged()
    }

    override fun onBindViewHolder(holder: myViewHolder, position: Int) {
        val currentItem = itemList[position]
        if (currentItem.display_image.isNotEmpty()) {
            Glide.with(holder.itemView.context)
                .load(BASE_URL + currentItem.display_image)
                .thumbnail(0.1f)
                .into(holder.image)
        }
        holder.Pname.text = itemList.get(position).item
        holder.Pprice.text = itemList.get(position).price
        holder.plus.setOnClickListener {
            val isItemInCart = cartList.any { it.productName == currentItem.item }

            if (!isItemInCart) {
                // Change the ImageView drawable to the tick drawable
                holder.plus.setImageResource(R.drawable.tick_icon)
                // Add item data to cartModel
                val cartItem = cartModel(
                    productImage = BASE_URL + currentItem.display_image,
                    productName = currentItem.item,
                    productPrice = currentItem.price,
                    productQuantity = "1",
                    orderID = position
                )
                dbHelper.addCartItem(cartItem)

                Log.d("cartAdapter", dbHelper.getAllCartItems().toString())

                Toast.makeText(
                    holder.itemView.context,
                    "${currentItem.item} added to cart",
                    Toast.LENGTH_SHORT
                ).show()
            } else {
                // Increment the quantity of the existing item in the cart
                val existingItem = cartList.find { it.productName == currentItem.item }
                existingItem?.let {
                    it.productQuantity = (it.productQuantity.toInt() + 1).toString()
                    dbHelper.addCartItem(it) // Update the quantity in the database
                    notifyDataSetChanged() // Update the UI
                }

                Toast.makeText(
                    holder.itemView.context,
                    "${currentItem.item} quantity increased",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

    }

    class myViewHolder(itemView: View)
        :RecyclerView.ViewHolder(itemView){
        val image = itemView.findViewById<ImageView>(R.id.item_iv)
        val Pname = itemView.findViewById<TextView>(R.id.productName_tv)
        val Pprice = itemView.findViewById<TextView>(R.id.price_tv)
        val plus: ImageView = itemView.findViewById(R.id.plus_iv)
    }

}


