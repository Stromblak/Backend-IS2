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

//	solo se necesita el archivo y correo
//	idArc es automatico, idRep se consigue con el correo para facilitar el trabajo al frontend
//	ejecutar solo despues de insertar un nuevo reporte
const addArchivo = async (req, res) => {
	try{
		const { correo, archivo } = req.body;
		if (correo === undefined || archivo === undefined) {
			res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
		}
		const connection = await getConnection();

		// busqueda de idRep
		const resultId = await connection.query("SELECT ultimo_idRep FROM Usuarios WHERE correo = ?", correo);
		const idRep = resultId[0]["ultimo_idRep"];
	
		const file = { idRep, archivo };	
		const result = await connection.query("INSERT INTO Archivos SET = ?", file);


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