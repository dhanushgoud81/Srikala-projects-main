import os
from PIL import Image

def analyze():
    img_path = "../public/images/LOGO.png"
    if not os.path.exists(img_path):
        img_path = "public/images/LOGO.png"
    
    img = Image.open(img_path)
    print("Format:", img.format)
    print("Size:", img.size)
    print("Mode:", img.mode)
    
    # Check some pixels
    w, h = img.size
    print("Top-left pixel:", img.getpixel((0, 0)))
    print("Top-right pixel:", img.getpixel((w - 1, 0)))
    print("Bottom-left pixel:", img.getpixel((0, h - 1)))
    print("Bottom-right pixel:", img.getpixel((w - 1, h - 1)))
    
    # Get standard colors in a 10x10 grid on the left/top edges
    for y in range(10):
        row = [img.getpixel((x, y)) for x in range(10)]
        print(f"Row {y}:", [p[:3] if len(p) > 3 else p for p in row])

if __name__ == "__main__":
    analyze()
