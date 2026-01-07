🔐 JWT (JSON Web Token) – COMPLETE THEORY (SHORT & SOLID)
1️⃣ JWT kya hai?

JWT ek stateless authentication mechanism hai jisme:

Server user ka session store nahi karta

Server ek signed token deta hai

Client har request ke sath token bhejta hai

2️⃣ JWT kab use hota hai?

APIs

Mobile apps

React / Angular frontend

Microservices

3️⃣ JWT ke 3 PARTS hote hain (VERY IMPORTANT)

JWT format:

header.payload.signature

🟦 1. Header
{
  "alg": "HS256",
  "typ": "JWT"
}


Kaam:

Kaunsa algorithm use hua

Token ka type

📌 Header automatically generate hota hai
❌ Isme secret key nahi hoti

🟩 2. Payload
{
  "id": "65abc",
  "email": "test@gmail.com"
}


Kaam:

User ki identity

Custom data

📌 Payload encrypted nahi hota
📌 Base64 encoded hota hai
❌ Password kabhi nahi

🟥 3. Signature
HMACSHA256(
  base64(header) + "." + base64(payload),
  SECRET_KEY
)


Kaam:

Token ko tamper-proof banana

Prove karna token server ne hi banaya

📌 Secret key kabhi token ka part nahi hoti
📌 Sirf server ke paas hoti hai

4️⃣ JWT ka FLOW (LOGIN → ACCESS)

User login karta hai

Server credentials verify karta hai

JWT create hota hai (jwt.sign)

Token cookie / header me jata hai

Har protected request me token jata hai

Middleware token verify karta hai (jwt.verify)

Valid → access allowed

Invalid → 401 / login

5️⃣ process.env.JWT_SECRET kya hai?

Server ki secret signing key

Signature banane aur verify karne ke liye use hoti hai

Token me kabhi store nahi hoti

6️⃣ jwt.sign() kya karta hai?

Header create karta hai

Payload encode karta hai

Secret key se signature banata hai

Final token return karta hai

7️⃣ jwt.verify() kya karta hai?

Token split karta hai

Header + payload dubara hash karta hai

Same secret key se signature compare karta hai

Token valid hai ya nahi check karta hai

8️⃣ decoded kya hota hai?

Token ka payload + metadata

{
  id,
  email,
  iat,
  exp
}

9️⃣ req.user kya hai?

Express request object ka custom property

JWT ka built-in part nahi

Middleware me manually set hota hai

req.user = decoded;


📌 req.user sirf is request ke liye hota hai

🔁 Session vs JWT (FINAL DIFFERENCE)
Session	JWT
Server me user store	Server stateless
req.session.user	req.user
Session ID cookie	Signed token
MongoStore	❌ Not needed
🔐 Security Rules (IMPORTANT)

✔️ Secret key .env me rakho
✔️ Token HTTP-only cookie me rakho
❌ Password payload me mat rakho
❌ LocalStorage avoid karo

🧠 One-line summary (EXAM READY)

JWT me server token sign karta hai, client token bhejta hai, aur server signature verify karke bina session store kiye user ko authenticate karta hai.

🎯 Interview-ready lines

JWT is stateless authentication

Secret key token ka part nahi hoti

Payload encrypted nahi hota

req.user ek convention hai