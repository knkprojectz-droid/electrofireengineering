import os
from PIL import Image, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

directories = [
    'images/Fire alarm',
    'images/Fire hydrant',
    'images/Sprinklers system',
    'images/Fire suppression',
    'images/AMC',
    'images/Fire pump room',
    'images/Labours or manpower',
    'images/Pipeline works'
]

for d in directories:
    if os.path.exists(d):
        for filename in os.listdir(d):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(d, filename)
                try:
                    img = Image.open(filepath)
                    
                    # Convert to RGB if needed
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                        
                    # Some images might have white background but slightly off-white pixels
                    # So we use a threshold approach or just ImageChops
                    trimmed_img = trim(img)
                    if trimmed_img.size != img.size:
                        trimmed_img.save(filepath)
                        print(f"Trimmed {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")
