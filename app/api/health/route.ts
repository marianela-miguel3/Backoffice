import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://yellow-bear-store-api.onrender.com/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Health Check Error:', error);
    return NextResponse.json(
      { error: 'Error de conexión con el servidor' },
      { status: 500 }
    );
  }
} 