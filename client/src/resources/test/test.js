import AWS from "aws-sdk";
import { useState,useEffect } from "react";

// import { use } from "../../../../server/routes/UserRoutes";

function Test({
    new_url,
    setnew_url
    
}) {
  // Create state to store file
  const [file, setFile] = useState(null);
  const base_url ="https://steamschool199.s3.ap-south-1.amazonaws.com/"
  const [url, setUrl] = useState("");

  const handleFileChange = async (event) => {
    console.log(1)
        const file = await event.target.files[0];
         setFile(file);
        console.log(file);
    };

    useEffect(() => {
        if(file)
            uploadFile();
    },[file])

  // Function to upload file to s3
    useEffect(() => {
        setnew_url(url)
        console.log(new_url)
    },[url])

    const generateRandomString = async() => {
    console.log(2)

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 32; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        randomString += "."+file.name.split('.')[1];
        return randomString;
    };


  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "steamschool199";

    // S3 Region
    const REGION = "ap-south-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "AKIAVXMPYCD56SUUX6VN",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters
    // Generate a random alphanumeric string of 32 characters
    

    // Usage
    const randomString = await generateRandomString();
    console.log(randomString);
    const params = {
      Bucket: S3_BUCKET,
      Key: randomString,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded

    //   alert("File uploaded successfully.");
      setUrl(base_url+randomString);
    });
  };
//   // Function to handle file and store it to file state
//   const handleFileChange = (e) => {
//     // Uploaded file
//     const file = e.target.files[0];
//     // Changing file state
//     setFile(file);
//   };
  return (
    <div >
        <input
        type="file"
        id="file-picker"
        accept=".jpg, .jpeg, .png, .gif, .webp"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={() => document.getElementById('file-picker').click()}>
        Select Image
      </button>
    </div>
  );
}

export default Test;
