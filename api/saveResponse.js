import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { responseData } = req.body;
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `response_${timestamp}.json`;
    
    // Upload to AWS S3
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `responses/${fileName}`,
      Body: JSON.stringify(responseData),
      ContentType: "application/json"
    });

    try {
      await s3.send(command);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to save response" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
