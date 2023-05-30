import express from "express";
import morgan from "morgan";

// Routes
import usuarioRoutes from "./routes/usuario.routes";
import reporteRoutes from "./routes/reporte.routes";
import archivoRoutes from "./routes/archivo.routes";
//import adminRoutes from "./routes/admin.routes";
//import devRoutes from "./routes/dev.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/archivos", archivoRoutes);
//app.use("/api/admin", adminRoutes);
//app.use("/api/dev", devRoutes);

export default app;