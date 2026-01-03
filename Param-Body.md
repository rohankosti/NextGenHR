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


🔹 populate() – Short Theory (Exam / Interview Ready)

populate() Mongoose ka feature hai jo ek collection me stored ObjectId ke through dusri related collection ka actual data laata hai.
Database me sirf ObjectId save hoti hai, text ya naam nahi
Dropdown ka text sirf UI ke liye hota hai, backend me nahi jaata
populate() us ObjectId ko use karke reference collection se fields fetch karta hai
LeaveRequest.find()
.populate('employee_id', 'first_name last_name');

👉 Iska result:
employee_id string nahi rehta
wo Employee ka object ban jata hai jisme first_name, last_name hote hain
Use kab kare:
One-to-one / one-to-many relation
Clean & simple CRUD operations
One-line definition:
populate() ObjectId ko replace karke related document ka data attach karta hai.


🔹 MongoDB $lookup (JOIN) – Short Theory (Complete & Clear)

MongoDB me JOIN $lookup aggregation ke through hota hai, jisme ek collection ke field ki value dusri collection ke field ki value se match hoti hai.
from → jis collection se data lana hai
localField → current collection ka field (foreign key)
foreignField → from wali collection ka field
Rule: localField ki value aur foreignField ki value same honi chahiye,
collection ki _id same hona zaroori nahi

Example:

leave_requests.employee_id  ===  users._id
Dropdown ka text DB me store nahi hota, sirf ObjectId save hoti hai
$lookup result array deta hai, isliye
$unwind array ko object me convert karta hai
One-line definition:
$lookup MongoDB me collections ko join karta hai by matching current collection ke foreign key ko from collection ke primary key se.