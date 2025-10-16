package com.ivar7284.clickpicapp.dataclasses

import java.io.File

data class costCalculationFinal(
    var file: File,
    var pages: String,
    var coloured_pages: String,
    var custom_message: String,
    var print_on_one_side: Boolean
)
