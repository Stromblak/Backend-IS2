import {getConnection} from "./../database/database";

const getLanguages = async (req, res) => {
	try{
		const connection = await getConnection();
		const result = await connection.query("SELECT * FROM Reportes");
		res.json(result);
	}catch(error){
		res.status(500);
		res.send(error.message);
	}
	
};

const getLanguage = async (req, res) => {
    try {
        const { idRep } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idRep, titulo, descripcion, pasos, estado FROM Reportes WHERE idRep = ?", idRep);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {
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

const updateLanguage = async (req, res) => {
    try {
        const {idRep} = req.params;
		const {titulo, descripcion, pasos, estado} = req.body;
		if (idRep === undefined || titulo === undefined || descripcion === undefined || pasos === undefined || estado === undefined) {
            res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
        }
		const language={titulo, descripcion, pasos, estado}; 
        const connection = await getConnection();
        const result = await connection.query("UPDATE Reportes SET ? WHERE idRep = ?", [language, idRep]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage= async (req, res) => {
	try{
		const { idRep, titulo, descripcion, pasos, estado} = req.body;
		if (idRep === undefined || titulo === undefined || descripcion === undefined || pasos === undefined || estado === undefined) {
            res.status(400).json({ message: "Error en el reporte. Porfavor rellene todos los campos." });
        }
		const language={idRep, titulo, descripcion, pasos, estado};
		const connection = await getConnection();
		const result = await connection.query("INSERT INTO Reportes SET ?", language);
		res.json("addLanguage");
	}catch(error){
		res.status(500);
		res.send(error.message);
	}
	
};
export const methods = {
	getLanguages,
	getLanguage,
	addLanguage,
	updateLanguage,
	deleteLanguage
};