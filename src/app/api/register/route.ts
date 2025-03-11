import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

// This is a placeholder for your database connection
// You would replace this with your actual database logic
// For example, using Prisma, Mongoose, etc.
const saveUserToDatabase = async (userData: any) => {
  // Mock implementation - replace with actual database operations
  console.log('Saving user to database:', userData);
  return { id: 'user_123', ...userData };
};

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, email, password } = body;

    // Validate the input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email is already in use
    // This would be an actual database query in a real application
    // const existingUser = await YourDatabaseModel.findOne({ email });
    const existingUser = false; // Mock check - replace with actual database query

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Save the user to the database
    const user = await saveUserToDatabase({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Return success response
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}