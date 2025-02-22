import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    token: string;
    last_name: string;
  }

  interface Session {
    token?: string;
    user: {
      token?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
  }
}
