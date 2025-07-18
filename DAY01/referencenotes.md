# 🧠 **Day 1 - MERN Stack Training: Foundational Concepts**

## 🌐 1. **Internet**

- The **Internet** is a global network of computers that communicate using the **TCP/IP protocol**.
- It allows sharing of information (websites, emails, files, etc.) across the world.
- Invented originally for **military use (ARPANET)** and evolved into the commercial and public internet.

**Key Concepts**:

- **IP Address**: Unique number assigned to each device.
- **Packets**: Data is broken into small units called packets.
- **ISP**: Internet Service Provider connects users to the internet.

---

## 🌐 2. **Network – Public vs Private**

- **Network**: Group of connected devices.

### 🔹 Public Network

- Open to many users.
- Examples: Public Wi-Fi, internet.
- Less secure.

### 🔹 Private Network

- Restricted to authorized users.
- Examples: Office LAN, Home Wi-Fi.
- More secure.

---

## 🌍 3. **Website**

- A **website** is a collection of related web pages hosted on a server and accessible via a domain name.

**Structure**:

- Frontend (HTML, CSS, JS)
- Backend (Server, Database)
- Domain + Hosting

---

## 🧱 4. **Types of Websites**

| Type       | Description                          | Example            |
| ---------- | ------------------------------------ | ------------------ |
| Static     | Content does not change              | Portfolio site     |
| Dynamic    | Content changes based on interaction | Facebook, Flipkart |
| E-Commerce | Allows online shopping               | Amazon             |
| Blog       | Regularly updated content            | Medium             |
| Web App    | Functional applications              | Google Docs        |

---

## 🌐 5. **DNS – Domain Name System**

- Translates **domain names** (like `google.com`) to **IP addresses**.
- Without DNS, we’d have to type `142.250.196.78` instead of `google.com`.

**Analogy**: Like a phonebook — name → number.

---

## 🔄 6. **SPA vs MPA**

| SPA (Single Page App)      | MPA (Multi Page App)                 |
| -------------------------- | ------------------------------------ |
| Loads a single HTML file   | Loads new HTML on every route change |
| Fast navigation            | Slower due to full-page reloads      |
| Example: Gmail, React apps | Example: Traditional websites        |

- **SPA uses JavaScript to dynamically load content without reloading the page.**

---

## 🔗 7. **URL – Uniform Resource Locator**

**Example**: `https://www.amazon.in/gp/product/B0C6R9JF54`

- `https` → Protocol
- `www.amazon.in` → Domain name
- `/gp/product/...` → Path
- Parameters → `?id=123` (optional)

---

## 🧪 8. **Inspecting a Website**

- Use `Right Click → Inspect` or `F12` to open **DevTools**.
- Can edit HTML/CSS in real-time.
- Great for learning frontend layout and debugging.

🔹 Demo:

- Change text/images on Amazon, Flipkart live.

---

## 🧑‍💻 9. **Frontend vs Backend**

| Frontend             | Backend                        |
| -------------------- | ------------------------------ |
| What users see       | Behind-the-scenes logic & data |
| HTML, CSS, JS, React | Node.js, Express.js, MongoDB   |
| Browser executes it  | Server executes it             |

**Frontend = Actor, Backend = Director**

---

## 🔄 10. **Client vs Server**

- **Client**: Requests resources (browser, app).
- **Server**: Responds with data (hosted backend).

**Example**: Browser requests YouTube video → Server responds with video stream.

---

## 🧰 11. **Environment Setup for MERN Stack Development**

Before starting MERN (MongoDB, Express.js, React.js, Node.js) development, it’s important to set up your development environment. The following tools must be installed and configured:

---

### ✅ 1. **Install Node.js and npm**

#### 🧠 What is Node.js?

- Node.js is a **JavaScript runtime** built on Chrome's V8 engine.
- It allows us to run JavaScript on the server.
- Comes with **npm** – Node Package Manager – which is used to install libraries.

#### 🔧 Steps:

