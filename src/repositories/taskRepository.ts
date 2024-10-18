import db from "@models";
import Task from "@models/task.model";

export const createTask = async (data: any): Promise<void> => {
  await db.Task.create(data);
};

export const retriveSingleTaskById = async (
  taskId: string
): Promise<Task | null> => {
  const task = await db.Task.findByPk(taskId);//retrieve task data by task Id

  return task;
};

export const retrieveTaskSingleByTitleAndDescription = async (
  data: any
): Promise<Task | null> => {
  const taskInfo = await db.Task.findOne({
    where: { title: data.title, description: data.description },
  });//Retrive a Single Task From the DB by Title and Description

  return taskInfo;
};

export const retriveSingleTaskByUserId = async (
  userId: string
): Promise<Task | null> => {
  const task = await db.Task.findOne({ where: { userId } });//Retrieves Task data by user Id

  return task;
};

export const assignTask = async (
  assigneeId: string,
  taskId: string
): Promise<void> => {
  await db.Task.update(
    { assigneeId: assigneeId }, // Fields to update
    { where: { id: taskId } }
  );//update a Task assignId Row
};

export const modifyTaskStatus = async (
  status: string,
  userId: string
): Promise<void> => {
  await db.Task.update(
    { status },
    {
      where: { userId },
    }
  );//update the status Row of Task table
};

export const retrieveAllTasksByTag = async (
  data: any
): Promise<Task[] | null> => {
  const taskInfo = await db.Task.findAll({ where: { tag: data.tagName } });//Retrieve Data byTag
  return taskInfo;
};


export const retrieveAllTasks = async (data: any) => {
  const { tag, status, sort } = data;
  const query: any = {};

  // Dynamically build the query object based on provided filters
  if (tag) {
    query.tag = tag; // Assuming 'tag' is a field in the Task model
  }

  if (status) {
    query.status = status; // Assuming 'status' is a field in the Task model
  }

  // Fetch tasks from the database with filtering
  const tasks = await db.Task.findAll({
    where: query,
    order: sort ? [[sort.field, sort.order]] : undefined, // Sort if sortBy is provided
  });

  return tasks;
};
