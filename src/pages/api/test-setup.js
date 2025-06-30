import { db, storage } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const testResults = {
    firebase: false,
    openai: false,
    resend: false,
    storage: false
  };

  try {
    // Test Firebase Firestore
    try {
      await addDoc(collection(db, 'test'), {
        test: true,
        timestamp: new Date()
      });
      testResults.firebase = true;
    } catch (error) {
      console.error('Firebase test failed:', error);
    }

    // Test Firebase Storage
    try {
      const testRef = ref(storage, 'test/test.txt');
      testResults.storage = true;
    } catch (error) {
      console.error('Storage test failed:', error);
    }

    // Test OpenAI
    try {
      if (process.env.OPENAI_API_KEY) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Say 'Hello from QuoteWTF!'" }],
          max_tokens: 10,
        });
        
        testResults.openai = true;
      }
    } catch (error) {
      console.error('OpenAI test failed:', error);
    }

    // Test Resend
    try {
      if (process.env.RESEND_API_KEY) {
        testResults.resend = true;
      }
    } catch (error) {
      console.error('Resend test failed:', error);
    }

    res.status(200).json({
      message: 'Setup test completed',
      results: testResults,
      environment: {
        hasOpenAI: !!process.env.OPENAI_API_KEY,
        hasResend: !!process.env.RESEND_API_KEY,
        hasFirebase: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      }
    });

  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      results: testResults
    });
  }
} 