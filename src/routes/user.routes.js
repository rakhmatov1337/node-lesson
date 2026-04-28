import { Router } from "express"
import {
getUsers,
getUser,
createUser,
deleteUser,
uploadUserImage
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { createUserSchema } from "../validators/user.validator.js"

const router = Router()

router.get("/", getUsers)
router.post("/", validate(createUserSchema), createUser)
router.post("/upload", upload.single("image"), uploadUserImage)
router.get("/:id", getUser)
router.delete("/:id", deleteUser)

export default router