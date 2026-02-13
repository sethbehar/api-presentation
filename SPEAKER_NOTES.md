# Speaker Notes — The Life of an API Request

---

## Slide 1: Title — The Life of an API Request

> **On screen:** Title, subtitle, animated network background

Welcome everyone. Today we are going to walk through the life of an API request — what happens from the moment a user clicks a button or an app fires off a call, all the way through the backend and back again. We will cover what APIs are, how they are architected, how we keep them secure, how we make them fast, and then tie it all together with a real-world example using Azure API Management.

This presentation was inspired by Sam Rivera's "Git More From Modernization" talk and builds on some of the same themes around understanding the technology that powers modern applications.

---

## Slide 2: What is an API?

> **On screen:** Definition of API, three cards (Client Sends Request, API Processes, Server Responds)

So let us start at the very beginning. An API — Application Programming Interface — is essentially a contract between two pieces of software. It defines what requests you can make, what data you send, and what you get back.

Think of it like ordering at a restaurant. You, the client, look at the menu (the API documentation), place an order (send a request), the kitchen processes it (the server), and you get your food back (the response). You do not need to know how the kitchen works — you just need to know the menu.

At a high level every API interaction has three parts: the client sends a structured request, the API layer processes it — validating, routing, transforming — and then the server sends back a response with data, status codes, and headers.

---

## Slide 3: Types of APIs

> **On screen:** Three cards — REST, GraphQL, WebSocket

Not all APIs work the same way. There are different paradigms designed for different use cases.

**REST** is the most widely used. It is resource-based, stateless, and uses standard HTTP methods. When you hear people talk about APIs, they usually mean REST. It is simple, well-understood, and works great for most CRUD operations.

**GraphQL** was created by Facebook to solve the problem of over-fetching and under-fetching data. Instead of hitting multiple endpoints, you write a query that asks for exactly the fields you need in a single call. It is powerful but adds complexity.

**WebSocket** is different from both — it establishes a persistent, bidirectional connection. Instead of request-response, both sides can push data at any time. This is what powers real-time features like chat, live notifications, or stock tickers.

For the rest of this talk we are going to focus on REST since it is what most of us encounter daily.

---

## Slide 4: REST APIs — Deep Dive

> **On screen:** HTTP method badges (GET, POST, PUT, DELETE), C# request example, JSON response example

REST stands for Representational State Transfer. The core idea is that everything is a resource identified by a URL, and you manipulate those resources using standard HTTP methods.

**GET** reads data. **POST** creates new data. **PUT** updates existing data. **DELETE** removes data. These four verbs cover the vast majority of what you need.

On the left you can see a real C# example — we create an HttpClient, set a Bearer token for authentication, and make a GET request. On the right is the JSON response — a 200 OK status with the data payload.

Notice the response includes a Content-Type header telling the client the format is JSON, and the body is a structured object. This predictable pattern — verb plus URL plus headers plus body — is what makes REST so approachable.

---

## Slide 5: Architecture Overview — How It All Fits Together

> **On screen:** Six-step horizontal pipeline (Client Request → API Gateway → Authentication → Service Logic → Database → Response)

Now let us zoom out and look at the big picture. When a request leaves the client, it does not just magically arrive at a database. It passes through multiple layers, each with a specific job.

Step one: the **client** — a browser, mobile app, or another service — sends an HTTP request.

Step two: that request hits the **API Gateway**, which is the front door. It handles routing, rate limiting, and initial validation.

Step three: **authentication**. Before we do any real work, we need to verify who is making this request. Are they allowed to be here? Are their credentials valid?

Step four: if they pass auth, the request reaches the **service logic** — the actual business rules. This is where your application code lives and does its work.

Step five: most service logic needs data, so we hit the **database** to read or write.

Step six: the result gets formatted and sent back as a **response** to the client.

Every one of the upcoming slides dives deeper into one of these layers. Keep this pipeline in your head as a mental model.

---

## Slide 6: API Gateway

> **On screen:** Six responsibility cards — Request Routing, Rate Limiting, Load Balancing, SSL Termination, Request Transform, Service Discovery

The API Gateway is the single entry point for all API traffic. It sits between your clients and your backend services, handling what we call cross-cutting concerns — things that every request needs but that you do not want to duplicate in every service.

**Request Routing** — it reads the URL, headers, and method to figure out which backend service should handle this request.

**Rate Limiting** — it protects your backends from abuse by throttling clients that send too many requests. We will see this in action later.

**Load Balancing** — if you have multiple instances of a service running, the gateway distributes traffic evenly so no single instance gets overwhelmed.

**SSL Termination** — it handles the TLS encryption and decryption at the edge so your internal services can communicate over plain HTTP, which is simpler and faster.

**Request Transformation** — it can modify headers, query parameters, or even the body before forwarding the request. This is useful for versioning or adapting between different API formats.

