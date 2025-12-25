⭐ FINAL PERFECT RULES (Industry Standard REST API Rules)
1️⃣ GET → Query Params / Route Params:

GET request me BODY kabhi nahi hoti.
◆ Route Params (/:id)
Use jab ek specific single record chahiye.
Examples:
GET /user/10
GET /product/123
GET /job/65ab9ef1
→ Yaha id URL mai hoti hai.
→ Ye RESTful hai.

◆ Query Params (?key=value):
Use jab filter / search / pagination karna ho.
GET /jobs?position=developer
GET /products?page=2&limit=10
GET /users?status=active

2️⃣ POST → BODY:
POST ka matlab: Create / Send data
POST mai hamesha body use hoti hai.
Examples:
POST /job
body = { name, email, position }
POST /login
body = { email, password }
POST /job/single
body = { id: "123" }
POST me URL parameters optional hote hai, par mostly body hi use hoti hai.

3️⃣ PUT / PATCH → BODY + PARAM:
Update ke time ID URL me + data body me jaata hai.
PUT /job/123
body = { name: "Rohan", position: "Developer" }

4️⃣ DELETE → PARAM:
Delete hamesha /:id se hota hai.
DELETE /job/123

❗ Agar tum POST use kar rahe ho modal ke liye → body chalega
Ye REST strict rule nahi follow karta, lekin allowed, problem nahi.

⭐ FINAL SUMMARY (1 line rules):
| Use Case        | Method    | Params/Body   |
| --------------- | --------- | ------------- |
| Get list        | GET       | query         |
| Get single item | GET       | params        |
| Create new      | POST      | body          |
| Login           | POST      | body          |
| Search/filter   | GET       | query         |
| Update          | PUT/PATCH | params + body |
| Delete          | DELETE    | params        |
