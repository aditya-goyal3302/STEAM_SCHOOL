import AWS from "aws-sdk";
import { useState,useEffect } from "react";

// import { use } from "../../../../server/routes/UserRoutes";

function Test({
    new_url,
    setnew_url,
    textboxstate,
    settextboxstate
}) {
  // Create state to store file
  const [file, sefile] = useState(null);
  const base_url ="https://steamschool199.s3.ap-south-1.amazonaws.com/"
  const [url, setUrl] = useState("");
  const verify_file = async () => {
    // console.log(file);
    let tname = file.name.toString().split('.')[1];
    if(tname=="jpg"|| tname=="jpeg"|| tname=="png"|| tname=="gif"|| tname=="webp"){
      return true;
    }
    else{
      return false;
    }
  }
  const handleFileChange = async (event) => {
    // console.log(1)
        const files = await event.target.files[0];
        // console.log(files);
         sefile(files);
    };

    useEffect(() => { 
      if(textboxstate== true)
      document.getElementById("gefilebtn").click()
    },[textboxstate])

    useEffect(async() => {
      if(file!=null)
        await uploadFile().then((res) => {
          console.log(res);
          if (res==1) {
            console.log("Uploaded");
          }
          else{
            alert("Not Uploaded.. Wrong file format..");
          }
        });
        
    },[file])

  // Function to upload file to s3
    useEffect(() => {
        setnew_url(url)
        // console.log(url)
    },[url])

    const generateRandomString = async() => {
    console.log(2)

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        randomString += "."+file.name.split('.')[1];
        return randomString;
    };


  const uploadFile = async () => {
    if(await verify_file()){
      const S3_BUCKET = "steamschool199";

      const REGION = "ap-south-1";

      AWS.config.update({
        accessKeyId: "AKIAVXMPYCD56SUUX6VN",
        secretAccessKey: "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",
      });
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });

      const randomString = await generateRandomString();
      const params = {
        Bucket: S3_BUCKET,
        Key: randomString,
        Body: file,
      };

      var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();

      return await upload.then((err, data) => {
        console.log(err);
        setUrl(base_url+randomString);
        settextboxstate(0)
        sefile(null);
        return 1;
      });
    }
    else{
      settextboxstate(0)
      sefile(null);
      return 0;
    }
  };
  return (
    <div >
        <input
        type="file"
        id="file-picker"
        accept=".jpg, .jpeg, .png, .gif, .webp"
        multiple={true}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button id={"gefilebtn"} style={{
          backgroundColor:"white",
          color:"black",
          // padding:"auto",
          width:"100%",
          float:"left",
          borderRadius:"10px",
          border:"none",
          cursor:"pointer"
      }} onClick={() => document.getElementById('file-picker').click()}>
        Select Image
      </button>
    </div>
  );
}

export default Test;
