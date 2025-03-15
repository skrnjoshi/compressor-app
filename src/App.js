import React, { useState } from "react";
import "./App.css";

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(70);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOriginalSize(file.size);
    setCompressedImage(null);
    setCompressedSize(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!originalImage) return;

    setLoading(true);

    const img = new Image();
    img.src = originalImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Maintain aspect ratio
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to compressed format
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality / 100);
      setCompressedImage(compressedDataUrl);

      // Calculate compressed size
      const base64str = compressedDataUrl.split(",")[1];
      const compSize = Math.round((base64str.length * 3) / 4);
      setCompressedSize(compSize);

      setLoading(false);
    };
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = "compressed-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const compressionRatio = () => {
    if (compressedSize === 0 || originalSize === 0) return 0;
    return Math.round((1 - compressedSize / originalSize) * 100);
  };

  return (
    <div className="image-compressor-container">
      <h1 className="compressor-title">Image Compressor</h1>

      <div className="upload-container">
        <div>
          <label className="input-label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        {originalImage && (
          <div>
            <label className="input-label">Quality: {quality}%</label>
            <input
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="quality-slider"
            />

            <button
              onClick={compressImage}
              disabled={loading}
              className={`compress-button ${loading ? "loading" : ""}`}
            >
              {loading ? "Compressing..." : "Compress Image"}
            </button>
          </div>
        )}
      </div>

      {originalImage && (
        <div className="comparison-grid">
          <div className="image-panel">
            <h2 className="panel-title">Original</h2>
            <p className="size-info">Size: {formatSize(originalSize)}</p>
            <div className="image-container">
              <img
                src={originalImage}
                alt="Original"
                className="preview-image"
              />
            </div>
          </div>

          {compressedImage && (
            <div className="image-panel">
              <h2 className="panel-title">Compressed</h2>
              <div className="flex justify-between items-center mb-2">
                <p className="size-info">Size: {formatSize(compressedSize)}</p>
                <p className="reduction-indicator">
                  {compressionRatio()}% reduction
                </p>
              </div>
              <div className="image-container">
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="preview-image"
                />
              </div>
              <button onClick={downloadImage} className="download-button">
                Download Compressed Image
              </button>
            </div>
          )}
        </div>
      )}

      {compressedImage && (
        <div className="summary-container">
          <h3 className="summary-title">Compression Summary</h3>
          <ul className="summary-list">
            <li>Original size: {formatSize(originalSize)}</li>
            <li>Compressed size: {formatSize(compressedSize)}</li>
            <li>
              Saved: {formatSize(originalSize - compressedSize)} (
              {compressionRatio()}%)
            </li>
            <li>Quality setting: {quality}%</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
