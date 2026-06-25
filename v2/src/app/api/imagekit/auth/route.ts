import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const role = (session.user as any).role;
    
    if (role !== 'TEAM_MEMBER' && role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only Team Members and Admins can upload images' }, { status: 403 });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();

    return NextResponse.json(authenticationParameters, { status: 200 });
  } catch (error: any) {
    console.error('ImageKit Auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
