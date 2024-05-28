import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('link');

  if (!url) {
    return NextResponse.json({ data: 'No URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const audioStream = ytdl(url, { filter: 'audioonly' });

    const buffers = [];
    for await (const chunk of audioStream) {
      buffers.push(chunk);
    }
    const buffer = Buffer.concat(buffers);
    const base64Audio = buffer.toString('base64');

    return NextResponse.json({ title, base64Audio });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '오류 발생: ' + error.message });
    } else {
      return NextResponse.json({ error: '알 수 없는 오류 발생' });
    }
  }
}
