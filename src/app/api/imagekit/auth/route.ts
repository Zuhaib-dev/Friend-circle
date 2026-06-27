import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : error;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();

    return NextResponse.json({
      ...authenticationParameters,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY
    }, { status: 200 });
  } catch (error: unknown) {
    console.error('ImageKit Auth error:', errorMessage(error));
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
