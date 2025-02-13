import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authLogin } from '@/http/generated/auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await authLogin({
            email: credentials.email,
            password: credentials.password,
          });

          if (
            !response?.data?.user ||
            !response?.data?.token ||
            response?.error
          ) {
            throw new Error(response.message);
          }

          return {
            id: response.data.user.id,
            name: response.data.user.name,
            last_name: response.data.user.last_name,
            email: response.data.user.email,
            token: String(response.data.token),
          };
        } catch (error: any) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            throw new Error(error.response.data.message);
          }
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/entrar',
    error: '/error',
  },
};