**Service Discovery** — in dynamic environments where services spin up and down, the gateway figures out where to send traffic by discovering services on the network.

---

## Slide 7: Backend Services

> **On screen:** Four service cards (User, Order, Payment, Notification) with their endpoints listed

Behind the gateway, we often break our application into independent backend services. This is the microservices pattern.

Each service owns a specific domain. The **User Service** handles profiles and accounts. The **Order Service** manages orders. The **Payment Service** processes transactions. The **Notification Service** sends emails, SMS, or push notifications.

Each one has its own endpoints — its own mini-API — with the HTTP methods we just discussed. The User Service exposes a GET for fetching profiles and a POST for creating new users. The Order Service has similar patterns.

The key benefit is independence. You can deploy, scale, and update each service individually. If the Payment Service needs more capacity during a sale event, you scale just that service without touching the others.

---

## Slide 8: Security & Auth

> **On screen:** Four nested layers — TLS/HTTPS, API Keys, OAuth 2.0/JWT, RBAC — getting progressively indented

Security is not a single wall — it is defense in depth. Multiple layers work together so that if one is compromised, the others still protect the system.

The outermost layer is **TLS / HTTPS**. This encrypts all data in transit between the client and the server. Without it, anyone on the network could read your requests and responses in plain text.

Next, **API Keys**. These identify which application is calling your API and let you track usage per client. They are simple but should never be the only layer of security.

Then **OAuth 2.0 and JWT tokens**. This is where we authenticate the actual user — proving they are who they say they are. JWTs are self-contained tokens that carry claims about the user, and they are verified on every request.

The innermost layer is **RBAC — Role-Based Access Control**. Even if you are authenticated, can you access this particular resource? An admin might be able to delete users, but a regular user cannot. RBAC enforces those boundaries.

Each layer narrows access further, from the broad network level down to the specific resource level.

---

## Slide 9: Performance Overview

> **On screen:** Five optimization cards — Rate Limiting, Caching, Response Compression, Database Queries, Pagination

Now let us shift to performance. Speed matters — both for user experience and for operational costs. We are going to cover five key strategies.

**Rate Limiting** protects your system from being overwhelmed and ensures fair usage. **Caching** stores frequently accessed data so you do not have to recompute it every time. **Response Compression** shrinks the size of what you send over the wire. **Database Query Optimization** makes sure you are asking the database for data efficiently. And **Pagination** limits result sets so you are never trying to return a million rows in a single response.

Each of the next five slides will go deep on one of these. Together they can make the difference between a 3-second response and a 30-millisecond one.

---

## Slide 10: Rate Limiting & Quotas

> **On screen:** Animated terminal showing requests accelerating, then getting 429 Too Many Requests errors. Strategy badges below.

Watch the terminal. At first, requests are coming in at a normal pace — 200 OK, 201 Created, everything is fine. Then the pace picks up. Requests start arriving faster and faster. And then — 429 Too Many Requests. The rate limiter kicked in.

When a client exceeds the allowed request rate, the server returns a 429 status code along with headers telling the client how many requests they have left, when the limit resets, and how long to wait before retrying. This is not an error in the traditional sense — it is the system protecting itself.

There are different strategies for implementing this. **Token Bucket** gives each client a bucket of tokens that refill at a fixed rate — each request costs one token. **Sliding Window** tracks requests in a rolling time period. **Fixed Window** counts requests per fixed interval, like per minute. Each has tradeoffs in terms of burst tolerance and accuracy.

---

## Slide 11: Caching

> **On screen:** Animated cache hit flow (Client → Cache → HIT ~5ms) and cache miss flow (Client → Cache MISS → Origin → Store ~200ms). Cache type badges below.

Caching is arguably the single biggest performance win you can get. The idea is simple — if you have already computed a response recently and nothing has changed, just return the stored version instead of doing all the work again.

The animation shows two scenarios. A **cache hit** — the client makes a request, we check the cache, the data is there, and we return it in about 5 milliseconds. Fast.

A **cache miss** — we check the cache, the data is not there, so we have to go all the way to the origin server, compute the response, store it in the cache for next time, and return it. That takes about 200 milliseconds — forty times slower.

Caching can happen at multiple levels: at the **CDN** level for static content, at the **API Gateway** for response caching, in-memory stores like **Redis or Memcached** for application-level caching, and even in the **browser** using Cache-Control headers. The right combination depends on your data and how frequently it changes.

---

## Slide 12: Response Compression

> **On screen:** Three animated bars showing Uncompressed (245 KB), gzip (73 KB, -70%), Brotli (49 KB, -80%). HTTP header example below.

Less data over the wire means faster transfers and lower bandwidth costs. Response compression is an easy win that many teams overlook.

Look at the difference. An uncompressed JSON response might be 245 KB. With **gzip** compression, that drops to 73 KB — a 70% reduction. With **Brotli**, which is a newer and more efficient algorithm, we get down to 49 KB — an 80% reduction. That is five times less data.

