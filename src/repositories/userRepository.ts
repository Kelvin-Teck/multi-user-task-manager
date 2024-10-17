// import models from "@models";
import User from "@models/user.model";
import db from "@models";
import { UserInterface, UserSignInInput } from "@interfaces";


export const createUser = async (data: any): Promise<void> => {
    await db.User.create(data);
};

export const getSingleUserByEmail = async (email: string): Promise<any | null > => {
    const userInfo = await db.User.findOne({ where: { email } });

    return userInfo;
}



export const getSingleUserByPhoneNumber = async (
  phoneNumber: string
): Promise<any | null> => {
  const userInfo = await db.User.findOne({ where: { phoneNumber } });

  return userInfo;
};