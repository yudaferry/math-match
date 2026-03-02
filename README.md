# Math Match

A minimal, tool-like web application for children ages 4–12 to practice basic arithmetic operations. Built with love to help my daughter learn basic math calculation.

## About

This app was created based on the structure and methodology from private math tutoring materials. It provides focused arithmetic practice without distractions — no accounts, no scores, no levels.

## Features

- **Customizable Practice Sessions**: Choose operations (Addition, Subtraction, Multiplication, Division)
- **Flexible Number Ranges**: Set minimum and maximum numbers (0–999)
- **Smart Validation**: Option to allow/disallow negative results and division remainders
- **Timer Modes**: Stopwatch, countdown per question, or total session timer
- **Responsive Design**: Works on smartphones, tablets, and desktops
- **Offline Support**: PWA functionality for practice anywhere

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI**: React 19

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Configure your practice session (operations, question count, number range, timer)
2. Answer questions one by one using the on-screen numpad
3. Review your results at the end of the session
4. Start a new session or adjust configuration

## Project Structure

```
src/
├── app/          # Next.js app directory (pages & layout)
├── lib/          # Utility functions and types
│   ├── generate.ts   # Question generation logic
│   └── types.ts      # TypeScript type definitions
```

## Language

Interface is in **Indonesian (Bahasa Indonesia)** to match the original learning materials.
