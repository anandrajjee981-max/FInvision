# 💸 OCR-Based Expense Tracker

A modern **expense tracking web app** that lets users **scan bills using OCR**, automatically extract data, and visualize spending through interactive charts.

---

## 🚀 Features

* 📸 **Scan Receipts (OCR)**

  * Upload bill images
  * Extract text using Tesseract.js
  * Auto-detect totals, tax, and items

* ✍️ **Manual Expense Entry**

  * Add expense with category
  * Clean validation for inputs

* 📊 **Analytics Dashboard**

  * View spending by category
  * Last 10 / 20 / 30 days filtering
  * Interactive charts using Recharts

* 🧾 **Transaction History**

  * Filter by category
  * Dynamic category generation
  * Delete entries

* 🎯 **Daily Target Tracking**

  * Set expense goal
  * Auto reset every day

* 💾 **Local Storage Persistence**

  * Data saved in browser
  * No backend required

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **State Management:** Context API
* **OCR Engine:** Tesseract.js
* **Charts:** Recharts
* **Styling:** Tailwind CSS
* **Routing:** React Router

---

## 🧠 How It Works

### 1. OCR Processing

* User uploads receipt image
* Image is preprocessed (grayscale + contrast)
* Tesseract extracts raw text

### 2. Data Parsing

* Text split into lines
* Regex used to detect:

  * Total
  * Tax
  * Subtotal
* Structured object created

### 3. Storage

* Data stored in localStorage
* Synced with React state

### 4. Visualization

* Expenses grouped by category
* Chart data generated dynamically

---

## 📂 Folder Structure

```
src/
│
├── components/
│   ├── Addexpense.jsx
│   ├── History.jsx
│   ├── Dashboard.jsx
│   └── Billchart.jsx
│
├── context/
│   └── UserContext.jsx
│
├── utils/
│   └── Ocr.jsx
│
└── App.jsx
```

---



## 📈 Future Improvements

* 🔐 User authentication (login/signup)
* ☁️ Cloud storage (MongoDB / Firebase)
* 🤖 AI-based category detection
* 📅 Monthly & yearly insights
* 📱 PWA support

---

## 🧪 Challenges Faced

* OCR inaccuracies with low-quality images
* Parsing unstructured bill data
* Handling inconsistent formats
* Optimizing chart updates

---

## 💡 Learnings

* Real-world OCR integration
* Regex-based data extraction
* State + persistence handling
* Data visualization techniques

---



## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

This project is open-source and free to use.

---

## 👨‍💻 Author

**Anand Raj**

---

⭐ If you like this project, consider giving it a star!
