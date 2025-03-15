# Image Compressor

A simple browser-based image compression tool built with React. Compress your images instantly without uploading them to any server.

## Features

- Reduce image file sizes with adjustable quality settings
- Instantly compare original and compressed images
- See compression statistics in real-time
- One-click download of compressed images
- Works entirely in your browser - no data is sent to any server
- Responsive design for desktop and mobile

## How to Use

1. Upload an image using the file selector
2. Adjust the quality slider to your preferred compression level
3. Click "Compress Image" to process the image
4. View the results and download the compressed image if satisfied

## Technology

This project is built with:
- React
- HTML5 Canvas API for image processing
- JavaScript FileReader API

## Implementation

The app works by drawing the uploaded image onto an HTML Canvas and then re-encoding it as a JPEG with reduced quality. All processing happens locally in your browser, ensuring your images stay private.

## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/image-compressor.git
cd image-compressor
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## License

MIT
