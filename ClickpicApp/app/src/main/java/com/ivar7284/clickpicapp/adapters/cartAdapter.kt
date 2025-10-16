package com.ivar7284.clickpicapp.adapters

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.ivar7284.clickpicapp.R
import com.ivar7284.clickpicapp.cartDatabase.CartDB
import com.ivar7284.clickpicapp.dataclasses.cartModel

class cartAdapter(private val cartItems: MutableList<cartModel>,
                  private val dbHelper: CartDB,
                  private val onRemoveItemClickListener: OnRemoveItemClickListener
)
    :RecyclerView.Adapter<cartAdapter.myViewHolder>()
{

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): myViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.cart_item_list_views, parent, false)
        return cartAdapter.myViewHolder(view)
    }

    override fun getItemCount(): Int {
        return cartItems.size
    }

    override fun onBindViewHolder(holder: myViewHolder, position: Int) {
        val currentItem = cartItems[position]
        if (currentItem.productName.isNotEmpty()) {
            Glide.with(holder.itemView.context)
                .load(currentItem.productImage)
                .thumbnail(0.1f)
                .into(holder.image)
        }
        holder.Pname.text = currentItem.productName
        holder.Pprice.text = currentItem.productPrice
        holder.Premove.setOnClickListener {
            // Trigger item removal through the listener
            onRemoveItemClickListener.onRemoveItemClick(position)
        }
    }

    fun updateData(newList: List<cartModel>) {
        Log.d("cartAdapter", "Updating data with new list: $newList")
        Log.d("cartAdapter",dbHelper.getAllCartItems().toString())
        cartItems.addAll(newList)
        notifyDataSetChanged()
    }

    class myViewHolder(itemView: View)
        :RecyclerView.ViewHolder(itemView) {
        val image = itemView.findViewById<ImageView>(R.id.cart_item_iv)
        val Pname = itemView.findViewById<TextView>(R.id.cart_productName_tv)
        val Pprice = itemView.findViewById<TextView>(R.id.cart_price_tv)
        val Premove = itemView.findViewById<ImageButton>(R.id.remove)
    }
    interface OnRemoveItemClickListener {
        fun onRemoveItemClick(position: Int)
    }
}

