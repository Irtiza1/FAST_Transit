import cv2
import pytesseract

# Load the image
image = cv2.imread('slip.jpg')

# Convert to grayscale for better text extraction
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Preprocess: apply thresholding or other techniques
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

# Use Tesseract to extract text
extracted_text = pytesseract.image_to_string(thresh)

# Print extracted text
print(extracted_text)
