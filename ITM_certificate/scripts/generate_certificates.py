import ssl
import csv
import io
import os
import json
import urllib.request
from PIL import Image, ImageDraw, ImageFont

# ==================== CONFIGURATION ====================
NAME_COLUMN_HEADER = "Full Name"  # Column name in Google Sheet
TEMPLATE_PATH = "/Users/chadz/Documents/ITM/ITM_certificate/scripts/certificate.png"  # Path to your certificate template
OUTPUT_DIR = "/Users/chadz/Documents/ITM/ITM_certificate/certificates"  # Folder for saving certificates
FONT_SIZE = 90  # Adjust as needed
FONT_COLOR = (0, 0, 0)  # Black text (R, G, B)

# Certificate text placement coordinates
CENTER_X = 1450
CENTER_Y = 700

# Google Sheets configuration
SHEET_ID = "1sGELjhBn53l5II9QG1ard-4KRRTbPRZLSn6ARJDciWM"
csv_export_url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv"

# ==================== SSL FIX ====================
# Bypass SSL verification (needed for macOS)
ssl._create_default_https_context = ssl._create_unverified_context

# ==================== CREATE OUTPUT FOLDER ====================
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ==================== GET FONT ====================
def get_font_path():
    """Find an available bold font across different operating systems"""
    paths = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",  # macOS
        "C:\\Windows\\Fonts\\arialbd.ttf",  # Windows
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",  # Linux
    ]
    for path in paths:
        if os.path.exists(path):
            return path
    return None

# ==================== MAIN SCRIPT ====================
print("=" * 60)
print("🎓 CERTIFICATE GENERATOR - Google Sheets Edition")
print("=" * 60)
print(f"\nFetching data from Google Sheets...")
print(f"Sheet ID: {SHEET_ID}\n")

req = urllib.request.Request(csv_export_url, headers={"User-Agent": "Mozilla/5.0"})

try:
    # Fetch CSV from Google Sheets
    with urllib.request.urlopen(req) as response:
        csv_data = response.read().decode("utf-8")
        reader = csv.DictReader(io.StringIO(csv_data))

        # Check if template exists
        if not os.path.exists(TEMPLATE_PATH):
            print(f"❌ Error: Template file '{TEMPLATE_PATH}' not found!")
            exit(1)

        # Get font
        font_path = get_font_path()
        if font_path:
            font = ImageFont.truetype(font_path, FONT_SIZE)
            print(f"✓ Font loaded: {font_path}\n")
        else:
            print("⚠️  Warning: Could not find bold font, using default\n")
            font = ImageFont.load_default()

        certificate_count = 0

        # Process each row in the Google Sheet
        for row in reader:
            name = row.get(NAME_COLUMN_HEADER, "").strip()

            # Skip empty rows
            if not name:
                continue

            # Open template
            img = Image.open(TEMPLATE_PATH).convert("RGB")
            draw = ImageDraw.Draw(img)

            # Calculate text dimensions for centering
            bbox = font.getbbox(name)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]

            # Calculate position to center text
            x = CENTER_X - (text_width / 2)
            y = CENTER_Y - (text_height / 2)

            # Draw name on certificate
            draw.text((x, y), name, fill=FONT_COLOR, font=font)

            # Save certificate with participant name
            # Replace spaces with underscores for valid filename
            clean_filename = name.replace(" ", "_")
            output_file = os.path.join(OUTPUT_DIR, f"{clean_filename}.png")

            img.save(output_file)
            certificate_count += 1
            print(f"✓ Generated: {clean_filename}.png")

        # Generate certificates.json manifest
        manifest = []
        for f in sorted(os.listdir(OUTPUT_DIR)):
            if f.endswith((".png", ".jpg", ".jpeg", ".pdf")):
                clean_name = os.path.splitext(f)[0].replace("__", " ").replace("_", " ").strip()
                manifest.append({
                    "name": clean_name,
                    "filename": f,
                    "path": f"ITM_certificate/certificates/{f}"
                })
        manifest_path = os.path.join(OUTPUT_DIR, "certificates.json")
        with open(manifest_path, "w", encoding="utf-8") as mf:
            json.dump(manifest, mf, indent=2, ensure_ascii=False)
        print(f"✓ Generated manifest: {manifest_path} ({len(manifest)} items)")

        root_manifest = os.path.abspath(os.path.join(OUTPUT_DIR, "..", "..", "certificates.json"))
        if os.path.exists(root_manifest):
            with open(root_manifest, "w", encoding="utf-8") as rmf:
                json.dump(manifest, rmf, indent=2, ensure_ascii=False)

        # Summary
        print("\n" + "=" * 60)
        print(f"✓ SUCCESS! Generated {certificate_count} certificates")
        print(f"📁 Saved to: {os.path.abspath(OUTPUT_DIR)}")
        print("=" * 60)

except urllib.error.HTTPError as e:
    print(f"❌ HTTP Error {e.code}: {e.reason}")
    print("   Check: Is the Google Sheet link set to 'Anyone with the link'?")
except urllib.error.URLError as e:
    print(f"❌ Network Error: {e.reason}")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
