require("dotenv").config();

const express=require("express");
const app=express();
const cors=require("cors");

const PORT=process.env.PORT||2000;
const connectDB=require("./db/connect");

// middleware
const notFoundMiddleware=require("./middleware/notFound");
const errorHandlerMiddleware=require("./middleware/errorHandler");
const authentication=require("./middleware/authentication");

// routes
const authRoutes=require("./routes/auth");
const expenseRoute=require("./routes/expense");
const groupRoutes=require("./routes/groups");
const dashboardRoute=require("./routes/dashboard");

app.use(cors({
    origin:["http://localhost:5173","http://localhost:2000"],
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true,
    allowedHeaders:['Content-Type','Authorization']
}
))
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/dashboard",authentication,dashboardRoute);
app.use("/api/groups/:groupId/expenses",authentication,expenseRoute);
app.use("/api/groups",authentication,groupRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Server is listening on port: ${PORT}`);
        })
    }
    catch(err){
        console.log(`Problem connecting the server: ${err}`);
    }
}

start();