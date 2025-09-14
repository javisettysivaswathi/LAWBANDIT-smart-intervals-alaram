
# ⏰ Smart Intervals Alarm – Fullstack App

Author: **Siva Swathi Javisetty**  

This is my own fullstack project idea. The **Smart Intervals Alarm App** lets users set a total duration, interval reminders, and custom messages. The app speaks/beeps at each interval and shows progress in real time.  

I first built the **frontend (hosted months ago)** and later implemented the **backend logic** in Node.js + Express with TypeScript. It is deployed on **Vercel**.

---

## Features

### Frontend
- Simple UI built with **HTML, CSS, and TypeScript (compiled to JS)**.
- Input total time, interval time, and custom reminder message.
- Displays **countdown timer**, progress bar, and real-time status updates.
- Supports **speech synthesis (voice reminders)** and **beep sound alerts**.
- Buttons: Start, Pause, Stop, Reset.

### Backend
- Built using **Node.js + Express + TypeScript**.
- Serves static frontend files from `FRONTEND/`.
- Exported as `default app` for Vercel serverless deployment.
- Clean `src/` folder with `index.ts` and `server.ts`.

---

## 📂 Project Structure

```

SMART-INTERVALS-ALARAM/
│
├── FRONTEND/           # HTML, CSS, and script.ts (compiled to JS)
├── src/                # Backend (TypeScript - Express server)
│   ├── index.ts        # Entry point for Vercel
│   └── server.ts       # Express app logic
├── dist/               # Build output (ignored in git)
├── .gitignore          # Ignores node\_modules, dist, .vercel
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation

````

---

## Tech Stack

- **Frontend:** HTML, CSS, TypeScript (Speech Synthesis API, DOM APIs)
- **Backend:** Node.js, Express, TypeScript
- **Build Tools:** TypeScript (`tsc`)
- **Deployment:** Vercel (Serverless functions)

---

## Setup & Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run in dev mode (TypeScript + ts-node)

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Start server from compiled `dist/`

```bash
npm start
```

---

##  Deployment to Vercel

Steps we used to deploy:

1. Added `src/index.ts` as entrypoint for Vercel.
2. Configured `server.ts` to `export default app`.
3. Added `build` script in `package.json`:

   ```json
   "scripts": {
     "dev": "ts-node src/index.ts",
     "build": "tsc",
     "start": "node dist/index.js"
   }
   ```
4. Connected repo to **Vercel CLI** (Option 2: Manual link, not GitHub import).
5. Deployed successfully → [Live App Link](https://smart-intervals-alarams.vercel.app) ✅

---

## Notes

* `.gitignore` ensures `node_modules`, `dist`, and `.vercel` are not tracked.
* Initial frontend was hosted separately; now combined as **one fullstack repo**.
* This README includes **all steps taken** for assignment clarity.

---

## Future Improvements

* Add authentication to save user’s alarm presets.
* Add notification support (desktop + mobile push).
* Add a dark/light mode for better UX.

---

 **This is my own project idea implemented fully (frontend + backend) and hosted live.**

```

