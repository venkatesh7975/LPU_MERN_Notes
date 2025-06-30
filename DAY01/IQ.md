## 🧠 **1. Internet & Networks**

### ✅ Q1: What happens when you type a URL in the browser and hit enter?

**Answer**:

1. DNS resolves the domain to IP.
2. Browser sends HTTP request to server.
3. Server processes and sends back response.
4. Browser renders the response (HTML/CSS/JS).
5. JS loads dynamic content (if SPA).



### ✅ Q2: Difference between public and private networks in real-time applications?

**Answer**:

- **Public**: Used in hotels, cafes — low security. Used by apps to access APIs or services globally.
- **Private**: Used in corporate setups for internal communication (e.g., microservices within AWS VPC).

---

## 🌍 **2. Website & Types**

### ✅ Q3: What kind of website is Amazon? Static or dynamic?

**Answer**:
Amazon is a **dynamic web application** (interactive, personalized content, real-time inventory, user sessions).

---

### ✅ Q4: Which type of website would you build using the MERN stack?

**Answer**:
A **dynamic web app or SPA**. Example: Dashboard, e-commerce platform, social media site.

---

## 🌐 **3. DNS, URL, and Hosting**

### ✅ Q5: What is DNS and why is it crucial in production deployments?

**Answer**:
DNS maps human-readable domains to IPs. In production, it’s used to:

- Route traffic to correct backend services
- Use CDNs (Content Delivery Networks)
- Load balance requests (e.g., using AWS Route 53)

---

### ✅ Q6: What is a URL and how is it structured?

**Answer**:
URL = Protocol + Domain + Path + Query + Fragment
Example: `https://api.example.com/users?id=123#profile`

---

## 🧪 **4. Inspecting Websites (DevTools)**

### ✅ Q7: How do frontend developers use browser DevTools in real-world projects?

**Answer**:

- Inspect elements & CSS
- Debug JS via console
- Monitor network calls (API debugging)
- Check performance bottlenecks

---

### ✅ Q8: Can you change a website using DevTools? Is it permanent?

**Answer**:
Yes, you can change **DOM or CSS** temporarily for testing or debugging. But it’s not permanent — it resets on refresh.

---

## 🖥️ **5. Frontend vs Backend**

### ✅ Q9: Can frontend work without backend? And vice versa?

**Answer**:

- Yes, frontend can work with mock/static data.
- Backend can work independently (APIs) but needs frontend or third-party clients for interaction.

---

### ✅ Q10: In your projects, how did you divide responsibilities between frontend and backend?

**Answer**:

- Frontend: User interfaces using React.
- Backend: Business logic, authentication, database access using Node.js/Express.

---

## 🧑‍💻 **6. Client vs Server**

### ✅ Q11: Can a server also act as a client?

**Answer**:
Yes. In microservices, one service (server) can send a request to another service (acting as a client). Example: Node.js backend calling a payment API.

---

## 🔄 **7. SPA vs MPA**

### ✅ Q12: When would you choose MPA over SPA?

**Answer**:

- MPA for SEO-heavy or large-scale enterprise websites (like Wikipedia, banking).
- SPA for fast, interactive apps (like dashboards or admin panels).

---

## ⚙️ **8. Monolithic vs Microservices**

### ✅ Q13: What challenges did you face in a monolithic project?

**Answer**:

- Codebase became too large and unmanageable.
- Small changes required full redeployment.
- Scaling required cloning the entire app, not individual modules.

---

### ✅ Q14: How would you split a monolith into microservices?

**Answer**:

- Identify domain boundaries (User, Product, Orders).
- Create independent services with separate databases.
- Communicate via REST or messaging queues (e.g., RabbitMQ, Kafka).

---

## 🧰 **9. Git & GitHub**

### ✅ Q15: What Git workflow did you follow in your team?

**Answer**:

- **Feature Branching**: `main`, `dev`, `feature/*`
- PRs (Pull Requests) with reviews
- Conflict resolution & version tagging

---

### ✅ Q16: What is the difference between `git fetch` and `git pull`?

