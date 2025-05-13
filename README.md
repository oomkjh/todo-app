# 📝 Todo App – Next.js + TailwindCSS + API Proxy

A simple yet complete Todo list app built with:

- **Next.js** for frontend and API proxying
- **Tailwind CSS** for styling
- **Axios** for API requests
- **Next.js API Routes** as a proxy to bypass CORS
- Full **CRUD** support (Create, Read, Update, Delete)

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
npm run dev
Open http://localhost:3000 in your browser.

.
├── pages/
│   └── api/
│       ├── todo.ts         # Proxy for GET and POST
│       └── todo/[id].ts    # Proxy for PATCH and DELETE
├───app/
    └── page.tsx            # Main UI with Todo functionality
├── styles/
│   └── globals.css         # Tailwind base styles
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── README.md               # This file 
```