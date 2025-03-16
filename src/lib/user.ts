// lib/user.ts - Update to match your exact schema

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Find user by email
export async function findUserByEmail(email: string) {
  if (!email) return null;
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });
    
    return user;
  } catch (error) {
    console.error(`Error finding user by email (${email}):`, error);
    return null;
  }
}

// Create user function matching your exact schema
export async function createUser(userData: { 
  username: string;
  email: string; 
  password: string;
}) {
  try {
    const { username, email, password } = userData;
    
    if (!username || !email || !password) {
      throw new Error('Missing required user data');
    }
    
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }
    
    // Create the user exactly matching your schema
    const user = await prisma.user.create({
      data: {
        username,
        email: email.toLowerCase().trim(),
        password: password.startsWith('$2') ? password : await bcrypt.hash(password, 10),
      },
    });
    
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update a user's profile
export async function updateUser(userId: string, data: { 
  username?: string;
  email?: string;
  password?: string;
}) {
  try {
    // If a new password is provided, hash it before storing
    let updatedData = { ...data };
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    
    return user;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    return null;
  }
}