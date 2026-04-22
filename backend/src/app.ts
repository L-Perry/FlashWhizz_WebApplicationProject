import express from 'express';
import cors from "cors";
import quizRoutes from "./routes/quizRoutes";
import multichoiceRouter from "./routes/multichoiceRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", quizRoutes);
app.use("/api", multichoiceRouter);


export default app;
