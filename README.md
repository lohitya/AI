# Customer Feedback Summarizer with Google Apps Script and Vertex AI

This project automates summarizing customer feedback collected via Google Forms using Google's Vertex AI (Gemini) and Google Apps Script.

---

## About This Project

This demo project was inspired by helping a friend who runs a small salon. She was a nail art student collecting customer feedback on paper forms, then typing them up to send to her professor. 

I wanted to streamline this process and make it more useful for real-world business owners. So I designed a simple automation:

- Customers fill out 3–4 feedback questions via a Google Form.
- Responses go to Google Sheets.
- A Google Apps Script processes the feedback weekly, generates a professional summary using Google Vertex AI (Gemini), and emails it to the owner.

This gives small business owners clear, actionable insights about their store performance—without the manual work.

---

## Features
- Collects feedback automatically via Google Forms.
- Uses Vertex AI Gemini model to generate:
  - Positive feedback themes
  - Suggested improvements
  - Overall sentiment
  - Actionable recommendations
- Appends AI-generated summary to a "Summaries" sheet.
- Emails weekly summary to the business owner automatically.

---

## Tools Used
- Google Forms
- Google Sheets
- Google Apps Script
- Gemini API
- Gmail

---

## How It Works
1. Customers fill out a Google Form.
2. Responses populate a Google Sheet.
3. Apps Script reads new entries, combines them into a prompt.
4. Calls the Gemini API to generate a professional summary.
5. Saves the summary in a "Summaries" sheet and sends an email weekly.

---

## How to Run
- Make a copy of the Google Sheet and connect your Form.
- Add the Apps Script code.
- Enable Gmail and Vertex AI APIs.
- Add time-based triggers in Apps Script to send weekly emails.

---

## Author
Lohitya Sethuraman
