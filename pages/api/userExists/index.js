import User from "@/models/User";
import databaseConnect from "@/utility/mongo";

const handler = async (request, response) => {
  try {
    await databaseConnect();
  } catch (error) {
    response.status(500).json({ success: false, message: error });
  }

  if (request.method === "POST") {
    try {
      const { email } = request.body;

      if (!email) {
        response
          .status(400)
          .json({ success: false, message: "Email field not valid." });
      }

      const userFound = await User.findOne({ email });

      if (userFound === null) {
        response
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      response
        .status(200)
        .json({ success: true, message: "User found.", data: userFound });
    } catch (error) {
      response.status(500).json({ success: false, message: error });
    }
  }

  response
    .status(405)
    .json({ success: false, message: "HTTP method not supported." });
};

export default handler;
