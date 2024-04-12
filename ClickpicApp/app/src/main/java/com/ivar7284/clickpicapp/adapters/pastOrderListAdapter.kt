package com.ivar7284.clickpicapp.adapters

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.ivar7284.clickpicapp.R
import com.ivar7284.clickpicapp.dataclasses.activeOrderList
import com.ivar7284.clickpicapp.dataclasses.pastOrderList

class pastOrderListAdapter(private val pastOrders: MutableList<pastOrderList>)
    : RecyclerView.Adapter<pastOrderListAdapter.myViewHolder>(){

    private val BASE_URL = "http://panel.mait.ac.in:8005"

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): myViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.active_order_list, parent, false)
        return pastOrderListAdapter.myViewHolder(view)
    }

    override fun getItemCount(): Int {
        return pastOrders.size
    }

    fun updateData(newList: List<pastOrderList>) {
        pastOrders.clear()
        pastOrders.addAll(newList)
        notifyDataSetChanged()
    }

    override fun onBindViewHolder(holder: myViewHolder, position: Int) {
        holder.Pquantity.text = "Quantity: " + pastOrders.get(position).quantity.toString()
        holder.Pprice.text = "Rs. " + pastOrders.get(position).cost
        holder.PorderId.text = "Order ID. " + pastOrders.get(position).order_id.toString()
        holder.Pname.text = pastOrders.get(position).item_name.toString()
        Log.d("fetching error", pastOrders.get(position).quantity.toString())
        Log.d("fetching error", pastOrders.get(position).cost.toString())
        Log.d("fetching error", pastOrders.get(position).order_id.toString())
        Log.d("fetching error", pastOrders.get(position).item_name.toString())
        val currentItem = pastOrders[position]
        Log.d("fetching error", "Product Image URLs:")
        Log.d("fetching error", "product_image_1: ${BASE_URL + currentItem.item_display_image}")

        if (currentItem.item_display_image.isNotEmpty()) {
            Glide.with(holder.itemView.context)
                .load(BASE_URL + currentItem.item_display_image)
                .thumbnail(0.1f)
                .into(holder.PproductImage)
        }
    }

    class myViewHolder(itemView: View)
        : RecyclerView.ViewHolder(itemView){
        val Pprice = itemView.findViewById<TextView>(R.id.active_price_tv)
        val Pquantity = itemView.findViewById<TextView>(R.id.active_quantity_tv)
        val PorderId = itemView.findViewById<TextView>(R.id.active_orderId_tv)
        val PproductImage = itemView.findViewById<ImageView>(R.id.active_item_iv)
        val Pname = itemView.findViewById<TextView>(R.id.active_productName_tv)
    }
}