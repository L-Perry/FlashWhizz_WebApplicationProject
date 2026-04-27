import express from 'express';
import cors from "cors";
import quizRoutes from "./routes/quizRoutes";
import profileRoutes from "./routes/profileRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", quizRoutes);
app.use("/api", profileRoutes);


export default app;
