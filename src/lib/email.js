import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAnalysisEmail(email, analysis, fileName) {
  try {
    const { error } = await resend.emails.send({
      from: 'QuoteWTF <noreply@quotewtf.com>',
      to: [email],
      subject: `🔥 Your QuoteWTF Analysis: ${fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🔥 QuoteWTF Analysis</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your savage contractor quote analysis is ready!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #374151; margin-top: 0;">Analysis for: ${fileName}</h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6;">
              ${analysis}
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #92400e;">
                <strong>💡 Pro Tip:</strong> Always get at least 3 quotes before making a decision. QuoteWTF helps you spot the BS so you can negotiate better!
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://quotewtf.vercel.app" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Analyze Another Quote
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>Thanks for using QuoteWTF! 🚀</p>
            <p>Questions? Reply to this email or visit <a href="https://quotewtf.vercel.app" style="color: #f97316;">quotewtf.vercel.app</a></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
} 