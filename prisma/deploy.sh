#!/bin/bash

# Script to handle Prisma migrations and deployment

# Determine environment (development or production)
ENVIRONMENT=${1:-development}

if [ "$ENVIRONMENT" = "production" ]; then
  echo "Running in production mode..."
  
  # Use production database URL
  export DATABASE_URL="postgresql://username:password@your-production-host:5432/zooquest?schema=public"
else
  echo "Running in development mode..."
  
  # Use local database URL from .env
  source .env
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate dev --name init

echo "Deployment complete!"