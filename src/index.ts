import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import sequelize from "./database";

const PORT = process.env.PORT || 4000;

const startApp = async () => {
  try {
    app.listen(PORT, async () => {
      await sequelize.authenticate();

      console.log(
        "Connection has been established to the Database successfully."
      );
      console.log(`server running on ${process.env.DEV_ORIGIN}${PORT}......`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
