// components/Hero.jsx
import { useState } from 'react';

function highlightSections(text) {
  // Clean up and structure the output
  let html = text
    // SUMMARY OF THE QUOTE
    .replace(/SUMMARY OF THE QUOTE:\s*([\s\S]*?)REALISTIC PRICE RANGE:/i, '<div class="mb-4"><span class="font-bold text-orange-700 text-lg">📝 Summary:</span><br/><span class="text-gray-800">$1</span></div>REALISTIC PRICE RANGE:')
    // REALISTIC PRICE RANGE
    .replace(/REALISTIC PRICE RANGE:\s*([\s\S]*?)GRADE:/i, '<div class="mb-4"><span class="font-bold text-orange-700 text-lg">💸 Price Range:</span><br/><span class="text-gray-800">$1</span></div>GRADE:')
    // GRADE
    .replace(/GRADE:\s*([A-F][^\n]*)/i, '<div class="mb-4"><span class="font-bold text-orange-700 text-lg">🏆 Grade:</span> <span class="text-gray-800">$1</span></div>')
    // KEY ISSUES
    .replace(/KEY ISSUES?:/gi, '<div class="mt-6 mb-2 font-bold text-orange-600 text-lg flex items-center gap-2">⚠️ Key Issues</div>')
    // SMART QUESTIONS TO ASK
    .replace(/SMART QUESTIONS TO ASK:/gi, '<div class="mt-6 mb-2 font-bold text-blue-700 text-lg flex items-center gap-2">🧠 Smart Questions to Ask</div>')
    // NEGOTIATION TIPS
    .replace(/NEGOTIATION TIPS:/gi, '<div class="mt-6 mb-2 font-bold text-green-700 text-lg flex items-center gap-2">💡 Negotiation Tips</div>')
    // RED FLAGS
    .replace(/RED FLAGS? 🚩 \(if any\):/gi, '<div class="mt-6 mb-2 font-bold text-red-600 text-lg flex items-center gap-2">🚩 Red Flags</div>')
    .replace(/RED FLAGS?:/gi, '<div class="mt-6 mb-2 font-bold text-red-600 text-lg flex items-center gap-2">🚩 Red Flags</div>')
    // BONUS TIP
    .replace(/BONUS TIP 💡:/gi, '<div class="mt-6 mb-2 font-bold text-yellow-600 text-lg flex items-center gap-2">✨ Bonus Tip</div>')
    // Bullets: replace lines starting with • or - with <li>
    .replace(/(?:<div[^>]*>[^<]*<\/div>)?\s*[•\-]\s*(.*?)(?=(<div|$|\n[•\-]))/g, '<li class="mb-1">$1</li>')
    // Wrap lists in <ul>
    .replace(/(<div[^>]*>[^<]*<\/div>)(\s*(<li[^>]*>.*?<\/li>\s*)+)/g, '$1<ul class="list-disc list-inside mb-4">$2</ul>')
    // Remove random newlines in <li>
    .replace(/\n/g, ' ')
    // Remove double <ul>
    .replace(/<\/ul>\s*<ul[^>]*>/g, '')
    // Remove empty <li>
    .replace(/<li[^>]*>\s*<\/li>/g, '')
    // Remove any leftover double spaces
    .replace(/\s{2,}/g, ' ');
  return html;
}

