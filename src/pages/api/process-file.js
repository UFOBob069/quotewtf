import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileUrl, fileName, fileType } = req.body;

  if (!fileUrl || !fileName) {
    return res.status(400).json({ error: 'File URL and name are required' });
  }

  console.log('[PROCESS] Processing file:', { fileName, fileType, fileUrl });

  try {
    let extractedText = '';

    // Download the file from Firebase Storage
    console.log('[PROCESS] Downloading file from Firebase Storage...');
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    const buffer = await response.arrayBuffer();
    console.log('[PROCESS] File downloaded, size:', buffer.byteLength);

    // Extract text based on file type
    if (fileType === 'application/pdf') {
      console.log('[PROCESS] Extracting text from PDF...');
      const pdfData = await pdf(Buffer.from(buffer));
      extractedText = pdfData.text;
      console.log('[PROCESS] PDF text extraction complete. Length:', extractedText.length);
    } else if (fileType.startsWith('image/')) {
      console.log('[PROCESS] Extracting text from image with Tesseract...');
      
      try {
        // Try a simpler Tesseract configuration first
        const result = await Tesseract.recognize(Buffer.from(buffer), 'eng', {
          logger: m => console.log('[TESSERACT]', m),
        });
        
        extractedText = result.data.text;
        console.log('[PROCESS] Image OCR complete. Length:', extractedText.length);
      } catch (tesseractError) {
        console.error('[PROCESS] Tesseract error:', tesseractError);
        
        // Fallback: try with CDN configuration
        console.log('[PROCESS] Trying Tesseract with CDN configuration...');
        const result = await Tesseract.recognize(Buffer.from(buffer), 'eng', {
          logger: m => console.log('[TESSERACT]', m),
          workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.0/dist/worker.min.js',
          corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.0.0/tesseract-core-simd.wasm.js',
          langPath: 'https://tessdata.projectnaptha.com/4.0.0'
        });
        
        extractedText = result.data.text;
        console.log('[PROCESS] Image OCR complete with CDN. Length:', extractedText.length);
      }
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    if (!extractedText || extractedText.trim().length < 10) {
      return res.status(400).json({ error: 'Could not extract enough text from the file' });
    }

    res.status(200).json({ 
      text: extractedText,
      fileUrl: fileUrl,
      fileName: fileName
    });
    console.log('[PROCESS] Success response sent.');

  } catch (error) {
    console.error('[PROCESS] Processing error:', error);
    console.error('[PROCESS] Error stack:', error.stack);
    res.status(500).json({ 
      error: 'File processing failed: ' + error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 