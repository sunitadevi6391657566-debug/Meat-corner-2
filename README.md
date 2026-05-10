
# Meat Corner – Trace & Fresh

यह एक आधुनिक "Live Video Marketplace" ऐप है जिसे Next.js, Firebase और Genkit AI का उपयोग करके बनाया गया है।

## GitHub पर पूरा फोल्डर कैसे अपलोड करें?

अगर आप ब्राउज़र में एक-एक करके फाइल अपलोड कर रहे हैं, तो `src` फोल्डर अपलोड नहीं होगा क्योंकि ब्राउज़र फोल्डर्स को सही से नहीं पढ़ पाता। सही तरीका यह है:

### तरीका 1: GitHub Desktop (सबसे आसान और सुरक्षित)
1. [GitHub Desktop](https://desktop.github.com/) डाउनलोड और इंस्टॉल करें।
2. ऐप में लॉगिन करें और "Create New Repository" चुनें।
3. **Path** में अपने प्रोजेक्ट का फोल्डर चुनें (जहाँ आपने Zip फाइल खोली है)।
4. "Publish Repository" पर क्लिक करें। इससे `src` सहित सभी फाइलें एक बार में आपके GitHub पर चली जाएँगी।

### तरीका 2: Git CLI (कमांड लाइन)
अपने प्रोजेक्ट फोल्डर के अंदर टर्मिनल खोलें और ये कमांड चलाएँ:
```bash
git init
git add .
git commit -m "Complete project structure"
git remote add origin https://github.com/आपका-नाम/रिपॉजिटरी-नाम.git
git branch -M main
git push -u origin main
```

## इसे लाइव (Live) कैसे करें?

GitHub पर कोड डालने के बाद:
1. [Vercel](https://vercel.com/) पर जाएँ।
2. "Add New Project" पर क्लिक करें और अपना GitHub रिपॉजिटरी चुनें।
3. **Environment Variables** में `GOOGLE_GENAI_API_KEY` जोड़ें (अपनी Gemini API Key डालें)।
4. "Deploy" पर क्लिक करें।

## लोकल डेवलपमेंट (Local Development)
```bash
npm install
npm run dev
```
ऐप अब `localhost:9002` पर उपलब्ध होगा।
