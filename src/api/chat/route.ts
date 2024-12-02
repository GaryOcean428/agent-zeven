import { perplexityClient } from '../../lib/api/perplexity-client';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    return await perplexityClient.chat(messages);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }), 
      { status: 500 }
    );
  }
} 