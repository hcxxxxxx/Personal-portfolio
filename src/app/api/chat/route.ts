import { NextRequest, NextResponse } from 'next/server';

// API 配置 - 建议将 API_KEY 移到环境变量中
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-SDYc0d98e619cef4373aa7d9cb59eeb7aa42fc7fb83SHvPv';
const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL || 'https://api.gptsapi.net';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${OPENAI_API_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || `API request failed: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

