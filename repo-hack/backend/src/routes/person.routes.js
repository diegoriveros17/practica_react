import { Router } from "express";
import {
  deletePerson,
  getAllPeople,
  updatePerson,
} from "../controllers/person.controllers.js";
import { updatePersonValidation } from "../middlewares/validations/person.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const personRouter = Router();

personRouter.get("/people", authMiddleware, getAllPeople);
personRouter.put(
  "/people/:id",
  authMiddleware,
  updatePersonValidation,
  validate,
  updatePerson,
);
personRouter.delete("/people/:id", authMiddleware, deletePerson);
