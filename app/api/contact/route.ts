import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Send the form data to your webhook
    const webhookUrl = 'https://hook.us1.make.com/yyqy6vn8ysaijlm457aixb5psqofdfyz';
    
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured');
    }

    // Add timestamp and format data
    const formattedData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}