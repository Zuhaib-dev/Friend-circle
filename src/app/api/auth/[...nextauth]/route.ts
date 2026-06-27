import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await User.findOne({ email: credentials.email, authProvider: 'credentials' });

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (user.isSuspended) {
          throw new Error('Your account has been suspended by an administrator');
        }

        if (!user.isVerified) {
          throw new Error('Please verify your email first');
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password as string);

        if (!isPasswordMatch) {
          throw new Error('Incorrect password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email, role: user.role, teamMemberStatus: user.teamMemberStatus,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        await connectToDatabase();
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser && existingUser.isSuspended) {
            return "/login?error=AccessDenied";
          }

          if (!existingUser) {
            await User.create({
              name: user.name || "Unknown",
              email: user.email || "", role: user.role, teamMemberStatus: user.teamMemberStatus,
              image: user.image || undefined,
              isVerified: true, // Google users are pre-verified
              authProvider: 'google',
            });
          }
          return true;
        } catch (error) {
          console.error('Error saving Google user', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.picture = session.image;
      }
      if (user) {
        token.id = user.id;
      }
      // Fetch latest role and status from DB to ensure session is up to date
      await connectToDatabase();

      // Google OAuth IDs are long numeric strings — not valid MongoDB ObjectIds.
      // Only use findById when token.id looks like a real 24-char hex ObjectId.
      const isObjectId = typeof token.id === 'string' && /^[a-f\d]{24}$/i.test(token.id);

      const dbUser = isObjectId
        ? await User.findById(token.id)
        : await User.findOne({ email: token.email });
        
      if (dbUser) {
        token.id = dbUser._id.toString();
        token.role = dbUser.role;
        token.teamMemberStatus = dbUser.teamMemberStatus;
        token.name = dbUser.name;
        token.picture = dbUser.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).teamMemberStatus = token.teamMemberStatus;
        if (token.name) session.user.name = token.name;
        if (token.picture) session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // We will create this page later
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
