// src/auth.ts

import NextAuth from 'next-auth';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { findUserByEmail } from '@/lib/user'; // Make sure this import is correct
import bcrypt from 'bcryptjs';

// Define your authentication configuration
const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request): Promise<any> { // Added request parameter
        // Add extensive logging to debug the issue
        console.log("Authorize function called with credentials:",
          credentials ? { email: credentials.email, password: '***' } : 'no credentials');

        try {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            return null;
          }

          // Properly type the email as string
          const email = credentials.email as string;
          
          // Find user
          const user = await findUserByEmail(email);
          console.log("User lookup result:", user ? "User found" : "User not found");

          if (!user) {
            console.log("User not found for email:", credentials.email);
            return null;
          }

          // Verify password - make sure user.password exists
          if (!user.password) {
            console.log("User has no password hash stored");
            return null;
          }

          // Compare password with proper typing
          const password = credentials.password as string;
          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log("Password validation result:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          // Return user object that matches the User type expected by NextAuth
          return {
            id: user.id,
            name: user.username || "User",
            email: user.email
            // image: user.image // Optional, include if your user model has it
          };
        } catch (error) {
          console.error("Error in authorize callback:", error);
          // Return null instead of throwing error for better NextAuth handling
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    newUser: '/auth/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/widgets');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login page
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      // If user is provided, add it to the token
      if (user) {
        token.id = user.id;
        token.name = user.name; // This will be the username from authorize
        token.email = user.email;
        // Optionally store username separately if needed
        token.username = user.name; // In this case, user.name is already the username
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session from token
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string; // This will be the username
        // Optionally add username as a separate property if needed
        (session.user as any).username = token.username as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);