import express from "express";
import morgan from "morgan";

// Routes
import reporteRoutes  from "./routes/reporte.routes";
import usuarioRoutes  from "./routes/usuario.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/reportes", reporteRoutes);
app.use("/api/usuarios", usuarioRoutes);          //TODO: implementando...

export default app;