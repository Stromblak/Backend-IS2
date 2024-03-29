import { getConnection } from "../database/database";

const getReportes = async (req, res) => {
	try {
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Reportes");
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getReporteNoAsignados = async (req, res) => {
	try {
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Reportes WHERE estado = 0");
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getReportesUsuario = async (req, res) => {
	try {
		const { correo } = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Reportes WHERE correo = ?", correo);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getReporte = async (req, res) => {
	try {
		const { idRep } = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT titulo, descripcion, pasos, estado FROM Reportes WHERE idRep = ?", idRep);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

// el idRep y estado es automatico 
const addReporte = async (req, res) => {
	try {
		const { correo, titulo, descripcion, pasos } = req.body;
		if (correo === undefined || titulo === undefined || descripcion === undefined || pasos === undefined) {
			res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
		}

		const reporte = { correo, titulo, descripcion, pasos };
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO Reportes SET ?", reporte);

		//	esto deberia servir para la subida de archivos, fue lo unico que se me ocurrio
		const id = result["insertId"];
		await connection.query("UPDATE Usuarios SET ultimo_idRep = ? WHERE correo = ?", [id, correo]);

		res.json(result);


	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

// solo deberia poder actualizarse el estado
const updateReporte = async (req, res) => {
	try {
		const { idRep } = req.params;
		const { estado } = req.body;

		if (estado === undefined) {
			res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
		}

		//const reporte = {titulo, descripcion, pasos, estado}; 
		const connection = await getConnection();
		const result = await connection.query("UPDATE Reportes SET estado = ? WHERE idRep = ?", [estado, idRep]);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

// no estoy seguro si esto es un requerimiento
const deleteReporte = async (req, res) => {
	try {
		const { idRep } = req.params;
		const connection = await getConnection();
		const result = await connection.query("DELETE FROM Reportes WHERE idRep = ?", idRep);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

// addAvance 
const addAvance = async (req, res) => {
	try {
		const { idRep, correoDev, comentario } = req.body;
		if (idRep === undefined || correoDev === undefined) {
			res.status(400).json({ message: "Error en el avance. Por favor, rellene todos los campos." });
		}

		const avance = { idRep, correoDev, comentario };
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO Avances SET ?", avance);

		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

//getAvance
const getAvance = async (req, res) => {
	try {
		const { idRep } = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT idAvance, correoDev, fecha FROM Avances WHERE idRep = ?", idRep);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getComentariosAvance = async (req, res) => {
	try {
		const { idRep } = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT comentario, fecha FROM Avances WHERE idRep = ?", idRep);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};


export const methods = {
	getReportes,
	getReporte,
	addReporte,
	getReporteNoAsignados,
	updateReporte,
	deleteReporte,
	getReportesUsuario,
	addAvance,
	getAvance,
	getComentariosAvance
};