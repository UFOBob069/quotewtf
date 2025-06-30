# QuoteWTF

Viral, AI-powered contractor quote analysis for homeowners. Upload your contractor's quote (PDF or image), and get instant, savage feedback from GPT-4—spotting red flags, vague language, and pricing issues in a fun, blunt, and shareable style.

## Features
- 🔥 Instant AI analysis of contractor quotes (PDF, JPG, PNG)
- 🚩 Detects red flags, vague terms, and hidden costs
- 💸 Estimates a realistic price range for your job
- 📋 Copy, email, or share your results
- 🎉 Fun, viral, and brutally honest feedback
- 🏡 Designed for homeowners, not contractors

## How It Works
1. **Upload** your contractor's quote (PDF or image)
2. **Enter your zip code** for local price accuracy (email optional)
3. **Get instant results**: AI highlights issues, negotiation tips, and a price range
4. **Share** your savage analysis with friends, family, or your contractor

## Tech Stack
- Next.js, React, Tailwind CSS
- Firebase (Storage & Firestore)
- OpenAI GPT-4 for analysis
- Resend for email delivery
- Tesseract.js & pdf-parse for text extraction

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/UFOBob069/quotewtf.git
   cd quotewtf
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your API keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   OPENAI_API_KEY=your_openai_key
   RESEND_API_KEY=your_resend_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing
Pull requests welcome! For major changes, open an issue first to discuss what you'd like to change.

## License
MIT

---

**QuoteWTF** — Because your money deserves better than contractor BS. 🚩💸
