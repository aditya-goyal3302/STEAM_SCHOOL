// App.js
import React, { useState } from 'react';
import { Storage } from 'aws-amplify';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const result = await Storage.put(file.name, file);
        console.log('File uploaded successfully. URL:', result.key);
        // You can now use result.key as the URL of the uploaded file
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.warn('No file selected for upload.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
