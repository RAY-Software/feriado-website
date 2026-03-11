import os
import glob
files = glob.glob('c:/Users/gasto/ray/ohmexico-website/public/**/*.*', recursive=True)
images = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
images.sort(key=os.path.getmtime, reverse=True)
with open('c:/Users/gasto/ray/ohmexico-website/recent_images.txt', 'w', encoding='utf-8') as f:
    for img in images[:10]:
        f.write(img + '\n')
