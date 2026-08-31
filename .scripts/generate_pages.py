import os

template_path = 'service_template.html'
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

services = [
    {
        'id': 'fire-hydrant',
        'title': 'Fire Hydrant Systems',
        'hero_image': 'images/Fire hydrant/Img_1.jpeg',
        'content': '''<p>Our Fire Hydrant Systems are designed to provide a reliable and immediate water supply during fire emergencies, ensuring rapid firefighting response for industrial, commercial, residential, and infrastructure projects.</p>
<p>We deliver complete hydrant solutions, including design, engineering, supply, installation, testing, commissioning, and maintenance in compliance with national and international fire safety standards.</p>
<ul>
    <li>Internal & External Hydrant Networks</li>
    <li>Landing Valves & Hose Reel Systems</li>
    <li>Underground & Overhead Piping</li>
    <li>Yard Hydrant Systems</li>
    <li>Hydrant Accessories & Valves</li>
    <li>Testing & Commissioning</li>
</ul>''',
        'images': [f"images/Fire hydrant/Img_{i}.jpeg" for i in range(1, 17)]
    },
    {
        'id': 'fire-alarm',
        'title': 'Fire Alarm Systems',
        'hero_image': 'images/Fire alarm/ImgA_1.jpeg',
        'content': '''<p>Our Fire Alarm Systems provide early fire detection and instant notification, enabling quick evacuation and minimizing risk to life and property.</p>
<p>We offer intelligent and conventional fire alarm solutions designed to meet the specific safety requirements of industrial facilities, commercial buildings, institutions, and residential developments.</p>
<ul>
    <li>Addressable Fire Alarm Systems</li>
    <li>Conventional Fire Alarm Systems</li>
    <li>Smoke, Heat & Multi-Sensor Detectors</li>
    <li>Manual Call Points & Sounders</li>
    <li>Voice Evacuation Systems</li>
    <li>System Integration, Testing & Maintenance</li>
</ul>''',
        'images': [f"images/Fire alarm/ImgA_{i}.jpeg" for i in range(1, 6)] + [f"images/Fire alarm/ImgB_{i}.jpeg" for i in range(1, 9)]
    },
    {
        'id': 'fire-suppression',
        'title': 'Fire Suppression Systems',
        'hero_image': 'images/Fire suppression/Img_1.jpeg',
        'content': '''<p>We provide advanced Fire Suppression Systems for protecting critical assets where conventional water-based systems may not be suitable.</p>
<p>Our customized solutions safeguard data centers, electrical rooms, commercial kitchens, laboratories, manufacturing facilities, server rooms, and other high-value environments.</p>
<ul>
    <li>Clean Agent Systems</li>
    <li>CO₂ Fire Suppression Systems</li>
    <li>Inert Gas Systems</li>
    <li>Kitchen Hood Suppression Systems</li>
    <li>Foam Suppression Systems</li>
    <li>Special Hazard Fire Protection Solutions</li>
</ul>''',
        'images': [f"images/Fire suppression/Img_{i}.jpeg" for i in range(1, 5)]
    },
    {
        'id': 'fire-extinguishers',
        'title': 'Fire Extinguishers',
        'hero_image': 'images/service-extinguisher.png',
        'content': '''<p>Supply, installation, and refilling of all types of portable and trolley-mounted fire extinguishers (ABC, CO2, Foam, Water) for immediate response to incipient fires.</p>''',
        'images': ['images/service-extinguisher.png']
    },
    {
        'id': 'amc',
        'title': 'Annual Maintenance Contract (AMC)',
        'hero_image': 'images/AMC/Img1.jpeg',
        'content': '''<p>Our Annual Maintenance Contract (AMC) services ensure that fire protection systems remain fully operational, compliant, and ready to perform during emergencies.</p>
<p>Through scheduled inspections, preventive maintenance, testing, and prompt corrective actions, we help clients maintain maximum system reliability while meeting regulatory requirements.</p>
<ul>
    <li>Preventive Maintenance</li>
    <li>Periodic Inspection & Testing</li>
    <li>System Performance Evaluation</li>
    <li>Breakdown Support</li>
    <li>Replacement of Faulty Components</li>
    <li>Compliance Documentation & Service Reports</li>
</ul>''',
        'images': ["images/AMC/Img1.jpeg", "images/AMC/Img2.jpeg", "images/AMC/Img3.jpeg", "images/AMC/Img7.jpeg"]
    },
    {
        'id': 'fire-pump-room',
        'title': 'Fire Pump Room',
        'hero_image': 'images/Fire pump room/Img2.jpeg',
        'content': '''<p>A reliable Fire Pump Room is the heart of every fire protection system. We design and install high-performance pump systems that ensure uninterrupted water pressure during emergency situations.</p>
<p>Every pump room is engineered to deliver dependable performance while meeting applicable fire safety codes and project requirements.</p>
<ul>
    <li>Electric Fire Pumps</li>
    <li>Diesel Engine Fire Pumps</li>
    <li>Jockey Pumps</li>
    <li>Pump Controllers & Control Panels</li>
    <li>Pump Room Piping & Accessories</li>
    <li>Testing, Commissioning & Annual Maintenance</li>
</ul>''',
        'images': ["images/Fire pump room/Img1.jpeg", "images/Fire pump room/Img2.jpeg", "images/Fire pump room/Img3.jpeg", "images/Fire pump room/Img4.jpeg", "images/Fire pump room/Img5.jpeg"]
    },
    {
        'id': 'manpower',
        'title': 'Labours or Manpower',
        'hero_image': 'images/Labours or manpower/Img2.jpeg',
        'content': '''<p>We provide skilled labors and manpower for all your fire protection installation and maintenance needs.</p>''',
        'images': ["images/Labours or manpower/Img1.jpeg", "images/Labours or manpower/Img2.jpeg", "images/Labours or manpower/Img3.jpeg", "images/Labours or manpower/Img4.jpeg", "images/Labours or manpower/Img5.jpeg", "images/Labours or manpower/Img6.jpeg", "images/Labours or manpower/Img7.jpeg", "images/Labours or manpower/Img8.jpeg"]
    },
    {
        'id': 'pipeline',
        'title': 'Pipeline Works',
        'hero_image': 'images/Pipeline works/Img2.jpeg',
        'content': '''<p>Comprehensive pipeline works for water-based fire suppression systems, ensuring durable and leak-free installations.</p>''',
        'images': ["images/Pipeline works/Img1.jpeg", "images/Pipeline works/Img2.jpeg", "images/Pipeline works/Img3.jpeg", "images/Pipeline works/Img4.jpeg", "images/Pipeline works/Img5.jpeg", "images/Pipeline works/Img6.jpeg", "images/Pipeline works/Img7.jpeg", "images/Pipeline works/Img8.jpeg", "images/Pipeline works/Img9.jpeg", "images/Pipeline works/Img10.jpeg"]
    },
    {
        'id': 'sprinklers',
        'title': 'Sprinklers System',
        'hero_image': 'images/Sprinklers system/ImgS_1.jpeg',
        'content': '''<p>Our Fire Sprinkler Systems provide automatic fire suppression by detecting heat and controlling fires at their earliest stage, significantly reducing damage and ensuring business continuity.</p>
<p>We design and install customized sprinkler systems for warehouses, manufacturing plants, commercial buildings, hotels, hospitals, educational institutions, and residential projects.</p>
<ul>
    <li>Wet Pipe Systems</li>
    <li>Dry Pipe Systems</li>
    <li>Pre-Action Systems</li>
    <li>Deluge Systems</li>
    <li>ESFR & Special Hazard Sprinklers</li>
    <li>Inspection, Testing & Maintenance</li>
</ul>''',

        'images': [f"images/Sprinklers system/ImgS_{i}.jpeg" for i in range(1, 10)]
    }
]

import re

for svc in services:
    # Only include gallery images that actually exist on disk
    gallery_images = [img for img in svc['images'] if img != svc['hero_image'] and os.path.exists(img)]
    
    # We will put up to 6 images in the right-side collage to keep it balanced
    collage_images = gallery_images[:6]
            
    # Build right side collage
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
