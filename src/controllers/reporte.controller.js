import {getConnection} from "../database/database";

const getReportes = async (req, res) => {
	try{
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Reportes");
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

const getReporte = async (req, res) => {
	try{
		const {idRep} = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT titulo, descripcion, pasos, estado FROM Reportes WHERE idRep = ?", idRep);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// el idRep y estado es automatico 
const addReporte = async (req, res) => {
	try{
		const {correo, titulo, descripcion, pasos} = req.body;
		if (correo === undefined || titulo === undefined || descripcion === undefined || pasos === undefined) {
			res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
		}

		const reporte={correo, titulo, descripcion, pasos};
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO Reportes SET ?", reporte);

		//	esto deberia servir para la subida de archivos, fue lo unico que se me ocurrio
		const id = result["insertId"];
		await connection.query("UPDATE Usuarios SET ultimo_idRep = ? WHERE correo = ?", [id, correo]);

		res.json(result);

		
	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// solo deberia poder actualizarse el estado
const updateReporte = async (req, res) => {
	try{
		const {idRep} = req.params;
		const {estado} = req.body;

		if (estado === undefined) {
			res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
		}

		//const reporte = {titulo, descripcion, pasos, estado}; 
		const connection = await getConnection();
		const result = await connection.query("UPDATE Reportes SET estado = ? WHERE idRep = ?", [estado, idRep]);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// no estoy seguro si esto es un requerimiento
const deleteReporte = async (req, res) => {
	try{
		const { idRep } = req.params;
		const connection = await getConnection();
		const result = await connection.query("DELETE FROM Reportes WHERE idRep = ?", idRep);
		res.json(result);

	}catch (error){
		res.status(500);
		res.send(error.message);
	}
};

export const methods = {
	getReportes,
	getReporte,
	addReporte,
	updateReporte,
	deleteReporte
};