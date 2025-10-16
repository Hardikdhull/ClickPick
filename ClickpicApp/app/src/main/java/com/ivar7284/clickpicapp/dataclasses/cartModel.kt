package com.ivar7284.clickpicapp.dataclasses
import android.os.Parcel
import android.os.Parcelable

data class cartModel(
    var productImage: String,
    var productName: String,
    var productPrice: String,
    var productQuantity: String,
    var orderID: Int
) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readString().toString(),
        parcel.readInt()
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(productImage)
        parcel.writeString(productName)
        parcel.writeString(productPrice)
        parcel.writeString(productQuantity)
        parcel.writeInt(orderID)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<cartModel> {
        override fun createFromParcel(parcel: Parcel): cartModel {
            return cartModel(parcel)
        }

        override fun newArray(size: Int): Array<cartModel?> {
            return arrayOfNulls(size)
        }
    }
}
