import transporter from "@config/transporter";

export const sendAssigneeNotificationMail = async (userData: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userData.assigneeEmailAddress,
    subject: "Task Assignment ",
    template: "assigntask.hbs",
    context: {
      firstName: userData.assigneeFirstName,
      lastname: userData.assigneeLastName,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
