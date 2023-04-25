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
		res.send("Error 404: Usuario no encontrado");
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

// solo deberia poder actualizarse el estado
const updateUsuario = async (req, res) => {
	try{
		const {correo} = req.params;
		const {hash} = req.body;

		if (hash === undefined) {
			res.status(400).json({ message: "Error al actualizar contraseña. Porfavor inténtelo denuevo." });
		}

		//const reporte = {titulo, descripcion, pasos, estado}; 
		const connection = await getConnection();
		const result = await connection.query("UPDATE Usuarios SET hash = ? WHERE correo = ?", [hash, correo]);
		res.json(result);

	}catch(error){
		res.status(500);
		res.send(error.message);
	}
};

// no estoy seguro si esto es un requerimiento
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

export const methods = {
	getUsuarios,
	getUsuario,
	addUsuario,
	updateUsuario,
	deleteUsuario
};