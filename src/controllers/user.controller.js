import * as userService from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
	try {
		const users = await userService.getUsers();
		res.json(users);
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await userService.getUser(Number(req.params.id));
		res.json(user);
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req, res, next) => {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const user = await userService.deleteUser(Number(req.params.id));
		res.json({
			message: "User deleted",
			user,
		});
	} catch (error) {
		next(error);
	}
};