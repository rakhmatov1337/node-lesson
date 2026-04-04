import { Router } from "express"
import {
getUsers,
getUser,
createUser,
deleteUser,
uploadUserImage,
register,
login
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createUserSchema, registerSchema, loginSchema } from "../validators/user.validator.js"

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)

router.get("/", getUsers)
router.post("/", validate(createUserSchema), createUser)
router.post("/upload", upload.single("image"), uploadUserImage)
router.get("/:id", getUser)
router.delete("/:id", deleteUser)

export default router