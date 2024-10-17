import db from "@models";
import Task from "@models/task.model";

export const createTask = async (data: any): Promise<void> => {
  await db.Task.create(data);
};

export const retriveSingleTaskById = async (
  taskId: string
): Promise<Task | null> => {
  const task = await db.Task.findByPk(taskId);

  return task;
};

export const assignTask = async (
  assigneeId: string,
  taskId: string
): Promise<void> => {
  console.log(assigneeId, taskId);
  await db.Task.update(
    { assigneeId: assigneeId }, // Fields to update
    { where: { id: taskId } }
  );
};
