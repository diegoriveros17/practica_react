import { body, param } from "express-validator";

export const createRoleValidation = [
  body("rolename").notEmpty().withMessage("El rolename no debe ser vacio"),
];

export const updateRoleValidation = [
  param("id")
    .isLength({ max: 5 })
    .withMessage("El id no debe ser mayor a 5 caracteres"),
  body("rolename")
    .optional()
    .notEmpty()
    .withMessage("El rolename no debe ser vacio"),
];
