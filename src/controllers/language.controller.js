import {getConnection} from "./../database/database";

const getLanguage = async (req, res) => {
	const connection = await getConnection();
	const result = await connection.query("SELECT * FROM Reportes");
	console.log(result);
	res.json(result);
};

export const methods = {
	getLanguage
};