import { Resend } from 'resend'

const resendApiKey = import.meta.env.RESEND_API_KEY

// Only initialize Resend if API key is available (runtime only)
export const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function sendWelcomeEmail(email) {
  if (!resend) {
    console.error('Resend is not initialized - missing RESEND_API_KEY')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const data = await resend.emails.send({
      from: 'BioRunway <hello@biorunway.com>',
      to: [email],
      subject: 'Welcome to BioRunway Newsletter',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #371a1e; margin-bottom: 20px;">Welcome to BioRunway!</h1>
          <p style="color: #66353d; line-height: 1.6; margin-bottom: 16px;">
            Thank you for subscribing to our newsletter. We're excited to have you join our community 
            exploring the intersection of biotechnology and fashion.
          </p>
          <p style="color: #66353d; line-height: 1.6; margin-bottom: 16px;">
            You'll receive updates on:
          </p>
          <ul style="color: #66353d; line-height: 1.6; margin-bottom: 20px;">
            <li>Latest biotech fashion innovations</li>
            <li>Sustainability research and insights</li>
            <li>Investment opportunities in the space</li>
            <li>Deep-dive articles from industry experts</li>
          </ul>
          <p style="color: #66353d; line-height: 1.6;">
            Best regards,<br>
            The BioRunway Team
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0dbdb; font-size: 14px; color: #a5555b;">
            <p>
              If you didn't sign up for this newsletter, you can safely ignore this email.
            </p>
          </div>
        </div>
      `,
      text: `
Welcome to BioRunway!

Thank you for subscribing to our newsletter. We're excited to have you join our community exploring the intersection of biotechnology and fashion.

You'll receive updates on:
- Latest biotech fashion innovations
- Sustainability research and insights
- Investment opportunities in the space
- Deep-dive articles from industry experts

Best regards,
The BioRunway Team

If you didn't sign up for this newsletter, you can safely ignore this email.
      `.trim()
    })

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error: error.message }
  }
}