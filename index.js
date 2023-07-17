const express = require('express');
const sharp = require('sharp');
const axios = require('axios');

const app = express();
const port = 3000;

// Endpoint to manipulate images
app.get('/manipulate-image', async (req, res) => {
  const imageUrl = req.query.url; // Get the image URL from query parameters
  let imagePipeline = sharp(); // Create a Sharp pipeline

  if (req.query.width || req.query.height) {
    const width = parseInt(req.query.width) || undefined;
    const height = parseInt(req.query.height) || undefined;
    const options = { fit: req.query.crop ? 'cover' : 'inside' };

    imagePipeline = imagePipeline.resize(width, height, options);
  }

  if (req.query.bw) {
    imagePipeline = imagePipeline.grayscale();
  }

  if (req.query.rotate) {
    const rotateAngle = parseInt(req.query.rotate);
    imagePipeline = imagePipeline.rotate(rotateAngle);
  }
  if (req.query.filter) {
    const filterType = req.query.filter.toLowerCase();
    // Apply filter based on the provided filter type
    switch (filterType) {
      case 'grayscale':
        imagePipeline = imagePipeline.grayscale();
        break;
      case 'sepia':
        imagePipeline = imagePipeline.sepia();
        break;
      // Add more filter types as needed
      default:
        return res.status(400).send('Invalid filter type specified.');
    }
  }

  if (req.query.format) {
    const format = req.query.format.toLowerCase();

    if (['jpeg', 'png', 'webp'].includes(format)) {
      imagePipeline = imagePipeline.toFormat(format);
    } else {
      return res.status(400).send('Invalid format specified.');
    }
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const imageBuffer = await sharp(response.data).pipe(imagePipeline).toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.set('Content-Length', imageBuffer.length);

    res.send(imageBuffer);

  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});