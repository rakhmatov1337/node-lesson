import Joi from "joi";

export const createUserSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	email: Joi.string().email().required(),
    age: Joi.number().min(0).max(120).optional(),
    userImage: Joi.string().optional(),
});