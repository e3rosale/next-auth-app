import User from "@/models/User";
import {
  DATABASE_CONNECTION_ERROR,
  ERROR_DURING_USER_REGISTRATION,
  FIELDS_NOT_VALID,
  HTTP_METHOD_NOT_SUPPORTED,
  USER_COULD_NOT_BE_REGISTERED,
  USER_REGISTERED,
} from "@/utility/constants";
import databaseConnect from "@/utility/mongo";
import bcrypt from "bcryptjs";

const handler = async (request, response) => {
  try {
    await databaseConnect();
  } catch (error) {
    // TODO: Log error in server logs
    // serverLogger.log(error);
    response
      .status(500)
      .json({ success: false, message: DATABASE_CONNECTION_ERROR });
  }

  if (request.method === "POST") {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        response
          .status(400)
          .json({ success: false, message: FIELDS_NOT_VALID });
      }

      const userExistsResponse = await fetch(
        "http://localhost:3000/api/userExists",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (userExistsResponse.status === 404) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        response.status(201).json({
          success: true,
          message: USER_REGISTERED,
          data: createdUser,
        });
      }

      response
        .status(500)
        .json({ success: false, message: USER_COULD_NOT_BE_REGISTERED });
    } catch (error) {
      // TODO: Log error in server logs
      // serverLogger.log(error)
      response.status(500).json({
        success: false,
        message: ERROR_DURING_USER_REGISTRATION,
      });
    }
  }

  response
    .status(405)
    .json({ success: false, message: HTTP_METHOD_NOT_SUPPORTED });
};

export default handler;