**Answer**:

- `git fetch`: Gets changes but doesn't merge.
- `git pull`: Fetch + Merge into current branch.

---

## 🧠 **10. Node.js**

### ✅ Q17: Why do companies use Node.js in production?

**Answer**:

- Non-blocking I/O (handles many users efficiently)
- Same language for frontend/backend (JS)
- Large ecosystem (npm)

---

### ✅ Q18: How do you handle heavy computation in Node.js?

**Answer**:

- Move heavy tasks to **worker threads** or **background services**
- Use **caching** or **queues** to manage load

---

## 🚀 **11. Express.js**

### ✅ Q19: How is Express.js different from Node.js?

**Answer**:
Node.js = runtime environment
Express.js = web framework built on Node.js to simplify routing, middleware, and API development.

---

### ✅ Q20: How do you handle errors in Express?

**Answer**:
Use **custom middleware**:

```js
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
```

---

## 🗃️ **12. MongoDB**

### ✅ Q21: When would you use MongoDB over SQL?

**Answer**:

- When the data is unstructured or hierarchical.
- When schema flexibility is needed.
- For faster development and horizontal scaling.

---

### ✅ Q22: How do you structure a user schema in MongoDB using Mongoose?

**Answer**:

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
});
```

---

## 🧪 **13. Real-Time Scenarios**

### ✅ Q23: Suppose your backend crashes, how would you debug it?

**Answer**:

- Check logs (with tools like Winston or console)
- Use Postman to reproduce the issue
- Add error handling middleware
- Check DB connections, environment configs

---

### ✅ Q24: You push code to GitHub, but your teammate doesn't see the update. What happened?

**Answer**:

- You may have pushed to a different branch.
- They need to pull or checkout the correct branch.
- Possible conflict that needs resolving.





## 🌐 **INTERNET, NETWORKS, DNS, URL — Advanced**

### ✅ Q25: How would you troubleshoot if your deployed React app is not accessible via domain name but works on IP?

**Answer**:

* Possible DNS misconfiguration.
* Check domain DNS records (A/AAAA or CNAME).
* Clear DNS cache (`ipconfig /flushdns`).
* Check for HTTPS misconfigurations or certificate issues.

---

### ✅ Q26: In production, what are best practices related to DNS?

**Answer**:

* Use CDNs (e.g., Cloudflare) for speed and security.
* Set TTL (time-to-live) appropriately.
* Use health checks & failover routing (Route 53 or similar).

---

### ✅ Q27: Difference between `http://localhost:3000` and `http://127.0.0.1:3000`?

**Answer**:

* Both point to the local machine.
* `localhost` resolves via DNS.
* `127.0.0.1` bypasses DNS, uses direct IP — slightly faster for local testing.

---

## 🧑‍💻 **FRONTEND vs BACKEND — Real-Time Coordination**

### ✅ Q28: How do frontend and backend teams collaborate on APIs?

**Answer**:

* Define API contracts via Swagger/Postman/OpenAPI.
* Use mock servers (e.g., json-server) before backend is ready.
* Follow RESTful principles & versioning (`/api/v1/products`).

---

### ✅ Q29: If the frontend is not getting the response from backend, how do you debug?

**Answer**:

1. Check browser console (CORS/network errors).
2. Test backend directly via Postman.
3. Ensure correct URL/port/environment variables.
4. Use logs and status codes to isolate.

---

## 🧩 **SPA vs MPA — Architect Decisions**

### ✅ Q30: How does SPA affect SEO, and how do companies solve it?

**Answer**:
SPAs are JavaScript-heavy, which search engines may not fully crawl.
Solutions:

* Use **Server Side Rendering (SSR)** with Next.js.
* Use **pre-rendering/static generation**.
* Add proper **meta tags** dynamically (React Helmet).

---

### ✅ Q31: What are drawbacks of SPAs in large-scale apps?

**Answer**:

* Initial bundle size is large.
* SEO issues.
* Complex state management across views.
* Harder browser back/forward navigation.

