import cv2
import numpy as np

def get_disease_spread_percentage(image_path):
    """
    Calculates the percentage of disease spread in a plant leaf image
    using HSV color thresholding for yellow chlorosis and brown lesions.

    Args:
        image_path (str): Path to the input image

    Returns:
        float: Disease spread percentage (0.0 - 100.0)
    """

    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at path: {image_path}")

    # Convert to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define color thresholds
    lower_yellow = np.array([20, 100, 100])
    upper_yellow = np.array([35, 255, 255])

    lower_brown = np.array([5, 50, 20])
    upper_brown = np.array([15, 255, 200])

    # Create masks for yellow and brown diseased areas
    yellow_mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
    brown_mask = cv2.inRange(hsv, lower_brown, upper_brown)
    disease_mask = cv2.bitwise_or(yellow_mask, brown_mask)

    # Optional: clean up mask using morphological operations
    kernel = np.ones((5, 5), np.uint8)
    disease_mask = cv2.morphologyEx(disease_mask, cv2.MORPH_CLOSE, kernel)
    disease_mask = cv2.morphologyEx(disease_mask, cv2.MORPH_OPEN, kernel)

    # Count pixels
    diseased_pixels = cv2.countNonZero(disease_mask)
    total_pixels = image.shape[0] * image.shape[1]

    # Avoid division by zero
    if total_pixels == 0:
        return 0.0

    # Calculate spread percentage
    spread_percentage = (diseased_pixels / total_pixels) * 100
    return round(spread_percentage, 2)