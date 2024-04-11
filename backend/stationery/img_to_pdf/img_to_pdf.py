from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from PIL import Image
import os

class ImageToPdfConverter:
    def __init__(self, directory, pics_per_page=2, output_filename="output.pdf"):
        self.directory = directory
        self.pics_per_page = pics_per_page
        self.output_filename = output_filename
        self.image_list = self.get_image_list()

        self.margin = 20
        self.gap = 10
        self.cols = 2

    def get_image_list(self):
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']  # Add more extensions if needed
        image_list = []

        for filename in os.listdir(self.directory):
            if any(filename.lower().endswith(ext) for ext in image_extensions):
                image_list.append(os.path.join(self.directory, filename))

        return image_list

    def calculate_image_size(self, img_width, img_height, max_width, max_height):
        ratio_width = max_width / img_width
        ratio_height = max_height / img_height
        ratio = min(ratio_width, ratio_height)
        new_width = int(img_width * ratio)
        new_height = int(img_height * ratio)
        return new_width, new_height

    '''def create_pdf(self):
        c = canvas.Canvas(self.output_filename, pagesize=letter)
        width, height = letter

        # Calculate dimensions for arranging images
        if self.pics_per_page < 4:
            cols = 1
            rows = self.pics_per_page
        else:
            cols = self.cols
            rows = (self.pics_per_page + cols - 1) // cols

        row_height = (height - 2 * self.margin) / rows
        col_width = (width - 2 * self.margin) / cols

        max_img_height = row_height - self.gap
        max_img_width = col_width - self.gap

        count = 0

        for i, img_path in enumerate(self.image_list):
            img = Image.open(img_path)
            img.thumbnail((col_width, row_height))

            img = Image.open(img_path)
            img.thumbnail((max_img_width, max_img_height))

            # Calculate position for the image
            row = count // cols
            col = count % cols
            x_offset = self.margin + (col * col_width) + (self.gap / 2)
            y_offset = height - self.margin - ((row + 1) * row_height) + (self.gap / 2)

            c.drawImage(img_path, x_offset, y_offset, img.width, img.height)
            count += 1

            if count % self.pics_per_page == 0:
                count = 0
                c.showPage()

        c.save()
        print("PDF created successfully!")'''
    def create_pdf(self):
        with open(self.output_filename, 'wb') as pdf_file:
            c = canvas.Canvas(pdf_file, pagesize=letter)
            width, height = letter

            # Calculate dimensions for arranging images
            if self.pics_per_page < 4:
                cols = 1
                rows = self.pics_per_page
            else:
                cols = self.cols
                rows = (self.pics_per_page + cols - 1) // cols

            row_height = (height - 2 * self.margin) / rows
            col_width = (width - 2 * self.margin) / cols

            max_img_height = row_height - self.gap
            max_img_width = col_width - self.gap

            count = 0

            for i, img_path in enumerate(self.image_list):
                img = Image.open(img_path)
                img.thumbnail((col_width, row_height))

                img = Image.open(img_path)
                img.thumbnail((max_img_width, max_img_height))

                # Calculate position for the image
                row = count // cols
                col = count % cols
                x_offset = self.margin + (col * col_width) + (self.gap / 2)
                y_offset = height - self.margin - ((row + 1) * row_height) + (self.gap / 2)

                c.drawImage(img_path, x_offset, y_offset, img.width, img.height)
                count += 1

                if count % self.pics_per_page == 0:
                    count = 0
                    c.showPage()

            c.save()
            # print("PDF created successfully!")

        # Read and return the created PDF file
        with open(self.output_filename, 'rb') as pdf_file:
            pdf_content = pdf_file.read()

        # Delete the PDF file created by canvas
        os.remove(self.output_filename)

        return pdf_content


'''
# Example Usage
if __name__ == '__main__':
    directory = os.getcwd() + "\\src"
    pic_per_page = 4

    converter = ImageToPdfConverter(directory, pic_per_page, "print.pdf")
    converter.create_pdf()
'''
