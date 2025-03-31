import React, { useState } from "react";

const Home = () => {
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
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg bg-blue-50 text-center">
      <h2 className="text-2xl font-semibold">

        Upload an Image for Fire & Smoke Detection
      
      </h2>

      <label className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-4 mr-2">
        Choose File
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={previewOriginal}
          className="hidden"
        />
      </label>

      <button
        onClick={uploadImage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
      >
        Detect
      </button>

      <div className="flex justify-between mt-8">

        <div className="flex-1 px-4 text-center">

          <h3 className="text-lg font-semibold">Original Image</h3>

          {originalImage && (
            <img
              id="original"
              src={originalImage}
              alt="Original Image"
              className="max-w-lg rounded-md shadow-md object-contain mt-4"
            />
          )}

        </div>

        <div className="flex-1 px-4 text-center">

          <h3 className="text-lg font-semibold">Detected Image</h3>

          {detectedImage && (
            <img
              id="detected"
              src={detectedImage}
              alt="Detected Image"
              className="max-w-lg rounded-md shadow-md object-contain mt-4"
            />
          )}

        </div>

      </div>

    </div>
    
  );
};

export default Home;
