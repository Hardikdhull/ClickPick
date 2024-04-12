package com.ivar7284.clickpicapp.dataclasses

data class pastOrderList(
    var id : Int,
    var order_id : String,
    var quantity : Int,
    var cost : String,
    var custom_message : String,
    var order_time : String,
    var user : Int,
    var item : Int,
    var item_name: String,
    var item_display_image: String
)
