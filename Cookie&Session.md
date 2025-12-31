🔥 SHORT THEORY — Session, Cookie, connect-mongo :-

1) Cookie kya hoti hai?
Cookie browser me store hone wale small data ka piece hota hai.
Authentication me cookie mainly session ID store karne ke kaam aati hai.

2) Session kya hota hai?
Session server-side storage hota hai jisme server user ka info store karta hai:
userId
name
email
When user logs in → session create hota hai
Browser → cookie me sessionID store hoti hai.

3) Express-session kya karta hai?
express-session automatically:
✔️ Session banaata hai
✔️ Cookie set karta hai (connect.sid)
✔️ Har request me session verify karta hai
✔️ Session ko read/write karta hai
Auth system aaram se ban jata hai.

4) connect-mongo kya hota hai?
connect-mongo session ko MongoDB database me store karta hai.
Ye database nahi hai — sirf adapter (bridge) hai.
Benefits:
Server restart hone par bhi session saved
Scalable
Secure
Memory load nahi hota

5) Session Config options ka simple meaning
🔵 secret: "mySecretKey"
Session ID ko encrypt karta hai
Security ke liye important

🔵 resave: false
Agar session change nahi hua
→ firse save mat karo
→ performance better

🔵 saveUninitialized: false
Blank (empty) session store mat karo
Jab tak user login na kare, session nahi banega

🔵 cookie: { httpOnly: true }
Cookie frontend JavaScript se read nahi ho sakti
XSS attacks se protection
HIGH SECURITY

🔵 cookie: { maxAge }
Session kitna time valid rahega
Example:
maxAge: 1000 * 60 * 60 * 24 → 1 day

🔥 6) Login Flow (Short)
User login request bhejta hai
Server email/password check karta hai
Server session create karta hai:
req.session.user = { id, name, email }

Express-session automatically cookie set karta hai:
connect.sid = encryptedSessionId
Browser cookie save karta hai
Next requests me browser cookie bhejta rahega → user authenticated

🔥 7) Logout Flow (Short)
req.session.destroy() → session delete
res.clearCookie("connect.sid") → cookie delete
User logout

🔥 8) Protected Route (Short)
if(req.session.user) → allowed  
else → Unauthorized  

⭐ FINAL SHORT SUMMARY
Cookie = Browser me session ID store hoti hai
Session = Server me user ka data store hota hai
express-session = Session + Cookie handle karta hai
connect-mongo = Session ko MongoDB me save karne ka adapter
httpOnly = Cookie JS se hidden → secure
maxAge = Session expiry time
resave/saveUninitialized = Performance options