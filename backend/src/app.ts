import express from 'express';
import cors from "cors";
import quizRoutes from "./routes/quizRoutes";
import multichoiceRouter from "./routes/multichoiceRoutes";
import searchRouter from "./routes/searchRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", quizRoutes);
app.use("/api", multichoiceRouter);
app.use("/api", searchRouter);


export default app;
