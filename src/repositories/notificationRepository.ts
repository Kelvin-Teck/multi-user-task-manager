import db from "@models"

export const createNotification = async (notificationData: any) : Promise<void> => {
    await db.Notification.create(notificationData);//commit notification data to the DB
}
