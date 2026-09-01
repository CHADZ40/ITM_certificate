import os
import pandas as pd
import pdfkit

# --- CONFIGURATION ---
# Path to wkhtmltopdf binary (Update based on your OS)
# Windows: r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'
# macOS/Linux: '/usr/local/bin/wkhtmltopdf' or '/usr/bin/wkhtmltopdf'
WKHTMLTOPDF_PATH = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'


DATA_SOURCE = 'https://docs.google.com/spreadsheets/d/e/.../pub?output=csv'

OUTPUT_DIR = '../certificates'
TEMPLATE_PATH = 'template.html'

def load_data(source):
    """Loads participant data from a local Excel file or a live Google Sheet CSV."""
    if source.startswith('http'):
        return pd.read_csv(source)
    return pd.read_excel(source)

def generate_certificates():
    # 1. Configure PDF generator
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOPDF_PATH)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 2. Load dynamic data
    df = load_data(DATA_SOURCE)

    # 3. Read HTML layout template
    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        base_template = f.read()

    # 4. Generate individual PDFs
    for _, row in df.iterrows():
        name = str(row['Name']).strip()
        if not name or name.lower() == 'nan':
            continue

        # Sanitize filename (e.g., "John Doe" -> "John_Doe")
        safe_name = name.replace(" ", "_")
        output_file = os.path.join(OUTPUT_DIR, f"Certificate_{safe_name}.pdf")

        # Replace dynamic placeholders in HTML
        custom_html = base_template.replace("{{NAME}}", name)

        # Convert to PDF
        pdfkit.from_string(custom_html, output_file, configuration=config)
        print(f"Generated: {output_file}")

if __name__ == "__main__":
    generate_certificates()
    print("All certificates have been generated successfully!")
