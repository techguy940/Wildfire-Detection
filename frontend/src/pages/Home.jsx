import React, { useState } from "react";

const FireAndSmokeDetection = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);

  const previewOriginal = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const fileInput = document.getElementById("imageInput");
    if (fileInput.files.length === 0) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDetectedImage(url);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Upload an Image for Fire & Smoke Detection</h2>
      
      <label>
        Choose File
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={previewOriginal}
        />
      </label>
      
      <button onClick={uploadImage}>
        Detect
      </button>

      <div>
        <div>
          <h3>Original Image</h3>
          {originalImage && (
            <img
              id="original"
              src={originalImage}
              alt="Original Image"
            />
          )}
        </div>
        <div>
          <h3>Detected Image</h3>
          {detectedImage && (
            <img
              id="detected"
              src={detectedImage}
              alt="Detected Image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FireAndSmokeDetection;