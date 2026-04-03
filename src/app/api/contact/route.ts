import { NextRequest, NextResponse } from 'next/server';

const DRUPAL_URL = process.env.DRUPAL_BASE_URL || process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${DRUPAL_URL}/webform_rest/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const text = await response.text();
      console.error('Drupal webform error:', response.status, text);
      return NextResponse.json({ error: 'Submission failed' }, { status: response.status });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
