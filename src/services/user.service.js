import * as userRepository from "../repositories/user.repository.js";

export const getUsers = async () => {
	return userRepository.findAllUsers();
};

export const getUser = async (id) => {
	const user = await userRepository.findUserById(id);

	if (!user) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	return user;
};

export const createUser = async (data) => {
	const { name, email, age } = data;

	if (!name || !email) {
		const error = new Error("Name and email are required");
		error.statusCode = 400;
		throw error;
	}

	return userRepository.createUser({ name, email, age });
};

export const deleteUser = async (id) => {
	const deletedUser = await userRepository.deleteUserById(id);

	if (!deletedUser) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	return deletedUser;
};