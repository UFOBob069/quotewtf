import pdf from 'pdf-parse';

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
      console.log('[PROCESS] Extracting text from image with Google Cloud Vision...');
      
      // Check if Google Cloud Vision API key is configured
      if (!process.env.GOOGLE_CLOUD_VISION_API_KEY) {
        console.error('[PROCESS] Google Cloud Vision API key not configured');
        return res.status(500).json({ 
          error: 'Image processing is not configured. Please contact support.',
          details: 'Google Cloud Vision API key missing'
        });
      }
      
      // Use fetch to call Google Cloud Vision API directly
      const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
      const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      
      // Convert buffer to base64
      const imageBuffer = Buffer.from(buffer);
      const base64Image = imageBuffer.toString('base64');
      
      // Prepare the request body
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'TEXT_DETECTION',
              },
            ],
          },
        ],
      };
      
      // Call Google Cloud Vision API
      const visionResponse = await fetch(visionApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!visionResponse.ok) {
        throw new Error(`Google Cloud Vision API error: ${visionResponse.statusText}`);
      }
      
      const visionResult = await visionResponse.json();
      
      if (visionResult.responses && visionResult.responses[0] && visionResult.responses[0].textAnnotations) {
        // The first element contains the entire text
        extractedText = visionResult.responses[0].textAnnotations[0].description;
        console.log('[PROCESS] Image OCR complete. Length:', extractedText.length);
      } else {
        console.log('[PROCESS] No text detected in image');
        extractedText = '';
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