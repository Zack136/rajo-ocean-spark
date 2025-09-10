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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: OrderEmailRequest = await req.json();

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Service Request</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            font-family: 'Arial', sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
            padding: 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .header-banner {
            width: 100%;
            height: 200px;
            object-fit: cover;
            opacity: 0.9;
          }
          .header-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
            z-index: 10;
          }
          .header h1 {
            margin: 0;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
          .content {
            padding: 2rem;
          }
          .title {
            color: #1e40af;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          .data-table th,
          .data-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          .data-table th {
            background-color: #f1f5f9;
            color: #475569;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
          }
          .data-table tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .data-table tr:hover {
            background-color: #e0f2fe;
          }
          .message-cell {
            max-width: 300px;
            word-wrap: break-word;
            line-height: 1.5;
          }
          .footer {
            background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 2rem;
          }
          .footer h3 {
            margin: 0 0 1rem 0;
            font-size: 1.25rem;
          }
          .social-icons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
          }
          .social-icon {
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: white;
            transition: background-color 0.3s;
          }
          .social-icon:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-content">
              <h1>📩 New Service Request</h1>
            </div>
          </div>
          
          <div class="content">
            <div class="title">Service Request Details</div>
            
            <table class="data-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>👤 Full Name</strong></td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td><strong>📧 Email Address</strong></td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td><strong>📞 Phone Number</strong></td>
                  <td>${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td><strong>🛠️ Service Requested</strong></td>
                  <td>${service || 'Not specified'}</td>
                </tr>
                <tr>
                  <td><strong>💬 Project Details</strong></td>
                  <td class="message-cell">${message}</td>
                </tr>
                <tr>
                  <td><strong>📅 Submitted At</strong></td>
                  <td>${new Date().toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            <h3>Rajo Ocean Spark</h3>
            <p>Delivering Innovative Solutions</p>
            <div class="social-icons">
              <a href="#" class="social-icon">📘</a>
              <a href="#" class="social-icon">📷</a>
              <a href="#" class="social-icon">🐦</a>
              <a href="#" class="social-icon">💼</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending service request email to info.rajosolutions@gmail.com");

    const emailResponse = await resend.emails.send({
      from: "Rajo Solutions <onboarding@resend.dev>",
      to: ["info.rajosolutions@gmail.com"],
      subject: `📩 New Service Request from ${name}`,
      html: emailHTML,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
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