const nodemailer = require('nodemailer');

const sendContactEmails = async ({ name, email, message }) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || 'ankitghanghas29@gmail.com';

  if (!emailUser || !emailPass || emailUser.includes('your_email') || emailPass.includes('your_app_password')) {
    console.log('⚠️ Nodemailer credentials are not configured. Message saved in DB. Skipping email notifications.');
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for others
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Premium styled HTML for admin notification email
  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center; color: #ffffff; }
          .header h2 { margin: 0; font-size: 24px; font-weight: 700; }
          .header p { margin: 5px 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 6px; }
          .value { font-size: 15px; color: #0f172a; line-height: 1.5; background-color: #f1f5f9; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .message-box { font-size: 15px; color: #0f172a; line-height: 1.6; background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; white-space: pre-line; }
          .footer { background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Inquiry</h2>
            <p>From Ankit's Portfolio Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value"><strong>${name}</strong></div>
            </div>
            <div class="field">
              <div class="label">Sender Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>This inquiry was sent automatically from your website portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Premium styled HTML for client auto-reply email
  const replyHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px; text-align: center; color: #ffffff; border-bottom: 4px solid #3b82f6; }
          .header h2 { margin: 0; font-size: 24px; font-weight: 700; }
          .content { padding: 30px; font-size: 15px; line-height: 1.6; color: #334155; }
          .highlight { background-color: #f8fafc; border-left: 4px solid #8b5cf6; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #475569; }
          .signature { margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px; }
          .signature-name { font-weight: 700; color: #0f172a; font-size: 16px; }
          .signature-title { color: #64748b; font-size: 13px; margin-top: 2px; }
          .footer { background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Reaching Out!</h2>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for visiting my portfolio and sending a message! I appreciate you taking the time to connect.</p>
            <p>I have received your inquiry and will review it shortly. You can expect a response from me within <strong>24 to 48 hours</strong>.</p>
            <p>Here is a copy of your message for reference:</p>
            <div class="highlight">
              "${message}"
            </div>
            <p>Have a wonderful day!</p>
            <div class="signature">
              <div class="signature-name">Ankit</div>
              <div class="signature-title">Full Stack Developer</div>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Ankit. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // 1. Send notification email to admin
    await transporter.sendMail({
      from: `"${name} (Portfolio Inquiry)" <${emailUser}>`,
      to: adminEmail,
      subject: `📧 Portfolio Contact: ${name}`,
      html: adminHtml,
      replyTo: email,
    });
    console.log('✉️ Contact notification email sent to admin successfully.');

    // 2. Send automatic confirmation reply to client
    await transporter.sendMail({
      from: `"Ankit" <${emailUser}>`,
      to: email,
      subject: `Received: Your message from Ankit's Portfolio`,
      html: replyHtml,
    });
    console.log('✉️ Automated confirmation reply email sent to client successfully.');

  } catch (error) {
    console.error('❌ Error sending email notifications via Nodemailer:', error);
  }
};

module.exports = sendContactEmails;
