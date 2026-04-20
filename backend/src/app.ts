import express from 'express';
import cors from "cors";
import quizRoutes from "./routes/quizRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", quizRoutes);


export default app;
