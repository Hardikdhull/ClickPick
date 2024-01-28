from spire.doc import *
from spire.doc.common import *

from pathlib import Path

def word_to_images(path):
    
    # Create a Document object
    document = Document()

    # Load a Word file
    document.LoadFromFile(path)
    
    # Get the document length for further uses
    doc_length = document.GetPageCount()

    # Loop through the pages in the document
    for i in range(document.GetPageCount()):

        # Convert a specific page to bitmap image
        imageStream = document.SaveImageToStreams(i, ImageType.Bitmap)
        
        # Get absolute path of image to be stored
        image_path = str(Path(__file__).resolve().parent / 'temp_images' / f'{i}.png')

        # Save the bitmap to a PNG file
        with open(image_path, 'wb') as imageFile:
            imageFile.write(imageStream.ToArray())
    
    document.Close()
    
    return doc_length