The mechanism is simple — negotiated through HTTP headers. The client sends an `Accept-Encoding` header saying "I support gzip and Brotli." The server picks the best option it supports, compresses the response, and sends back a `Content-Encoding` header telling the client which algorithm was used.

Most API gateways and web servers can handle this automatically with a simple configuration change.

---

## Slide 13: Database Queries

> **On screen:** Side-by-side SQL comparison — Unoptimized (SELECT *, no index, full scan, ~3200ms, 2.4M rows) vs Optimized (specific columns, composite index, LIMIT, ~4ms, 50 rows)

This is one of my favorite examples because the difference is so dramatic. Same data, same result, but the way you ask for it changes everything.

On the left, the unoptimized query. `SELECT *` — returns every column including BLOBs. No index on the WHERE clause columns, so the database does a full table scan across 2.4 million rows. Takes 3.2 seconds.

On the right, the optimized version. We select only the columns we need. We have a composite index on status and created_at, so the database can do an index seek instead of a full scan. And we add LIMIT 50 so even if there are thousands of matches, we only return what we need. Result: 4 milliseconds. That is an 800x improvement.

The tips at the bottom are worth remembering: **use indexes** on columns you filter and sort by, **avoid SELECT \*** so you are not transferring unnecessary data, **add LIMIT** to bound your results, and **use EXPLAIN** to understand how your database is actually executing your queries.

---

## Slide 14: Pagination

> **On screen:** Grid of 24 colored numbered items grouped into 4 pages, page indicator. Offset-based vs cursor-based code examples.

Never return unbounded result sets. If a table has a million rows and someone calls your API without a limit, you are going to try to serialize and transfer all of that data. That is bad for the server, bad for the network, and bad for the client.

Pagination breaks large result sets into manageable pages. The visual shows 24 items split into pages of 6, each color-coded by page.

There are two main approaches. **Offset-based** is the simpler one — you say "give me page 2 with 10 items per page," and the database skips the first 10 and returns the next 10. It is easy to understand but gets slower on deep pages because the database still has to scan past all the skipped rows.

**Cursor-based** is more performant. Instead of a page number, you pass a cursor — usually the ID of the last item you received — and say "give me the next 10 after this one." The database can jump straight to that point using an index, so performance is consistent regardless of how deep you are in the dataset. This is what most modern APIs like GitHub, Stripe, and Slack use.

---

## Slide 15: Azure API Management

> **On screen:** Step-by-step timeline revealing 7 stages (Client App → Azure APIM → Inbound Policies → Cache Check → Route to Backend → Outbound Policies → Return Response) + App Insights sidebar

Now let us bring everything together with a real-world example. Azure API Management is Microsoft's managed API gateway service, and it packages most of what we have discussed into a single platform.

*Press right arrow to reveal each step:*

**Step 1** — The client app sends a request. Could be a mobile app, a single-page application, or another service.

**Step 2** — The request hits Azure API Management, the single entry point for all API traffic.

**Step 3** — Inbound policies run first. This is where rate limiting kicks in, JWT tokens are validated, and request transformations happen — all the gateway responsibilities we discussed earlier.

**Step 4** — Cache check. If we have a cached response, we skip straight to returning it — the fast path. If not, we continue to the backend.

**Step 5** — The request gets routed to the appropriate backend — maybe an Azure App Service talking to Azure SQL, or Azure Functions connected to Cosmos DB.

**Step 6** — Outbound policies run on the response. This is where we can transform the response, add headers, or store the result in cache for next time.

**Step 7** — The compressed, transformed response gets sent back to the client.

And running alongside all of this is **Application Insights**, giving you tracing, latency metrics, error rates, and usage analytics across every step. Observability is critical — you cannot optimize what you cannot measure.

---

## Slide 16: Summary — Key Takeaways

> **On screen:** Six key takeaway bullets with checkmarks, "Thank You" and "Questions?" at bottom

Let us wrap up with the key points.

**APIs are the backbone of modern software communication.** Almost every application you use today — whether it is a mobile app, a web app, or an integration — is built on APIs.

**REST is the most popular paradigm**, but GraphQL and WebSocket are powerful tools for specific use cases. Choose the right tool for the job.

**API Gateways centralize cross-cutting concerns** like authentication, routing, and rate limiting so your services do not have to reinvent them.

**Layered security** — TLS, API keys, OAuth, and RBAC — protects your system at every level. No single layer is enough on its own.

**Performance wins come from multiple strategies** working together — caching, compression, query optimization, and pagination. Small improvements at each layer compound into a dramatically faster experience.

And finally, **Azure API Management packages these best practices into a managed cloud service**, so you get all of this out of the box with configuration rather than custom code.

Thank you. I am happy to take any questions.
