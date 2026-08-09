template_path = 'service_template.html'
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

svc = {
    'id': 'turnkey',
    'title': 'Turnkey Engineering Projects',
    'hero_image': 'images/Turnkey engineering/Img_1.jpeg',
    'content': '''<p>We provide comprehensive turnkey engineering solutions, managing every stage of the project from concept to completion. Our experienced team handles planning, design, procurement, installation, testing, commissioning, and project handover with a strong focus on quality, safety, and timely execution. With a commitment to engineering excellence and customer satisfaction, we deliver reliable, cost-effective, and customized solutions for industrial, commercial, and infrastructure projects, ensuring every project is completed to the highest standards.</p>
<h3>Global Export & Import</h3>
<p>Electro Fire Engineering Pvt. Ltd. is expanding its global presence by offering reliable export and import solutions for engineering, construction, and fire protection materials. With a strong supplier network and commitment to international quality standards, we facilitate seamless global sourcing and distribution while ensuring quality, timely delivery, and competitive pricing.</p>''',
    'images': [f"images/Turnkey engineering/Img_{i}.jpeg" for i in range(1, 13)]
}

gallery_images = [img for img in svc['images'] if img != svc['hero_image']]
collage_images = gallery_images[:6]

gallery_html = ""
if len(collage_images) > 0:
    gallery_html = '<div class="collage-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">'
    for img in collage_images:
        gallery_html += f'<div style="border-radius: var(--radius-sm); overflow: hidden; box-shadow: var(--shadow-sm);"><img src="{img}" alt="{svc["title"]}" style="width: 100%; height: 100%; object-fit: contain;"></div>'
    gallery_html += '</div>'

page_html = template.replace('{service_title}', svc['title'])
page_html = page_html.replace('{hero_image}', svc['hero_image'])
page_html = page_html.replace('{service_content}', svc['content'])
page_html = page_html.replace('{image_gallery}', gallery_html)

output_filename = f"service-{svc['id']}.html"
with open(output_filename, 'w', encoding='utf-8') as out:
    out.write(page_html)

print(f"Generated {output_filename}")
