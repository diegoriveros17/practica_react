import { body, param } from "express-validator";

export const updateUserValidation = [
  param("id")
    .isLength({ max: 5 })
    .withMessage("El id no debe ser mayor a 5 caracteres"),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("El username no debe ser vacio"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La password no debe ser vacia"),
  body("person_id")
    .optional()
    .notEmpty()
    .withMessage("El person_id no debe ser vacio"),
];
