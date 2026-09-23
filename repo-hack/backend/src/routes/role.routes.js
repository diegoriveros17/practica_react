import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/role.controllers.js";
import {
  createRoleValidation,
  updateRoleValidation,
} from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const roleRouter = Router();

roleRouter.get("/roles", authMiddleware, getAllRoles);
roleRouter.post(
  "/roles",
  authMiddleware,
  createRoleValidation,
  validate,
  createRole,
);
roleRouter.put(
  "/roles/:id",
  authMiddleware,
  updateRoleValidation,
  validate,
  updateRole,
);
roleRouter.delete("/roles/:id", authMiddleware, deleteRole);
