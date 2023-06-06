import {getConnection} from "../database/database";

const getUsuarios = async (req, res) => {
	try{
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Usuarios");
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

const getUsuario = async (req, res) => {
	try{
		const {correo} = req.params;
		const connection = await getConnection();
		const result = await connection.query("SELECT correo FROM Usuarios WHERE correo = ?", correo);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};


const addUsuario = async (req, res) => {
	try{
		const {correo, hash} = req.body;
		if (correo === undefined || hash === undefined) {
			res.status(400).json({ message: "Error al crear usuario. Porfavor rellene todos los campos." });
		}

		const usuario = {correo, hash};
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO Usuarios SET ?", usuario);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// Para actualizar clave de Usuario
const updateUsuario = async (req, res) => {
	try{
		const {correo} = req.params;
		const {hash} = req.body;

		if (hash === undefined) {
			res.status(400).json({ message: "Error al actualizar contraseña. Porfavor inténtelo denuevo." });
		}

		const connection = await getConnection();
		const result = await connection.query("UPDATE Usuarios SET hash = ? WHERE correo = ?", [hash, correo]);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// Eliminar Usuario de la Base de Datos
const deleteUsuario = async (req, res) => {
	try{
		const { correo } = req.params;
		const connection = await getConnection();
		const result = await connection.query("DELETE FROM Usuarios WHERE correo = ?", correo);
		res.json(result);

	}catch (error){
		res.status(500);
		res.send(error.message);
	}
};

// Verificacion de Usuario para Login
const verifyUsuario = async (req, res) => {
	try{
		const {correo, hash} = req.body;
		if (correo === undefined || hash === undefined) {
			res.status(400).json({ message: "Error al buscar usuario. Porfavor rellene todos los campos." });
		}

		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Usuarios WHERE correo = ? AND hash = ?", [correo, hash]);
		(result[0] === undefined) ? res.json(false) : res.json(true);
	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

export const methods = {
	getUsuarios,
	getUsuario,
	addUsuario,
	updateUsuario,
	deleteUsuario,
	verifyUsuario
};