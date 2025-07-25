
import os
from PIL import Image
import piexif

input_folder = "images"
output_folder = "images_optimisees"
os.makedirs(output_folder, exist_ok=True)

max_width = 1280
max_height = 720
quality = 80

def optimize_image_keep_metadata(input_path, output_path):
    try:
        exif_dict = piexif.load(input_path)

        with Image.open(input_path) as img:
            img = img.convert("RGB")
            img.thumbnail((max_width, max_height), Image.LANCZOS)

            exif_bytes = piexif.dump(exif_dict)

            img.save(output_path, "jpeg", quality=quality, optimize=True, exif=exif_bytes)

        print(f"✔ Optimisé : {input_path} → {output_path}")
    except Exception as e:
        print(f"❌ Erreur avec {input_path} : {e}")

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg")):
        input_path = os.path.join(input_folder, filename)
        output_name = os.path.splitext(filename)[0] + ".jpg"
        output_path = os.path.join(output_folder, output_name)
        optimize_image_keep_metadata(input_path, output_path)

print(f"\n✅ Terminé. Images optimisées dans : {output_folder}")
