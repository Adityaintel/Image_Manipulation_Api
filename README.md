# Image Manipulation API

This is a Node.js API that allows you to manipulate third-party image URLs by performing various image processing tasks such as resizing, cropping, and rotating using the Sharp.js library.

## Setup

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/Adityaintel/Image_Manipulation_Api.git
   cd Image_Manipulation_Api
   
2. Install the dependencies:
   ```bash
   npm install

3. Starting the server:
   ```bash
   npm install
   ```
   ```bash
   The API will start running at http://localhost:3000.
   ```
## API Endpoint
```bash
GET /manipulate-image
```
```bash
Accepts the following URL parameters:

url: The URL of the third-party image to be manipulated.

width (optional): The desired width of the manipulated image.

height (optional): The desired height of the manipulated image.

crop (optional): A boolean parameter indicating whether the image should be cropped or resized to fit the specified dimensions.

bw (optional): A boolean parameter indicating whether the output should be black and white or not.

rotate (optional): The rotation angle for the image in degrees.

filter (optional): The filter to apply to the image (e.g., "grayscale", "sepia").

format (optional): The desired format of the manipulated image (e.g., "jpeg", "png", "webp").
```

## Examples
Resizing the image to a width of 500 pixels:
```bash
GET /manipulate-image?url=https://example.com/image.jpg&width=500
```

Cropping and resizing the image to a width of 300 pixels and a height of 200 pixels:
```bash
GET /manipulate-image?url=https://example.com/image.jpg&width=300&height=200&crop=true
```
Converting the image to black and white:
```bash
GET /manipulate-image?url=https://example.com/image.jpg&bw=true
```
Converting the image to PNG format:
```bash
GET /manipulate-image?url=https://example.com/image.jpg&format=png
```
Please note that you need to replace https://example.com/image.jpg with the actual URL of the image you want to manipulate.
URL used to test:
```bash
https://via.placeholder.com/500
```