- Go to [https://nodejs.org](https://nodejs.org)
- Download the **LTS (Long Term Support)** version.
- Run the installer (Next → Accept Terms → Install).
- It will automatically install both **Node.js** and **npm**.

#### 🧪 Test Installation:

```bash
node -v      # Displays installed Node.js version
npm -v       # Displays npm version
```

---

### ✅ 2. **Install Visual Studio Code (VS Code)**

#### 🧠 What is VS Code?

- **Code editor** developed by Microsoft.
- Lightweight, supports many extensions and themes.
- Ideal for web and full-stack development.

#### 🔧 Steps:

- Go to [https://code.visualstudio.com](https://code.visualstudio.com)
- Download the installer based on your OS (Windows/Mac/Linux).
- Run the installer with default options.

#### 🔌 Recommended Extensions:

- Prettier (code formatter)
- ESLint (code linting)
- GitLens (Git insights)
- Bracket Pair Colorizer
- Live Server (for frontend development)

---

### ✅ 3. **Install MongoDB**

You have **two options** for using MongoDB:

---

#### A. **Local MongoDB Installation**

> Stores data on your computer. Suitable for offline practice.

##### 🔧 Steps:

- Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Download MongoDB Community Server.
- Install using default settings.
- Also install **MongoDB Compass** (GUI for MongoDB).

##### 🧪 Test:

Open terminal and type:

```bash
mongo       # Starts MongoDB shell
```

---

#### B. **MongoDB Atlas (Cloud-Based)**

> Free, cloud-hosted version. Accessible anywhere.

##### 🔧 Steps:

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account.
3. Create a new project and cluster (Shared Free Tier).
4. Add a user and whitelist your IP.
5. Get the **Connection String (URI)** for use in your Node.js app.

Example:

```
mongodb+srv://username:password@cluster0.mongodb.net/myDatabase
```

---

### ✅ 4. **Install Git**

#### 🧠 What is Git?

- A **version control system** to track changes in your code.
- Allows collaboration and pushing code to platforms like GitHub.

#### 🔧 Steps:

- Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Download and install for your OS.
- Use default settings during installation.

#### 🧪 Test Installation:

```bash
git --version    # Should show the installed Git version
```

#### 🔐 Setup Git (First-time only):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 🧪 Final Verification

After installation, verify everything works:

| Tool    | Command         | Expected Output        |
| ------- | --------------- | ---------------------- |
| Node.js | `node -v`       | e.g., v18.17.1         |
| npm     | `npm -v`        | e.g., 9.8.0            |
| Git     | `git --version` | e.g., git version 2.42 |
| MongoDB | `mongo`         | MongoDB shell prompt   |

## 🧱 12. **Monolithic vs Microservices**

| Monolithic              | Microservices                 |
| ----------------------- | ----------------------------- |
| Single codebase         | Multiple independent services |
| Easier to start         | Easier to scale, maintain     |
| Tight coupling          | Loose coupling                |
| Example: Early Flipkart | Example: Amazon now           |

---

## 🌐 13. **Git & GitHub**

- **Git**: Version control system (track changes in code).
- **GitHub**: Cloud-based platform to host git repositories.

Basic commands:

git init
git add .
git commit -m "Initial commit"
git remote add origin <repo-url>
git push -u origin main

---

## 🔧 14. **Node.js**

- JavaScript runtime built on **Chrome V8 engine**.
- Lets you run JS outside the browser (on the server).
- Great for building scalable network applications.

Create a file:

```js
// index.js
console.log("Hello from Node!");
```

Run with:

node index.js

---

## ⚙️ 15. **Express.js**

- Minimal and fast Node.js **web framework**.
- Used to build APIs and web servers.

Example:

```js
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello Express!"));
app.listen(3000);
```

---

## 🗃️ 16. **MongoDB**

- NoSQL database — stores data in **JSON-like documents**.
- Highly scalable and flexible.

**Key Terms**:

- Database → Collection → Documents
- Each document = key-value pair (similar to JS object)

```json
{
  "name": "Venkatesh",
  "role": "Trainer"
}
```
