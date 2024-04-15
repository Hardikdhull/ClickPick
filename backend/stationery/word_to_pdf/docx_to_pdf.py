import requests

def convert_docx_to_pdf(file_path):
    
    url = "http://panel.mait.ac.in:8009/api/convert/"

    try:
        with open(file_path, 'rb') as file:
            files = {'docx_file': file}
            response = requests.post(url, files=files)
            if response.status_code == 200:
                # Save the returned PDF file
                # with open("converted.pdf", 'wb') as pdf_file:
                #     pdf_file.write(response.content)
                return response.content
            else:
                print("Error occurred:", response.text)
    except Exception as e:
        print("Exception occurred:", str(e))