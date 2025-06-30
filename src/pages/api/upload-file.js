import multer from 'multer';
import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle file upload with multer
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'File upload failed' });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      let extractedText = '';
      let fileUrl = '';

      try {
        // Upload file to Firebase Storage
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.originalname}`;
        const storageRef = ref(storage, `quotes/${fileName}`);
        
        await uploadBytes(storageRef, file.buffer, {
          contentType: file.mimetype,
        });
        
        fileUrl = await getDownloadURL(storageRef);

        // Extract text based on file type
        if (file.mimetype === 'application/pdf') {
          // Process PDF
          const pdfData = await pdf(file.buffer);
          extractedText = pdfData.text;
        } else if (file.mimetype.startsWith('image/')) {
          // Process image with OCR
          const result = await Tesseract.recognize(file.buffer, 'eng');
          extractedText = result.data.text;
        } else {
          return res.status(400).json({ error: 'Unsupported file type' });
        }

        res.status(200).json({ 
          text: extractedText,
          fileUrl: fileUrl,
          fileName: file.originalname,
          fileSize: file.size
        });

      } catch (error) {
        console.error('File processing error:', error);
        res.status(500).json({ error: 'File processing failed' });
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
} 