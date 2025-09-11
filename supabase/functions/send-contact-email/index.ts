import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  date: string;
}

const generateEmailHTML = (data: ContactEmailRequest) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message - Rajo Ocean Spark</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #e0f7ff 0%, #f0f9ff 50%, #ffffff 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #334155;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
    }
    
    /* Header with logo */
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%);
      padding: 0;
      position: relative;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 180"><defs><linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgba(255,255,255,0.2)"/><stop offset="50%" style="stop-color:rgba(255,255,255,0.1)"/><stop offset="100%" style="stop-color:rgba(255,255,255,0.3)"/></linearGradient></defs><path d="M0,60 C200,120 400,20 600,60 C800,100 1000,40 1200,80 L1200,0 L0,0 Z" fill="url(%23ocean)"/><circle cx="150" cy="50" r="2" fill="rgba(255,255,255,0.8)"><animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite"/></circle><circle cx="350" cy="40" r="1.5" fill="rgba(255,255,255,0.6)"><animate attributeName="r" values="1.5;5;1.5" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="550" cy="70" r="3" fill="rgba(255,255,255,0.7)"><animate attributeName="r" values="3;7;3" dur="2.2s" repeatCount="indefinite"/></circle><circle cx="750" cy="35" r="2.5" fill="rgba(255,255,255,0.5)"><animate attributeName="r" values="2.5;6.5;2.5" dur="1.9s" repeatCount="indefinite"/></circle></svg>') center/cover;
    }
    .logo {
      position: relative;
      z-index: 2;
      text-align: center;
      color: white;
    }
    .logo h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.15);
      letter-spacing: -0.5px;
    }
    .logo p {
      font-size: 16px;
      opacity: 0.95;
      font-weight: 400;
      letter-spacing: 0.5px;
    }
    
    /* Content */
    .content {
      padding: 40px 30px;
    }
    .title {
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      text-align: center;
    }
    .subtitle {
      text-align: center;
      color: #64748b;
      font-size: 16px;
      margin-bottom: 35px;
    }
    
    /* Details table */
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(14, 165, 233, 0.08);
    }
    .details-table th {
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      color: white;
      padding: 18px 20px;
      text-align: left;
      font-weight: 600;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .details-table td {
      padding: 18px 20px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 15px;
      vertical-align: top;
    }
    .details-table tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .details-table tr:nth-child(odd) td {
      background-color: #ffffff;
    }
    .details-table tr:last-child td {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #334155;
      width: 140px;
      min-width: 140px;
    }
    .field-value {
      color: #475569;
      word-break: break-word;
      line-height: 1.5;
    }
    
    /* Message styling */
    .message-content {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      font-style: italic;
      line-height: 1.6;
    }
    
    /* Footer */
    .footer {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer-brand {
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    .footer-tagline {
      color: #64748b;
      font-size: 16px;
      margin-bottom: 20px;
      font-style: italic;
    }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      body { padding: 10px; }
      .email-container { border-radius: 12px; }
      .content { padding: 30px 20px; }
      .header { height: 160px; }
      .logo h1 { font-size: 26px; }
      .title { font-size: 24px; }
      .details-table th,
      .details-table td { padding: 15px; }
      .field-label { width: 120px; min-width: 120px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">
        <h1>🌊 Rajo Ocean Spark</h1>
        <p>Delivering Innovative Solutions</p>
      </div>
    </div>
    
    <div class="content">
      <h2 class="title">📬 New Contact Message</h2>
      <p class="subtitle">You have received a new contact form submission</p>
      
      <table class="details-table">
        <thead>
          <tr>
            <th colspan="2">Contact Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="field-label">Name</td>
            <td class="field-value"><strong>${data.name}</strong></td>
          </tr>
          <tr>
            <td class="field-label">Email</td>
            <td class="field-value"><strong>${data.email}</strong></td>
          </tr>
          <tr>
            <td class="field-label">Phone</td>
            <td class="field-value">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="field-label">Service</td>
            <td class="field-value">${data.service || 'Not specified'}</td>
          </tr>
          <tr>
            <td class="field-label">Date</td>
            <td class="field-value">${data.date}</td>
          </tr>
          <tr>
            <td class="field-label">Message</td>
            <td class="field-value">
              <div class="message-content">${data.message}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <div class="footer-brand">Rajo Ocean Spark</div>
      <div class="footer-tagline">Delivering Innovative Solutions</div>
    </div>
  </div>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactEmailRequest = await req.json();
    
    console.log("Sending contact email with data:", contactData);

    // Send email to info.rajosolutions@gmail.com
    const emailResponse = await resend.emails.send({
      from: "Rajo Ocean Spark <onboarding@resend.dev>",
      to: ["info.rajosolutions@gmail.com"],
      subject: `🌊 New Contact Message from ${contactData.name}`,
      html: generateEmailHTML(contactData),
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);