import {getConnection} from "../database/database";

const getDesarrolladores = async (req, res) => {
	try{
		const {software} = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT correoDev FROM haDesarrollado WHERE software = ?", software);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

const asignarReporte = async (req, res) => {
	try{
		const {idRep, correoDev} = req.body;
		if (idRep === undefined || correoDev === undefined) {
			res.status(400).json({ message: "Faltan datos por ingresar." });
		}

		const asignacion = {idRep, correoDev};
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO asignadoA SET ?", asignacion);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

export const methods = {
	getDesarrolladores,
    asignarReporte,
};