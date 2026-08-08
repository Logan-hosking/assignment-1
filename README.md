# Phoneme Activity Builder

A frontend web application for creating phoneme-based classroom activities for Speech Pathology teaching.

This project was developed for Assessment 1 and focuses on frontend development, responsive design, accessibility, reusable React components, and standalone HTML activity generation.

## Features

The application includes:

- Home page with activity navigation
- Phoneme Wordle Builder
- Phoneme Word Search Builder
- Easy, Medium, and Hard difficulty settings
- Activity previews before generation
- Downloadable standalone HTML activities
- Light and dark themes
- Responsive navigation
- Keyboard-accessible controls
- Visible focus indicators
- Reusable React components

## Phoneme Wordle

The Wordle Builder allows teachers to preview and generate a phoneme-based word activity.

The current Assessment 1 version uses the phoneme word:

`/θɪn/`

English equivalent:

`thin`

The generated standalone HTML activity allows students to enter an answer, check their response, receive feedback, and reset the activity.

## Phoneme Word Search

The Word Search Builder uses a small collection of phoneme words including:

- `/θɪn/`
- `/ʃɪp/`
- `/tʃeə/`
- `/fɪʃ/`
- `/bʊk/`

Students can select cells in the generated activity and check whether their selection forms one of the target phoneme words.

The activity supports horizontal, vertical, and diagonal selections.

## Difficulty Levels

Both activity builders provide three difficulty levels:

### Easy

Provides additional instructions and hints.

### Medium

Provides reduced guidance.

### Hard

Requires the student to use phoneme or English clues with less direct assistance.

## Accessibility

Accessibility considerations include:

- Semantic HTML elements
- Form labels
- Keyboard-accessible controls
- Visible keyboard focus indicators
- Responsive layouts
- Accessible activity feedback
- Phoneme hints available through interaction and focus

## Technology

The project uses:

- Next.js
- React
- JavaScript
- Tailwind CSS
- HTML
- CSS
- Browser JavaScript APIs

## Getting Started

Install the project dependencies:

```bash
npm install