import { authLogin } from '@/http/generated/api';
import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
          console.log('Missing email or password');
          return null;
        }

        try {
          const response = await authLogin({
            email: credentials.email,
            password: credentials.password,
          });

          console.log('API Response:', response);

          if (!response?.data?.user || !response?.data?.token) {
            throw new Error(response.error);
          }

          return {
            id: response.data.user.id,
            name: response.data.user.name,
            last_name: response.data.user.last_name,
            email: response.data.user.email,
            token: String(response.data.token),
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          throw new Error(error.message);
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
        (session.user as any).token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/entrar',
    error: '/error',
  },
};
