<div align="center"> <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

Snappense - AI Expense Reports for Sales Reps
Snap or speak your receipts. We turn them into a manager-ready Expense Report.

</div>

Snappense is an intelligent expense tracker built with React, TypeScript, and the Google Gemini AI. It's designed to eliminate the friction of expense reporting for busy sales representatives by using AI to capture, categorize, and analyze expenses from receipts, voice, or manual entry.

✨ Key Features
📸 AI Receipt Scanning: Upload a receipt image or use your camera to have AI automatically extract the merchant, amount, date, and category.

🗣️ AI Voice Entry: Simply record your expense ("Bus fare, twenty dollars, today") and let AI parse the details and add it to your log.

📊 AI Expense Analyst: Ask "Alex," your built-in AI analyst, questions like, "How much did I spend on travel this month?" or "Scan my report for compliance risks."

💵 Sales Rep Presets: One-click buttons to add common expenses like "Parking ($5)," "Toll ($8)," or "Client Coffee ($15)."

🛣️ Mileage Logging: A dedicated interface to log mileage by entering start/end locations and distance, with automatic rate calculation.

🧾 Smart Transaction History: View all your expenses, filtered by day, week, month, or quarter. The app flags transactions that are missing key information (like a purpose or client name) that managers look for.

📄 Manager-Ready Exports: Generate a professional PDF or CSV of your expenses, perfect for submission.

🔄 Google Sheets Sync: Connect and sync all your transactions to a Google Sheet with a single click.

🔒 Local-First Storage: All your data is saved in your browser's local storage.

📈 Usage Quota: Comes with a built-in monthly AI credit system to manage API usage.

🛠️ Tech Stack
Frontend: React (Vite)

Language: TypeScript

AI: Google Gemini

Styling: Tailwind CSS

PDF Generation: jsPDF & jspdf-autotable

🚀 Run Locally
Prerequisites: Node.js

Clone the repository:

Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:

Bash

npm install
Set your API Key:

Create a file named .env.local in the root of the project.

Add your Gemini API key to it:

GEMINI_API_KEY=YOUR_API_KEY_HERE
Run the app:

Bash

npm run dev
The app will be available at http://localhost:3000.
