import index from './router/API/index.js'
import webRoutes from "./router/Web-Page/index.js"; 
import express from "express";
import connectDB from './mongo.js'
import session, { Cookie, Store }  from "express-session";
import MongoStore  from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
const filename = fileURLToPath(import.meta.url);
// console.log(filename);
const dirna = path.dirname(filename);
// console.log(dirna);


const app = express();
app.use(express.static(path.join(dirna, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(dirna, 'views'));
// ==================== SESSION CREATE ====================
app.use(
  session({
    secret:"mysecratekey",
    resave:false,
    saveUninitialized:false,
    cookie:{
      httpOnly:true,
      maxAge:1000*60*60*24,
    },
    store:MongoStore.create({
      mongoUrl:process.env.MONGO_URL,
      collectionName:'sessions',
    }),
  })
);
connectDB()
// ================== API Routes ====================
app.use(index);
// ==================== WEB Routes ====================
app.use( webRoutes);


process.on("SIGINT", async () => {
  console.log("\nShutting down server...");
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});

app.listen(process.env.PORT, () => {
  console.log(`server started : http://localhost:${process.env.PORT}`);
});
