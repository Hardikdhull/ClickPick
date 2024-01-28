from docx import Document
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from pathlib import Path

def convert_word_to_images(input_path, output_prefix):
    doc = Document(input_path)

    for i, paragraph in enumerate(doc.paragraphs):
        # Assuming each paragraph is a line on the page
        lines = [paragraph.text]

        # Concatenate lines to form the content of the page
        page_content = '\n'.join(lines)

        # Create an image from the page content
        image = create_image_from_text(page_content)

        # Save the image with a page-specific filename
        output_path = f"{output_prefix}_page_{i + 1}.png"
        image.save(output_path)

def create_image_from_text(text):
    # Create an image from the text content
    image = Image.new('RGB', (800, 600), color='white')
    image_draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()  # You might want to use a specific font

    # Add the text to the image
    image_draw.text((10, 10), text, fill='black', font=font)

    return image

# Example usage
path = str(Path(__file__).resolve().parent / 'file2.docx')
convert_word_to_images(path, 'output')
