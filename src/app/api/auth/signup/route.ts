// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '@/lib/user';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    
    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user with fields that match your schema
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });
    
    // Return user without sensitive data
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        ...userWithoutPassword,
        message: 'Registration successful' 
      }, 
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Prisma error code for unique constraint violation
      return NextResponse.json(
        { error: `${error.meta?.target?.[0] || 'Username or email'} is already taken` },
        { status: 409 }
      );
    }
    
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}