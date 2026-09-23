import "dotenv/config";

import express from "express";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { personRouter } from "./src/routes/person.routes.js";
import { roleRouter } from "./src/routes/role.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// para que entienda el formato json
app.use(express.json());

app.use(cookieParser()); // NECESARIO: para leer req.cookies

//configuracion de las rutas
app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", personRouter);
app.use("/api", authRouter);
app.use("/api", roleRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
