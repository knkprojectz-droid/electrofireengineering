import pymupdf
import os

pdf_path = 'images/turnkey engineering projects images.pdf'
output_dir = 'images/Turnkey engineering'
prefix = 'Img_'

os.makedirs(output_dir, exist_ok=True)
doc = pymupdf.open(pdf_path)
for page_num in range(len(doc)):
    page = doc.load_page(page_num)
    pix = page.get_pixmap()
    out_path = os.path.join(output_dir, f"{prefix}{page_num+1}.jpeg")
    pix.save(out_path)
    print(f"Saved {out_path}")
