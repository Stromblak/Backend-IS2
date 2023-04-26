import express from "express";
import morgan from "morgan";

// Routes
import usuarioRoutes from "./routes/usuario.routes";
import reporteRoutes from "./routes/reporte.routes";
import archivoRoutes from "./routes/archivo.routes";


const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/usuarios", usuarioRoutes);          //TODO: implementando...
app.use("/api/reportes", reporteRoutes);
app.use("/api/archivos", archivoRoutes);


export default app;