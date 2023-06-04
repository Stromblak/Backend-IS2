import { getConnection } from "../database/database";

const getDesarrolladores = async (req, res) => {
	try {
		const { software } = req.body;
		const connection = await getConnection();
		const result = await connection.query("SELECT correoDev FROM haDesarrollado WHERE software = ?", software);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const asignarReporte = async (req, res) => {
	try {
		const { idRep, correoDev } = req.body;
		if (correoDev === undefined) {
			res.status(400).json({ message: "Faltan datos por ingresar." });
		}
		const connection = await getConnection();
		var sql = "INSERT INTO asignadoA (idRep, correoDev) VALUES (" + idRep + ", \"" + correoDev + "\")";
		const result = await connection.query(sql);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getSoftware = async (req, res) => {
	try {
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Softwares");
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getReportesAsignados = async (req, res) => {
	try {
		const connection = await getConnection();
		const result = await connection.query("SELECT idRep, correoDev FROM asignadoA");
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getAsignadosDev = async (req, res) => {
	try {
		const { correoDev } = req.param;
		if (correoDev === undefined) {
			res.status(400).json({ message: "Falta el correo del desarollador." });
		}
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM asignadoA WHERE reporteListo = 0 AND correoDev = ?", correoDev);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getDevsOf = async (req, res) => {
	try {
		const { correoDev } = req.params
		const connection = await getConnection();
		const result = await connection.query(`SELECT * FROM Devs WHERE correoDev="${correoDev}")`);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getDev = async (req, res) => {
	try {
		const { software } = req.query
		const connection = await getConnection();
		const result = await connection.query(`SELECT * FROM Devs WHERE correoDev IN (SELECT correoDev FROM haDesarrollado WHERE software="${software}")`);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const methods = {
	getDesarrolladores,
	asignarReporte,
	getSoftware,
	getReportesAsignados,
	getAsignadosDev,
	getDevsOf,
	getDev
};