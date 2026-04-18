#!/bin/bash

# Event Management Dashboard - Setup Script
# This script helps set up the project from scratch

echo "🚀 Event Management Dashboard Setup"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your MongoDB URI and other settings"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your MongoDB URI"
echo "2. Start MongoDB (if using locally): mongod"
echo "3. Run: npm run dev"
echo "4. Open: http://localhost:3000"
echo ""
echo "📚 For more information, see:"
echo "   - GETTING_STARTED.md - Quick start guide"
echo "   - DEVELOPMENT.md - Detailed development guide"
echo "   - PROJECT_STRUCTURE.md - Project structure overview"
