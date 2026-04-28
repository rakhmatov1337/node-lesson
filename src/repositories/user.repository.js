import { pool } from "../config/db.js";

export const findAllUsers = async () => {
	const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
	return result.rows;
};

export const findUserById = async (id) => {
	const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
	return result.rows[0];
};

export const createUser = async ({ name, email, age }) => {
	const result = await pool.query(
		"INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
		[name, email, age],
	);
	return result.rows[0];
};

export const deleteUserById = async (id) => {
	const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
	return result.rows[0];
};