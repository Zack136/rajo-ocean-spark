import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

const generateEmailHTML = (data: OrderEmailRequest) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Request - Rajo Ocean Spark</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #e0f7ff 0%, #ffffff 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(14, 165, 233, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
      padding: 0;
      position: relative;
      height: 200px;
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
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><defs><linearGradient id="wave" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgba(255,255,255,0.2)"/><stop offset="50%" style="stop-color:rgba(255,255,255,0.1)"/><stop offset="100%" style="stop-color:rgba(255,255,255,0.2)"/></linearGradient></defs><path d="M0,100 C300,150 600,50 1200,100 L1200,0 L0,0 Z" fill="url(%23wave)"/><circle cx="200" cy="80" r="3" fill="rgba(255,255,255,0.6)"><animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite"/></circle><circle cx="400" cy="60" r="2" fill="rgba(255,255,255,0.4)"><animate attributeName="r" values="2;6;2" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="600" cy="90" r="4" fill="rgba(255,255,255,0.5)"><animate attributeName="r" values="4;9;4" dur="2.5s" repeatCount="indefinite"/></circle></svg>') center/cover;
      opacity: 0.8;
    }
    .logo {
      position: relative;
      z-index: 2;
      color: white;
      text-align: center;
    }
    .logo h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .logo p {
      margin: 5px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px;
    }
    .title {
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 20px 0;
      text-align: center;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
    }
    .data-table th {
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .data-table td {
      padding: 15px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }
    .data-table tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .data-table tr:nth-child(odd) td {
      background-color: #ffffff;
    }
    .field-label {
      font-weight: 600;
      color: #334155;
      width: 30%;
    }
    .field-value {
      color: #64748b;
      word-break: break-word;
    }
    .footer {
      background: #f8fafc;
      padding: 25px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer-brand {
      font-size: 18px;
      font-weight: 700;
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    .footer-tagline {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .social-icons {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 15px;
    }
    .social-icon {
      width: 35px;
      height: 35px;
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      font-size: 16px;
      transition: transform 0.2s ease;
    }
    .social-icon:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <h1>Rajo Ocean Spark</h1>
        <p>Delivering Innovative Solutions</p>
      </div>
    </div>
    
    <div class="content">
      <h2 class="title">📩 New Service Request</h2>
      
      <table class="data-table">
        <thead>
          <tr>
            <th colspan="2">Customer Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="field-label">Full Name</td>
            <td class="field-value">${data.name}</td>
          </tr>
          <tr>
            <td class="field-label">Email Address</td>
            <td class="field-value">${data.email}</td>
          </tr>
          <tr>
            <td class="field-label">Phone Number</td>
            <td class="field-value">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="field-label">Service Requested</td>
            <td class="field-value">${data.service || 'Not specified'}</td>
          </tr>
          <tr>
            <td class="field-label">Project Details</td>
            <td class="field-value">${data.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <div class="footer-brand">Rajo Ocean Spark</div>
      <div class="footer-tagline">Delivering Innovative Solutions</div>
      
      <div class="social-icons">
        <a href="#" class="social-icon">📧</a>
        <a href="#" class="social-icon">📱</a>
        <a href="#" class="social-icon">🌐</a>
        <a href="#" class="social-icon">💼</a>
      </div>
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
    const orderData: OrderEmailRequest = await req.json();

    // Send email to info.rajosolutions@gmail.com
    const emailResponse = await resend.emails.send({
      from: "Rajo Ocean Spark <onboarding@resend.dev>",
      to: ["info.rajosolutions@gmail.com"],
      subject: "🌊 New Service Request - Rajo Ocean Spark",
      html: generateEmailHTML(orderData),
    });

    console.log("Order email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
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