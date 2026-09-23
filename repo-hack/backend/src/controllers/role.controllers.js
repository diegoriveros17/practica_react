import { matchedData } from "express-validator";
import { RoleModel } from "../models/role.model.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll();

    return res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createRole = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const role = await RoleModel.create(data);

    return res.status(201).json(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }

    await RoleModel.update(data, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ msg: "actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await RoleModel.findByPk(id);

    await role.destroy();

    return res.status(200).json({ msg: "Rol eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
