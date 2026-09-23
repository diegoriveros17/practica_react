import { body, param } from "express-validator";

export const updatePersonValidation = [
  param("id")
    .isLength({ max: 5 })
    .withMessage("El id no debe ser mayor a 5 caracteres"),
  body("name").optional().notEmpty().withMessage("El name no debe ser vacio"),
  body("lastname")
    .optional()
    .notEmpty()
    .withMessage("El lastname no debe ser vacio"),
];
