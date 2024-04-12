package com.ivar7284.clickpicapp.dataclasses

data class activeOrderList(
    var order_id : Int,
    var quantity : Int,
    var cost : String,
    var custom_message : String,
    var order_time : String,
    var user : Int,
    var item : Int,
    var item_name: String,
    var item_display_image: String
)
