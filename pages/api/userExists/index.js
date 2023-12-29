import User from "@/models/User";
import {
  DATABASE_CONNECTION_ERROR,
  EMAIL_FIELD_NOT_VALID,
  ERROR_DURING_USER_LOOKUP,
  HTTP_METHOD_NOT_SUPPORTED,
  USER_FOUND,
  USER_NOT_FOUND,
} from "@/utility/constants";
import databaseConnect from "@/utility/mongo";

const handler = async (request, response) => {
  try {
    await databaseConnect();
  } catch (error) {
    // TODO: Log error in server logs
    // serverLogger.log(error)
    response
      .status(500)
      .json({ success: false, message: DATABASE_CONNECTION_ERROR });
  }

  if (request.method === "POST") {
    try {
      const { email } = request.body;

      if (!email) {
        response
          .status(400)
          .json({ success: false, message: EMAIL_FIELD_NOT_VALID });
      }

      const userFound = await User.findOne({ email });

      if (userFound === null) {
        response.status(404).json({ success: false, message: USER_NOT_FOUND });
      }

      response
        .status(200)
        .json({ success: true, message: USER_FOUND, data: userFound });
    } catch (error) {
      // TODO: Log error in server logs
      // serverLogger.log(error)
      response
        .status(500)
        .json({ success: false, message: ERROR_DURING_USER_LOOKUP });
    }
  }

  response
    .status(405)
    .json({ success: false, message: HTTP_METHOD_NOT_SUPPORTED });
};

export default handler;