export default function Hero() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [specificQuestions, setSpecificQuestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [zipError, setZipError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a PDF, JPG, or PNG file.');
      return;
    }
    if (selectedFile.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }
    setFile(selectedFile);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const validateZip = (zip) => {
    return /^\d{5}$/.test(zip);
  };

  const analyzeQuote = async () => {
    if (!file) return;
    if (!validateZip(zipCode)) {
      setZipError('Please enter a valid 5-digit US zip code.');
      return;
    }
    setZipError('');
    setIsSubmitting(true);
    setAnalysisResult(null);
    setShowConfetti(false);
    try {
      // Upload file and extract text
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });
      if (!uploadResponse.ok) {
        throw new Error('File upload failed');
      }
      const { text: quoteText, fileUrl, fileName } = await uploadResponse.json();
      if (!quoteText || quoteText.trim().length < 10) {
        alert('Could not extract enough text from the file. Please try a clearer image or PDF.');
        return;
      }
      // Analyze with AI
      const analysisResponse = await fetch('/api/analyze-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteText,
          email: email.trim() ? email : undefined,
          zipCode,
          specificQuestions,
          fileName,
          fileUrl,
        }),
      });
      if (!analysisResponse.ok) {
        throw new Error('Analysis failed');
      }
      const { analysis, message } = await analysisResponse.json();
      if (analysis && /red flag|🚩|red flag/i.test(analysis)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      }
      setAnalysisResult({
        analysis,
        message,
        email,
        fileName,
      });
    } catch (error) {
      setAnalysisResult({
        analysis: null,
        message: 'Analysis failed. Please try again.',
        email: null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysisResult(null);
    setFile(null);
    setEmail('');
    setZipCode('');
    setSpecificQuestions('');
    setZipError('');
    setCopySuccess(false);
  };

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = () => {
    if (analysisResult && analysisResult.analysis) {
      navigator.clipboard.writeText(analysisResult.analysis);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleShareEmail = () => {
    if (analysisResult && analysisResult.analysis) {
      const subject = encodeURIComponent('Check out my QuoteWTF analysis!');
      const body = encodeURIComponent(analysisResult.analysis);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    }
  };

  const handleShareTwitter = () => {
    if (analysisResult && analysisResult.analysis) {
      const text = encodeURIComponent('Check out my savage QuoteWTF analysis!\n\n' + analysisResult.analysis.substring(0, 200) + '...');
      window.open(`https://twitter.com/intent/tweet?text=${text}`);
    }
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center">
          <ConfettiAnimation />
        </div>
      )}
      {/* Animated background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', 
          backgroundSize: '32px 32px',
        }}></div>
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <span className="inline-block text-orange-600 font-medium mb-6 py-2 px-4 rounded-full bg-orange-50 border border-orange-100">
              🔥 AI-Powered Quote Analysis
            </span>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Is This Quote Legit… or Total BS?
            </h1>
            <p className="text-lg text-orange-600 font-semibold mb-2">
              Upload a contractor quote (PDF or image) and our AI will roast it — breaking down red flags, missing details, and overpriced fluff in plain English. No fluff. Just facts. Maybe some fire. 🔥
            </p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Drop your quote below to find out if you're getting a deal…<br/>or getting played. 💸
            </p>
          </div>

          {/* File Upload Section */}
          <div className="animate-fade-up mb-8" style={{ animationDelay: '0.6s' }}>
            <div 
              className={`max-w-md mx-auto p-8 border-2 border-dashed rounded-xl transition-all ${
                dragActive 
                  ? 'border-orange-400 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 mb-2">Drag & drop your quote here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label className="cursor-pointer bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
                    Choose File
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileInput}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-900 font-medium mb-2">{file.name}</p>
                  <p className="text-sm text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button 
                    onClick={() => setFile(null)}
                    className="text-orange-600 hover:text-orange-700 text-sm"
                  >
                    Choose different file
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Form */}
          {file && (
            <div className="animate-fade-up mb-8" style={{ animationDelay: '0.7s' }}>
              <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Your Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 90210"
                      required
                      maxLength={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {zipError && <p className="text-xs text-red-600 mt-1">{zipError}</p>}
                    <p className="text-xs text-gray-500 mt-1">We use your zip code for more accurate, local analysis.</p>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com (for a copy)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send your analysis here if you want a copy.</p>
                  </div>
                  <div>
                    <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-2">
                      Any specific questions? (Optional)
                    </label>
                    <textarea
                      id="questions"
                      value={specificQuestions}
                      onChange={(e) => setSpecificQuestions(e.target.value)}
                      placeholder="e.g., Is this price fair? What should I ask the contractor? Any red flags?"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll address these in your analysis</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={analyzeQuote}
              disabled={!file || !validateZip(zipCode) || isSubmitting}
              className="group bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-700 transition transform hover:scale-105 hover:shadow-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Roasting...
                </span>
              ) : (
                <span className="relative z-10">Roast My Quote 🔥</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
            <button 
              onClick={scrollToWaitlist}
              className="text-gray-600 px-8 py-4 rounded-full text-lg font-medium hover:text-gray-900 transition flex items-center group"
            >
              Subscribe <span role="img" aria-label="mail">📬</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Analysis Results Section */}
          {analysisResult && (
            <div className="max-w-2xl mx-auto mt-12 animate-fade-up">
              <div className="bg-white border border-orange-200 rounded-2xl shadow-lg p-8 text-left relative">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Your QuoteWTF Analysis <span role="img" aria-label="magnifier">🔎</span></h3>
                {analysisResult.message && (
                  <div className="mb-4 text-green-700 font-medium">{analysisResult.message}</div>
                )}
                {analysisResult.analysis ? (
                  <>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <button onClick={handleCopy} className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
                        📋 Copy
                      </button>
                      <button onClick={handleShareEmail} className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
                        ✉️ Email
                      </button>
                      <button onClick={handleShareTwitter} className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
                        🐦 Share
                      </button>
                      {copySuccess && <span className="text-green-600 font-semibold ml-2">Copied!</span>}
                    </div>
                    <div className="mb-4 prose prose-orange max-w-none" dangerouslySetInnerHTML={{ __html: highlightSections(analysisResult.analysis) }} />
                  </>
                ) : (
                  <div className="text-red-600">Analysis failed. Please try again.</div>
                )}
                <button
                  onClick={clearAnalysis}
                  className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition font-medium"
                >
                  Roast Another Quote 🔥
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Simple confetti animation component
function ConfettiAnimation() {
  return (
    <div className="pointer-events-none w-full h-64 flex items-center justify-center">
      {/* You can replace this with a real confetti library for production */}
      <span style={{ fontSize: 48, animation: 'bounce 1s infinite' }}>🎉🎊🚩</span>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}