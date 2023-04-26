import {getConnection} from "../database/database";


const getArchivo = async (req, res) => {
	try{
		const {idArc} = req.params;
		const connection = await getConnection();
		//const result = await connection.query("SELECT titulo, descripcion, pasos, estado FROM Archivos WHERE idRep = ?", idRep);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// el id es automatico 
const addArchivo = async (req, res) => {
	try{
		// se necesita idRep 


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