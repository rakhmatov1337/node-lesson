import * as userRepository from "../repositories/user.repository.js"
import mongoose from "mongoose"

export const getAllUsers = async (query) => {
	const filters = {}

	if (query.age) {
		filters.age = query.age
	}

	if (query.name) {
		filters.name = query.name
	}

	const page = parseInt(query.page, 10) || 1
	const limit = parseInt(query.limit, 10) || 10

	return userRepository.findAllUsers(filters, page, limit)
}

export const getUserById = async (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("Invalid user ID format")
		error.statusCode = 400
		throw error
	}

	const user = await userRepository.findUserById(id)

	if (!user) {
		const error = new Error("User not found")
		error.statusCode = 404
		throw error
	}

	return user
}

export const createUser = async (data) => {
	const { name, email, age, userImage } = data

	const existingUser = await userRepository.findUserByEmail(email)

	if (existingUser) {
		const error = new Error("Email already exists")
		error.statusCode = 400
		throw error
	}

	return userRepository.createUser({ name, email, age, userImage })
}

export const deleteUser = async (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("Invalid user ID format")
		error.statusCode = 400
		throw error
	}

	const deletedUser = await userRepository.deleteUserById(id)

	if (!deletedUser) {
		const error = new Error("User not found")
		error.statusCode = 404
		throw error
	}

	return deletedUser
}