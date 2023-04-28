import {getConnection} from "../database/database";


const getArchivo = async (req, res) => {
	try{
		const {idArc} = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Archivos WHERE idRep = ?", idArc);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// solo se necesita el archivo y correo 
const addArchivo = async (req, res) => {
	try{
		const { idArc, idRep, archivo } = req.body;
		if (idArc === undefined || idRep === undefined) {
			res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
		}
		const file = { idArc, idRep, archivo };	
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO Archivos SET = ?", file);
		//const idRep = result[0]["ultimo_idRep"];

		// codigo para subir el archivo



		console.log(idRep);

		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};


const deleteArchivo = async (req, res) => {
	try{
		const {idArc} = req.params;
		const connection = await getConnection();
		const result = await connection.query("DELETE FROM Archivos WHERE idArc = ?", idArc);
		res.json(result);


	}catch (error){
		res.status(500);
		res.send(error.message);
	}
};

export const methods = {
	getArchivo,
	addArchivo,
	deleteArchivo
};