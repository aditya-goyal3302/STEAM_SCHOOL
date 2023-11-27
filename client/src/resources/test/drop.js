import AWS from "aws-sdk";


function Drop() {
  const base_url ="https://steamschool199.s3.ap-south-1.amazonaws.com/"

    const generateRandomString = async(file) => {
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


  const uploadFile = async ( file) => {
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

    const randomString = await generateRandomString(file);
    console.log(randomString);
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

    await upload.then((err, data) => {
      console.log(err);
      return base_url+randomString
    });
  };


}

export default Drop.uploadFile;
