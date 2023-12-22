import User from "@/models/User";
import databaseConnect from "@/utility/mongo";
import bcrypt from "bcryptjs";

const handler = async (request, response) => {
  try {
    await databaseConnect();
  } catch (error) {
    response.status(500).json({ success: false, message: error });
  }

  if (request.method === "POST") {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        response
          .status(400)
          .json({ success: false, message: "All fields must be valid." });
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
          message: "User registered.",
          data: createdUser,
        });
      }

      response
        .status(500)
        .json({ success: false, message: "User could not be created." });
    } catch (error) {
      response.status(500).json({ success: false, message: error });
    }
  }

  response
    .status(405)
    .json({ success: false, message: "HTTP method not supported." });
};

export default handler;
