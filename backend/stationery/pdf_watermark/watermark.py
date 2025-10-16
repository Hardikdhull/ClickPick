from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO

text_size = 20
opacity = 0.3

def makeWatermark(watermark, text_size, opacity):
    text = str(watermark)
    pdf_buffer = BytesIO()
    pdf = canvas.Canvas(pdf_buffer, pagesize=letter)
    pdf.translate(text_size / 2, text_size / 2)  # Adjust for text size to align with bottom-left corner
    pdf.setFillColor(colors.grey, alpha=opacity)
    pdf.setFont("Helvetica", text_size)

    width, height = letter
    pdf.drawCentredString(35 + text_size / 2, 20, text)
    pdf.save()
    pdf_buffer.seek(0)
    return pdf_buffer.getvalue()

def put_watermark(input_pdf, watermark):
    watermark_instance = PdfReader(BytesIO(watermark))
    watermark_page = watermark_instance.pages[0]

    pdf_reader = PdfReader(BytesIO(input_pdf))
    pdf_writer = PdfWriter()

    # Add watermark to the first page
    page = pdf_reader.pages[0]
    page.merge_page(watermark_page)
    pdf_writer.add_page(page)

    # Add all other pages as is
    for page_number in range(1, len(pdf_reader.pages)):
        page = pdf_reader.pages[page_number]
        pdf_writer.add_page(page)

    output_pdf_buffer = BytesIO()
    pdf_writer.write(output_pdf_buffer)
    output_pdf_buffer.seek(0)
    return output_pdf_buffer.getvalue()


def watermark(input_pdf_path, watermark_text):
    watermark_pdf = makeWatermark(watermark_text, text_size, opacity)
    with open(input_pdf_path, 'rb') as input_pdf_file:
        input_pdf = input_pdf_file.read()
    watermarked_pdf = put_watermark(input_pdf, watermark_pdf)
    return watermarked_pdf

'''
# Example Usage
input_pdf_path = "file2.pdf"
watermarked_pdf = watermark(input_pdf_path, "Confidential")
with open("watermarked_pdf.pdf", 'wb') as output_pdf_file:
    output_pdf_file.write(watermarked_pdf)
print("Watermarked PDF saved successfully!")
'''