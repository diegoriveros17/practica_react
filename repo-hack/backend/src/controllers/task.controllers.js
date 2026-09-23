import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllTasks = async (req, res) => {
 
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "person_id"],
          },
          include: [
            {
              model: PersonModel,
              as: "person",
            },
          ],
        },
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllTasksByUserId = async (req, res) => {
  const userLoggedId = req.user.id;

  try {
    const tasks = await TaskModel.findAll({
      where: {
        user_id: userLoggedId,
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "person_id"],
          },
          include: [
            {
              model: PersonModel,
              as: "person",
            },
          ],
        },
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createTask = async (req, res) => {
  const userLoggedId = req.user.id;

  const { title, description, is_completed } = req.body;

  try {
    const newTask = await TaskModel.create({
      title,
      description,
      is_completed,
      user_id: userLoggedId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, is_completed } = req.body;

  try {
    await TaskModel.update(
      { title, description, is_completed },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    return res.status(200).json({ msg: "actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findByPk(id);

    await task.destroy();

    return res.status(200).json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
