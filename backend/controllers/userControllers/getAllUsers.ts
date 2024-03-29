import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const searchQuery = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(searchQuery).find({
    _id: { $ne: req.user?._id },
  });

  res.send(users);
});

export default getAllUsers;
