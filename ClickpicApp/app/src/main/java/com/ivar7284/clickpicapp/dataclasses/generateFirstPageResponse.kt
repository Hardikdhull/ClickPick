package com.ivar7284.clickpicapp.dataclasses

import java.io.File

data class generateFirstPageResponse(
    var pdfContent: ByteArray,
    var fileName: String
)