---

## ⚙️ **MONOLITH vs MICROSERVICES**

### ✅ Q32: In your view, when should startups go for microservices?

**Answer**:
Only after they outgrow monolithic architecture.
Microservices add:

* Complexity (devops, communication, auth)
* Deployment overhead
  Start with monolith → modularize → split gradually.

---

### ✅ Q33: How do services communicate in microservices?

**Answer**:

* **REST APIs**
* **Message brokers** like Kafka, RabbitMQ
* **gRPC** (for high performance)

---

## 🔧 **GIT & GITHUB — Real Team Workflows**

### ✅ Q34: What is a pull request, and why is it important?

**Answer**:
PR = Code change proposal. It allows:

* Code review
* Collaboration
* CI/CD pipelines to trigger
* Quality control via lint/tests

---

### ✅ Q35: What is `.gitignore` and give examples of what you add?

**Answer**:
`.gitignore` lists files/folders Git should not track:

* `node_modules/`
* `.env`
* `dist/`
* `logs/`

---

### ✅ Q36: What is rebasing in Git? When would you use it?

**Answer**:
`git rebase` applies your changes on top of another branch to create a linear history (vs merge).
Use when:

* You want a cleaner commit history.
* Working on feature branch and want to sync latest from `main`.

---

## 🚀 **NODE.js & EXPRESS.js — Real Production Use**

### ✅ Q37: What are common performance bottlenecks in Node.js apps?

**Answer**:

* Synchronous/blocking code (e.g., loops, `fs.readFileSync`)
* Unhandled promises
* Memory leaks from long-lived objects
* Database latency

---

### ✅ Q38: How to scale a Node.js backend?

**Answer**:

* Use **clustering** or **PM2** to run multiple processes.
* Load balance with **Nginx** or **AWS ALB**.
* Use **Redis** for caching.
* Break into microservices.

---

### ✅ Q39: What is middleware in Express? Give real use cases.

**Answer**:
Middleware functions intercept request/response cycle.
Use cases:

* Logging (e.g., `morgan`)
* Auth (JWT checking)
* Validation
* Error handling

```js
app.use((req, res, next) => {
  console.log(req.path);
  next();
});
```

---

### ✅ Q40: Difference between `app.use()` and `app.get()`?

**Answer**:

* `app.use()` applies middleware to **all** requests.
* `app.get('/route')` handles **GET** requests to specific path.

---

## 🗃️ **MONGODB — Real Scenarios**

### ✅ Q41: What indexing strategies have you used in MongoDB?

**Answer**:

* Created indexes on frequently queried fields (`email`, `createdAt`)
* Used **compound indexes** for multi-field queries
* Ensured **unique indexes** on username/email

---

### ✅ Q42: How to prevent duplicate data in MongoDB?

**Answer**:

* Use `unique: true` in schema.
* Check for existing documents before insert.
* Use transactions in critical flows (like order placements).

---

### ✅ Q43: Explain schema design decisions for a social media post.

**Answer**:

```js
Post {
  content: String,
  author: ObjectId,
  likes: [ObjectId],
  comments: [{
    user: ObjectId,
    text: String,
    createdAt: Date
  }]
}
```

* Embedded comments for quick access.
* ObjectId references for scalability.

---

### ✅ Q44: What are the risks of using MongoDB with poor schema planning?

**Answer**:

* Query inefficiency (no indexes)
* Data duplication
* Difficulty with relationships
* High storage use due to lack of normalization

---

## 🔍 BONUS

### ✅ Q45: How do you manage environment-specific configs in a MERN app?

**Answer**:

* Use `.env` files (dotenv package in backend, `process.env`)
* Avoid pushing `.env` to GitHub (`.gitignore`)
* Store different `.env` for dev, staging, production

---

### ✅ Q46: How do you handle secrets (API keys, passwords) in production?

**Answer**:

* Use `.env` files locally
* Use cloud secrets manager (e.g., AWS Secrets Manager, Heroku Config Vars)
* Never hardcode credentials in code

