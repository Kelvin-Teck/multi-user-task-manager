// import models from "@models";
import User from "@models/user.model";
import db from "@models";
import { UserInterface, UserSignInInput } from "@interfaces";


export const createUser = async (data: any): Promise<void> => {
    await db.User.create(data);//commit user into the DB
};

export const getSingleUserByEmail = async (email: string): Promise<any | null > => {
    const userInfo = await db.User.findOne({ where: { email } });//Retrives user Info 

    return userInfo;
}

export const getSingleUserByPhoneNumber = async (
  phoneNumber: string
): Promise<any | null> => {
  const userInfo = await db.User.findOne({ where: { phoneNumber } });//get a user by phone 

  return userInfo;
};

export const retriveSingleUserById = async (assigneeId: string): Promise<User | null> => {
  const userInfo = await db.User.findByPk(assigneeId);//Gey a single user by Id

  return userInfo;
}