import React, { useState } from "react";

const Home = () => {
  const [originalImage, setOriginalImage] = useState(null);

  const previewOriginal = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
   //code here
    alert("File uploaded successfully");

    const fileInput = document.getElementById("imageInput");
    fileInput.value = ""; 
    
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
    </div>
  );
};

export default Home;
