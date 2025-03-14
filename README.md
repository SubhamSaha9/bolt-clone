<h2 align="center">Bolt.Clone - A Website that make website</h2>

1. ⚙️ [Tech Stack](#tech-stack)
2. 🤸 [Quick Start](#quick-start)
3. 🕸️ [Config Files](#config-files)
4. 🚀 [More](#more)

## <a name="tech-stack">⚙️ Tech Stack</a>

- MongoDB
- Express
- React 18
- Node
- TailwindCSS
- ShadCN
- TypeScript
- Google 0Auth2

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Cloning the Repository**

```bash
git clone https://github.com/SubhamSaha9/bolt-clone.git
cd bolt-clone
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
#or
npm i
```

**Set Up Environment Variables**

Create two new file named `.env` in root and server folder of your project and add the following content:

- root

```env
VITE_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=""
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_GEMINI_API_KEY=""
```

- server

```env
MONGO_URI=""
JWT_SECRET= ""
ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

RAZORPAY_KEY=""
RAZORPAY_SECRET=""

CLOUD_NAME=""
CLOUD_API_KEY=""
CLOUD_API_SECRET=""
FOLDER_NAME="Bolt-Clone"
```

Replace the values with your actual credentials from [MongoDB](https://www.mongodb.com), [Cloudinary](https://cloudinary.com), [Gemini](https://aistudio.google.com), [Google 0Auth.2](https://console.cloud.google.com) and [Razorpay](https://razorpay.com).

**Running the Project**

```bash
npm run dev
```

Open your browser and go to `http://localhost:5173` to visit the page.

## <a name="config-files">🕸️ Config Files</a>

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

</details>
<details>
<summary><code>Constant.ts</code></summary>

```typescript
import { BadgeHelp, Settings, Wallet } from "lucide-react";

export const SideBarFooter = [
  {
    name: "Settings",
    icon: Settings,
    path: "#",
  },
  {
    name: "Help Center",
    icon: BadgeHelp,
    path: "#",
  },
  {
    name: "My Subscription",
    icon: Wallet,
    path: "/subscription",
  },
];
```

</details>
<details>
<summary><code>Colors.ts</code></summary>

```typescript
export default {
  LABEL: "#a3a3a3",
  SUBHEADING: "#d1d5db",
  BACKGROUND: "#151515",
  BLUE: "#2ba6ff",
  CHAT_BACKGROUND: "#272727",
};
```

</details>
<details>
<summary><code>Lookup.ts</code></summary>

```typescript
export default {
  SUGGSTIONS: [
    "Create ToDo App in React",
    "Create Budget Track App",
    "Create Gym Managment Portal Dashboard",
    "Create Quizz App On History",
    "Create Login Signup Screen",
  ],
  HERO_HEADING: "What do you want to build?",
  HERO_DESC: "Prompt, run, edit, and deploy full-stack web apps.",
  INPUT_PLACEHOLDER: "What you want to build?",
  SIGNIN_HEADING: "Continue With Bolt.Clone",
  SIGNIN_SUBHEADING:
    "To use Bolt you must log into an existing account or create one.",
  SIGNIn_AGREEMENT_TEXT:
    "By using Bolt, you agree to the collection of usage data for analytics.",

  DEFAULT_FILE: {
    "/public/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },
    "/App.css": {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;`,
    },
    "/tailwind.config.js": {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    },
    "/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`,
    },
  },

  DEPENDANCY: {
    axios: "^1.7.9",
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC:
    "Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.",
  PRICING_OPTIONS: [
    {
      name: "Basic",
      tokens: "50K",
      value: 50000,
      desc: "Ideal for hobbyists and casual users for light, exploratory use.",
      price: 4.99,
    },
    {
      name: "Starter",
      tokens: "120K",
      value: 120000,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 9.99,
    },
    {
      name: "Pro",
      tokens: "2.5M",
      value: 2500000,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 19.99,
    },
    {
      name: "Unlimted (License)",
      tokens: "Unlmited",
      value: 999999999,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 49.99,
    },
  ],
};
```

</details>
<details>
<summary><code>Prompt.ts</code></summary>

```typescript
import dedent from "dedent";

export default {
  CHAT_PROMPT: dedent`
  'You are a AI Assistant and experience in React Development.
  GUIDELINES:
  - Tell user what your are building
  - response less than 15 lines. 
  - Skip code examples and commentary
  - If any image link was provided then return back the image url at the end of your response'
`,

  CODE_GEN_PROMPT: dedent`
Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, 
without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
also you can use date-fns for date format and react-chartjs-2 chart, graph library

Return the response in JSON format with the following schema:
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}

Here’s the reformatted and improved version of your prompt:

Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}

this is my initial folder structure:
{
  "public": {
    "index.html": ""
  },
  "App.js": "",
  "index.js": "",
  "App.css": "",
  "package.json": ""
}

use above folder structure as reference.

Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.js": {
    "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='p-4 bg-gray-100 text-center'>\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
  }
}
  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai", "axios" ) only when it required
  
  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
  -Add Emoji icons whenever needed to give good user experinence
  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
   `,
  OLD_PROMPT: dedent`
    You are an expert frontend frontend React developer. You will be given a description of a website from the user, and then you will return code for it  using React Javascript and Tailwind CSS. Follow the instructions carefully, it is very important for my job. I will tip you $1 million if you do a good job:

- Think carefully step by step about how to recreate the UI described in the prompt.
- Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components
- Make sure to describe where everything is in the UI so the developer can recreate it and if how elements are aligned
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- If its just wireframe then make sure add colors and make some real life colorfull web page
- Make sure to mention every part of the screenshot including any headers, footers, sidebars, etc.
- Make sure to use the exact text from the screenshot.
- Make sure the website looks exactly like the screenshot described in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- Make sure to code every part of the description including any headers, footers, etc.
- Use the exact text from the description for the UI elements.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For all images, please use image placeholder from :https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
- Make sure the React app is interactive and functional by creating state when needed and having no required props
- If you use any imports from React like useState or useEffect, make sure to import them directly
- Use Javascript (.js) as the language for the React component
- Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \h-[600px]\). Make sure to use a consistent color palette.
- Use margin and padding to style the components and ensure the components are spaced out nicely
- Return the response in JSON format with the following schema:
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
} 
- DO NOT START WITH \\\jsx or \\\`typescript or \\\`javascript or \\\`tsx or \\\.`,
  CODE_GEN_IMAGE_PROMPT: dedent`:You are a professtional react developer and UI/UX designer
- based on provider wireframe image, make sure to generate similar web page
- and Depends on the description write a react and tailwindcss code 
- Make sure to add Header and Footer with proper option as metioned in wireframe if Not then add option releated to description
- for image placeholder please use 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
- Add All small details and make UI UX design more professtional
- Make sure to keep same color combination across the page
- Add Some Colors to make it more modern UI UX
- Use lucid library for icons
- Do not use any third party library
- Only give react+ tailwindcss code and do not write any text other than code
- Return the response in JSON format with the following schema:
  {
    "projectTitle": "",
    "explanation": "",
    "files": {
      "/App.js": {
        "code": ""
      },
      ...
    },
    "generatedFiles": []
  } 
`,
  DEPENDANCY: {
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  FILES: {
    "/App.css": {
      code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`,
    },
    "/tailwind.config.js": {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    },
    "/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },`,
    },
  },
};
```

</details>

## <a name="more">🚀 More</a>

For more such projects visit my [Github](https://github.com/SubhamSaha9) page.
