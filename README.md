<div align="center">
  <img src="https://res.cloudinary.com/dbylka4xx/image/upload/v1761032015/Snappense_Logo_hvanu1.png" alt="Snappense Logo" width="600"/>
</div>

<h1 align="center">Snappense - Expense Reports for Sales Reps</h1>

<p align="center">
  A financial web app that scans receipts, transcribes voice memos, and documents daily expenses to create manager-ready reports in minutes.
</p>

## ✨ Core Features

Snappense is designed to be the fastest way for a sales rep to log expenses and get reimbursed.

* **🤖 AI Receipt Scanning**: Upload or drag-and-drop a receipt image, and the Gemini AI will automatically extract the transaction name, amount, date, category, and purpose.
* **🗣️ Voice-to-Transaction**: Simply record your expense (e.g., "Bus fare, twenty dollars, today, transportation") and the AI will parse it and fill out the form for you.
* **📸 Camera Capture**: Use your device's camera to snap a photo of a receipt directly within the app.
* **🧾 Manual & Mileage Entry**: A dedicated modal for manually logging transactions or calculating mileage-based reimbursements.
* **📈 AI Expense Analyst**: Ask "Alex," your AI analyst, questions about your spending (e.g., "How much did I spend on travel?" or "Scan for compliance risks"). It will analyze your history and provide insights.
* **📄 Export & Sync**:
    * Generate **PDF** or **CSV** reports of your transactions.
    * Sync all your expenses to a **Google Sheet** with a single click.
* **⚡ Sales Rep Presets**: Quickly log common expenses like "Parking ($5)" or "Client Coffee ($15)" with predefined buttons.
* **✅ Smart Validation**: The app validates entries to prevent future dates and warns about high amounts or missing fields (like 'Purpose') to ensure compliance.

---

## 🛠️ Tech Stack

* **Frontend**: React, Vite, TypeScript, Tailwind CSS
* **AI**: Google Gemini API (`gemini-2.5-flash`) for receipt analysis, voice transcription, and spending insights.
* **Reporting**: `jspdf` & `jspdf-autotable` for PDF generation.
* **Persistence**: `localStorage` is used to save transactions and AI credit usage on the user's device.

---

## 🚀 Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/)

1.  **Clone the repository:**
    ```sh
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your environment:**
    Create a file named `.env.local` in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the app:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.
