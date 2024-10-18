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

export const retriveSingleTaskByUserId = async (
  userId: string
): Promise<Task | null> => {
    const task = await db.Task.findOne({ where: { userId } });

  return task;
};

export const assignTask = async (
  assigneeId: string,
  taskId: string
): Promise<void> => {

  await db.Task.update(
    { assigneeId: assigneeId }, // Fields to update
    { where: { id: taskId } }
  );
};


export const modifyTaskStatus = async (status: string, userId:string): Promise<void> => {
    await db.Task.update({status}, {
        where:{userId}  
    })
}


export const retrieveAllTasksByTag = async (data: any): Promise<Task[] | null> => {
  const taskInfo = await db.Task.findAll({where: {tag: data.tagName}})
  return taskInfo;
}