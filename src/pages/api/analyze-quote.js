import OpenAI from 'openai';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendAnalysisEmail } from '../../lib/email';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { quoteText, email, specificQuestions, fileName, fileUrl } = req.body;

  if (!quoteText || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create the AI prompt
    const prompt = `
    You're a savage home renovation expert who reviews contractor quotes with zero patience for BS. Your job is to sniff out vague language, hidden fees, inflated pricing, and missing scope details. Be blunt, funny, and brutally helpful — but never mean for the sake of it. Give advice the user can actually use.
    
    QUOTE TO ANALYZE:
    ${quoteText}
    
    ${specificQuestions ? `SPECIFIC QUESTIONS TO ADDRESS:
    ${specificQuestions}` : ''}
    
    Respond in this exact format:
    
    SUMMARY OF THE QUOTE:
    [In 1-2 sentences, explain in plain English what this quote is for and what work is being proposed.]
    
    REALISTIC PRICE RANGE:
    [Give a realistic price range for this type of job in the user's area, if possible. If you can't estimate, say so.]
    
    GRADE: [A–F] — A quick, punchy judgment on how legit this quote is.
    
    KEY ISSUES:
    • [List the top 2–5 issues — vague terms, missing materials, sketchy pricing, etc.]
    
    SMART QUESTIONS TO ASK:
    • [List 2–3 pointed questions the user should ask their contractor to clarify or pressure-test the quote]
    
    NEGOTIATION TIPS:
    [Give 1–2 clear tactics the user can use to push back or lower the price]
    
    RED FLAGS 🚩 (if any):
    • [Highlight anything suspicious, shady, or deal-breaking]
    
    BONUS TIP 💡:
    [Drop a helpful or surprising insight about hiring contractors, spotting bad quotes, or saving money]
    
    Tone: direct, confident, occasionally snarky. Use plain English. Emojis OK but only when they punch up the point (🚩🔥💸💡).
    `;

    // Get AI analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const analysis = completion.choices[0].message.content;

    // Store in Firebase
    await addDoc(collection(db, 'quote_analyses'), {
      email,
      fileName,
      fileUrl,
      quoteText,
      specificQuestions,
      analysis,
      createdAt: serverTimestamp(),
      status: 'completed'
    });

    // Send email with results
    const emailSent = await sendAnalysisEmail(email, analysis, fileName);

    res.status(200).json({ 
      success: true, 
      analysis,
      emailSent,
      message: emailSent ? 'Analysis complete! Check your email for results.' : 'Analysis complete! Email delivery failed.'
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Store failed attempt
    try {
      await addDoc(collection(db, 'quote_analyses'), {
        email,
        fileName,
        fileUrl,
        quoteText,
        specificQuestions,
        error: error.message,
        createdAt: serverTimestamp(),
        status: 'failed'
      });
    } catch (firebaseError) {
      console.error('Failed to store error:', firebaseError);
    }
    
    res.status(500).json({ error: 'Analysis failed. Please try again.' });
  }
} 