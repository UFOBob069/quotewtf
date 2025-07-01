import multer from 'multer';
import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default async function handler(req, res) {
  console.log('[UPLOAD] Endpoint hit with method:', req.method);
  if (req.method !== 'POST') {
    console.log('[UPLOAD] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle file upload with multer
    console.log('[UPLOAD] Starting multer processing...');
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('[UPLOAD] Multer error:', err);
        return res.status(400).json({ error: 'File upload failed' });
      }

      const file = req.file;
      if (!file) {
        console.log('[UPLOAD] No file provided in request.');
        return res.status(400).json({ error: 'No file provided' });
      }

      console.log('[UPLOAD] File received:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      });

      let extractedText = '';
      let fileUrl = '';

      try {
        // Upload file to Firebase Storage
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.originalname}`;
        const storageRef = ref(storage, `quotes/${fileName}`);
        console.log('[UPLOAD] Uploading to Firebase Storage:', fileName);
        await uploadBytes(storageRef, file.buffer, {
          contentType: file.mimetype,
        });
        fileUrl = await getDownloadURL(storageRef);
        console.log('[UPLOAD] File uploaded. Firebase URL:', fileUrl);

        // Extract text based on file type
        if (file.mimetype === 'application/pdf') {
          console.log('[UPLOAD] Extracting text from PDF...');
          const pdfData = await pdf(file.buffer);
          extractedText = pdfData.text;
          console.log('[UPLOAD] PDF text extraction complete. Length:', extractedText.length);
        } else if (file.mimetype.startsWith('image/')) {
          console.log('[UPLOAD] Extracting text from image with Tesseract...');
          
          // Configure Tesseract to use CDN for WASM files
          Tesseract.setLogging(true);
          
          // Add timeout wrapper for Tesseract processing
          const tesseractPromise = Tesseract.recognize(file.buffer, 'eng', {
            logger: m => console.log('[TESSERACT]', m),
            workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.0/dist/worker.min.js',
            corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.0.0/tesseract-core-simd.wasm.js',
            langPath: 'https://tessdata.projectnaptha.com/4.0.0'
          });
          
          // Set a 60-second timeout for OCR processing
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('OCR processing timeout')), 60000);
          });
          
          const result = await Promise.race([tesseractPromise, timeoutPromise]);
          
          extractedText = result.data.text;
          console.log('[UPLOAD] Image OCR complete. Length:', extractedText.length);
        } else {
          console.log('[UPLOAD] Unsupported file type:', file.mimetype);
          return res.status(400).json({ error: 'Unsupported file type' });
        }

        res.status(200).json({ 
          text: extractedText,
          fileUrl: fileUrl,
          fileName: file.originalname,
          fileSize: file.size
        });
        console.log('[UPLOAD] Success response sent.');

      } catch (error) {
        console.error('[UPLOAD] File processing error:', error);
        res.status(500).json({ error: 'File processing failed' });
      }
    });

  } catch (error) {
    console.error('[UPLOAD] Outer upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
} 