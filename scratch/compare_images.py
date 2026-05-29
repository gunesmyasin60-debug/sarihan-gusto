import os
from PIL import Image
import math
import operator

def rmsdiff(im1, im2):
    "Calculate the root-mean-square difference between two images"
    # Resize both to a common small size for quick visual comparison
    im1 = im1.resize((100, 100)).convert('RGB')
    im2 = im2.resize((100, 100)).convert('RGB')
    
    h1 = im1.histogram()
    h2 = im2.histogram()
    
    # calculate rms
    return math.sqrt(reduce(operator.add,
        map(lambda a,b: (a-b)**2, h1, h2))/len(h1))

from functools import reduce

images_dir = "public/images"
interior_imgs = [f"interior_{i}.png" for i in range(1, 10)]

print("Comparing images to find duplicates:")
duplicates = []

for i in range(len(interior_imgs)):
    for j in range(i + 1, len(interior_imgs)):
        img1_name = interior_imgs[i]
        img2_name = interior_imgs[j]
        
        path1 = os.path.join(images_dir, img1_name)
        path2 = os.path.join(images_dir, img2_name)
        
        if os.path.exists(path1) and os.path.exists(path2):
            try:
                im1 = Image.open(path1)
                im2 = Image.open(path2)
                
                diff = rmsdiff(im1, im2)
                print(f"{img1_name} vs {img2_name}: Diff={diff:.2f}")
                
                # If difference is extremely small, they are visually identical
                if diff < 1500: # Threshold for histogram similarity on 100x100
                    duplicates.append((img1_name, img2_name, diff))
            except Exception as e:
                print(f"Error comparing {img1_name} and {img2_name}: {e}")

print("\n--- Summary of suspected duplicates ---")
for img1, img2, diff in duplicates:
    print(f"Duplicate found! {img1} and {img2} (diff score: {diff:.2f})")
