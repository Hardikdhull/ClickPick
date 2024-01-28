from spire.pdf.common import *
from spire.pdf import *
import os

from math import ceil

from pathlib import Path

def images_to_pdfs(doc_length):
    
    # Can make a pdf only from 10 images at once, so calculating total required pdfs
    no_of_pdfs = ceil(doc_length/10)
    
    for i in range(no_of_pdfs):
    
        # Create a PdfDocument object
        doc = PdfDocument()

        # Set the page margins to 0
        doc.PageSettings.SetMargins(0.0)

        # Get the folder where the images are stored
        folder_path = str(Path(__file__).resolve().parent / 'temp_images/' )

        for j in range(10):
        
            if (i*10 + j) == doc_length:
                break
            
            # Load a particular image
            image = PdfImage.FromFile(f'{folder_path}/{i*10 + j}.png')

            # Get the image width and height
            width = image.PhysicalDimension.Width
            height = image.PhysicalDimension.Height

            # Add a page that has the same size as the image
            page = doc.Pages.Add(SizeF(width, height))

            # Draw image at (0, 0) of the page
            page.Canvas.DrawImage(image, 0.0, 0.0, width, height)
            
            # Delete the image as soon as it has been read and used
            print(f'{folder_path}/{i*10 + j}.png')
            os.remove(f'{folder_path}/{i*10 + j}.png')

        # Save to file
        doc.SaveToFile( str(Path(__file__).resolve().parent / 'temp_pdfs' / f'{i}.pdf' ) )
        doc.Dispose();
        
    
 

