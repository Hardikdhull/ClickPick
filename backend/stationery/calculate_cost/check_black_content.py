# Utility File to check the number of black pages in a pdf to calculate its cost


import fitz  # PyMuPDF

from pathlib import Path

def is_blackish(rgb_tuple, threshold=50):
    # Define a threshold for darkness based on a sum of RGB values
    return sum(rgb_tuple) <= threshold * 3  # Multiplying by 3 to cover all three RGB channels

def check_black_content(pdf_path, threshold=0.1):
    doc = fitz.open(pdf_path)

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        pix = page.get_pixmap()

        blackish_pixels = 0
        total_pixels = pix.width * pix.height

        for x in range(pix.width):
            for y in range(pix.height):
                r, g, b = pix.pixel(x, y)
                if is_blackish((r, g, b)):
                    blackish_pixels += 1

        blackish_percentage = blackish_pixels / total_pixels
        if blackish_percentage > threshold:
            print(f"Page {page_num + 1}: Blackish content occupies more than {threshold * 100}%")

    doc.close()

# Replace 'your_pdf_file.pdf' with your PDF file path
check_black_content(Path(__file__).resolve().parent / 'file2.pdf', threshold=0.1)
