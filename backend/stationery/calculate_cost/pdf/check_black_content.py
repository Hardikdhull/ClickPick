import fitz  # PyMuPDF
from pathlib import Path

def is_blackish(rgb_tuple, threshold=50):
    return sum(rgb_tuple) <= threshold * 3

def parse_page_ranges(page_ranges):
    pages_to_check = []

    ranges = page_ranges.split(',')
    for item in ranges:
        if '-' in item:
            start, end = map(int, item.split('-'))
            pages_to_check.extend(range(start, end + 1))
        else:
            pages_to_check.append(int(item))
    
    return pages_to_check

def check_black_content(pdf_path, page_ranges, threshold=0.1):
    doc = fitz.open(pdf_path)

    pages_to_check = parse_page_ranges(page_ranges)

    black_pages = []
    non_black_pages = []

    for page_num in pages_to_check:
        adjusted_page_num = page_num - 1  # Adjust for zero-based indexing

        if adjusted_page_num < 0 or adjusted_page_num >= len(doc):
            print(f"Warning: Page {page_num} is out of range.")
            continue

        page = doc.load_page(adjusted_page_num)
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
            black_pages.append(page_num)
        else:
            non_black_pages.append(page_num)

    doc.close()

    return black_pages, non_black_pages

'''
# Example usage:
pdf_path = Path(__file__).resolve().parent / 'file3.pdf'
page_ranges = "1-41"

black_pages, non_black_pages = check_black_content(pdf_path, page_ranges, threshold=0.1)

print("Black Pages:", black_pages)
print("Non-Black Pages:", non_black_pages)
'''