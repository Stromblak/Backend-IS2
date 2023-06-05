import { getConnection } from "../database/database";

const getDesarrolladores = async (req, res) => {
	try {
		const { software } = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT correoDev FROM haDesarrollado WHERE software = ?", software);
		res.json(result);

	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getAllDevs = async (req, res) => {
	try {
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Devs");
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

const agregarDev = async (req, res) => {
	try {
		const { nombre, apellido, correoDev, hash, esAdmin } = req.body;
		if (!nombre || !apellido || !correoDev || !hash) {
			res.status(400).json({ message: 'Los campos nombre, apellido, correoDev, hash son requeridos' });
			return;
		}
		const connection = await getConnection();
		var sql = `INSERT INTO Devs (nombre, apellido, correoDev, hash, esAdmin) VALUES ('${nombre}', '${apellido}', '${correoDev}', ${hash}, ${esAdmin ? 1 : 0})`
		const result = await connection.query(sql);
		res.json({ message: 'Los campos nombre, apellido, correoDev, hash son requeridos' });
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

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

const getDev = async (req, res) => {
	try {
		const { correoDev } = req.params
		if (correoDev === undefined) {
			res.status(400).json({ message: "Falta el correo del desarollador." });
		}
		const connection = await getConnection();
		const result = await connection.query(`SELECT * FROM Devs WHERE correoDev="${correoDev}")`);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getDevsOf = async (req, res) => {
	try {
		const { software } = req.query
		if (software === undefined) {
			res.status(400).json({ message: "Falta el software." });
		}
		const connection = await getConnection();
		const result = await connection.query(`SELECT * FROM Devs WHERE correoDev IN (SELECT correoDev FROM haDesarrollado WHERE software="${software}")`);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

const getEncargadoDe = async (req, res) => {
	try {
		const { idRep } = req.query;
		console.log(idRep);
		if (idRep === undefined) {
			res.status(400).json({ message: "Falta el idRep." });
		}
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Devs WHERE correoDev IN (SELECT correoDev FROM asignadoA WHERE idRep=?)", idRep);
		res.json(result);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
}

export const methods = {
	getDesarrolladores,
	asignarReporte,
	getSoftware,
	getReportesAsignados,
	getAsignadosDev,
	getDevsOf,
	getDev,
	agregarDev,
	getAllDevs,
	getEncargadoDe
};