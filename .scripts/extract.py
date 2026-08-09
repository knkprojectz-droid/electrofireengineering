import pymupdf
import os

pdfs = [
    {
        'path': 'images/Fire alarm images .pdf',
        'output_dir': 'images/Fire alarm',
        'prefix': 'ImgA_'
    },
    {
        'path': 'images/Fire Alarm.pdf',
        'output_dir': 'images/Fire alarm',
        'prefix': 'ImgB_'
    },
    {
        'path': 'images/Fire Hydrant images .pdf',
        'output_dir': 'images/Fire hydrant',
        'prefix': 'Img_'
    },
    {
        'path': 'images/Fire Sprinkler System.pdf',
        'output_dir': 'images/Sprinklers system', # Reusing this folder or creating new
        'prefix': 'ImgS_'
    },
    {
        'path': 'images/fire suppression.pdf',
        'output_dir': 'images/Fire suppression',
        'prefix': 'Img_'
    }
]

for item in pdfs:
    pdf_path = item['path']
    output_dir = item['output_dir']
    prefix = item['prefix']
    
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Extracting from {pdf_path} into {output_dir}")
    try:
        doc = pymupdf.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            pix = page.get_pixmap()
            out_path = os.path.join(output_dir, f"{prefix}{page_num+1}.jpeg")
            pix.save(out_path)
            print(f"Saved {out_path}")
    except Exception as e:
        print(f"Failed to extract {pdf_path}: {e}")
