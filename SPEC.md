# Getting-to-Know-You Bingo Card Generator – Specification

**Version 1.0 | Date: 2026-11-10**

## 1. Overview

A web application that generates customizable bingo cards for icebreaker events, team-building activities, and social gatherings. Users input questions or statements about getting to know each other, and the app generates printable bingo cards with the content distributed across a 5×5 grid, with 2 cards per standard A4 page.

### Purpose

- Enable quick creation of bingo cards for social/team events
- Support customizable content tailored to specific groups or occasions
- Produce print-ready PDF output optimized for A4 paper

## 2. Core Features

### 2.1 Question Input

- User can input 25 unique questions/statements (one per bingo cell)
- Text input accepts questions like "Has traveled to 5+ countries", "Speaks more than 2 languages", etc.
- Textarea or list-based input interface
- Optional: suggested question templates for common scenarios (icebreaker, workplace, trivia, etc.)

### 2.2 Bingo Card Generation

- Creates a 5×5 grid (25 cells total) with the provided questions
- Center cell marked as "FREE" (standard bingo rules)
- Randomly shuffles questions across multiple card variations
- User can generate multiple unique card variations for the same question set

### 2.3 Printable Output

- Generates PDF with exactly 2 bingo cards per standard A4 page (8.5" × 11" or 210mm × 297mm)
- Cards sized appropriately for comfortable reading and marking
- Clean, professional layout with clear cell borders
- Optional: include card numbering/headers
- Optional: include answer key or question list on separate page

### 2.4 Additional Features (Optional)

- Download as PDF or preview before printing
- Adjust card size/scaling
- Customize card styling (colors, fonts, borders)
- Save/load question sets for reuse

## 3. User Interface

### 3.1 Main Workflow

1. **Input Page:** User enters or pastes 25 questions/statements
2. **Options Page (optional):** Configure layout, styling, number of cards
3. **Preview:** View sample card(s) before generating PDF
4. **Download:** Generate and download PDF

### 3.2 Interface Components

| Component | Description | Behavior |
|-----------|-------------|----------|
| Question Input Area | Textarea or numbered list for entering questions | Accept 25 items; show count; validate no duplicates |
| Preview Button | Shows sample card(s) in current layout | Display on-page or in modal |
| Generate PDF Button | Creates PDF with 2 cards per page | Trigger download; show progress if needed |
| Layout Options | Number of cards, page orientation, card size | Dropdowns/sliders; preview updates live |

## 4. Technical Requirements

### 4.1 Technology Stack

- **Frontend:** React, Vue, or vanilla JavaScript (client-side preferred to avoid server costs)
- **PDF Generation:** pdf-lib, jsPDF, or similar JavaScript library
- **Styling:** CSS or Tailwind CSS
- **Hosting:** Static hosting (Vercel, Netlify, GitHub Pages) if client-side only

### 4.2 Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile support (responsive, but primary use is desktop)

### 4.3 Data Handling

- All processing client-side (no backend required initially)
- Local storage for saving question sets (optional)
- No user data sent to external servers

### 4.4 PDF Output Specifications

- Page size: A4 (210mm × 297mm or 8.5" × 11")
- Page orientation: Portrait
- Margins: 0.5" (12.7mm) on all sides
- 2 cards per page, stacked vertically or side-by-side
- Card size: Approximately 3.5" × 3.5" (if 2 stacked); or 3" × 4.5" (if side-by-side)
- Text size: Readable at printed size (approx 10-12pt)
- Format: PDF 1.4+ (standard compatibility)

## 5. Output Specifications

### 5.1 Card Layout

- **Grid:** 5×5 cells
- **Center Cell:** "FREE" (pre-filled)
- **Cell Borders:** Clear 1-2pt black lines
- **Text Alignment:** Centered, wrapping if needed
- **Font:** Sans-serif (Arial, Helvetica, or system default)
- **Font Size:** Adjust based on text length (8-12pt range)

### 5.2 Page Layout (2 Cards per A4)

- Option A: Cards stacked vertically (one per half of page)
- Option B: Cards side-by-side (landscape or rotated)
- Adequate spacing between cards
- Margins maintained for printer safety

### 5.3 Optional Elements

- Header with title or event name
- Card number (Card 1, Card 2, etc.)
- Blank space for player name/initials
- Instructions at bottom of page

## 6. User Workflow

### 6.1 Basic Flow

1. User opens the web app
2. Pastes or types 25 questions into the input area
3. Clicks "Preview" to see a sample card
4. Optionally adjusts layout settings (card size, number of copies, etc.)
5. Clicks "Generate PDF" to create the file
6. Downloads PDF and prints

### 6.2 Alternative: Using Templates

1. User selects a template category (e.g., "Office Icebreaker")
2. App populates with 25 suggested questions
3. User edits any questions as desired
4. Proceeds to preview and PDF generation

### 6.3 Reusing Question Sets

1. User saves current question set (e.g., "Team Event 2026")
2. Next time, loads the saved set from localStorage
3. Can generate new card variations with same questions

## 7. Success Criteria

- User can input 25 questions in under 2 minutes
- PDF generates within 3-5 seconds
- Printed output is clear and professional
- 2 cards fit perfectly on A4 page with proper margins
- No external dependencies required (client-side only)
- Works on Chrome, Firefox, Safari, and Edge
- Supports both desktop and tablet input

## 8. Future Enhancements

- Cloud save/sync via account login
- Shareable links for question sets
- Team collaboration (multiple users editing same card set)
- Batch PDF generation (50+ cards)
- Image/emoji support in cells
- Custom branding/logo on cards
- Bingo game tracker (web-based card marking)
