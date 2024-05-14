import { GraphQLError } from "graphql";
import { collection } from "../config/index.js";
import bcrypt from "../helper/bcrypt.js";
import jwt from "../helper/jwt.js";
import { ObjectId } from "mongodb";

export default class User {
  static async findUserById(args, contextValue) {
    const auth = contextValue.authentication();
    const { userId } = args;
    let user = await collection.users
      .aggregate([
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followingId",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "followerId",
                  foreignField: "_id",
                  as: "detail",
                },
              },
              {
                $project: {
                  password: 0,
                },
              },
            ],
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followerId",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "followingId",
                  foreignField: "_id",
                  as: "detail",
                },
              },
              {
                $project: {
                  password: 0,
                },
              },
            ],
            as: "followings",
          },
        },
        {
          $project: {
            password: 0,
          },
        },
        {
          $match: {
            _id: new ObjectId(userId),
          },
        },
      ])
      .toArray();
    console.log("🚀 ~ User ~ findUserById ~ user:", user)
    const followers = user[0].followers.map((item) => ({
      _id: item.detail[0]._id,
      username: item.detail[0].username,
    }));
    const followings = user[0].followings.map((item) => ({
      _id: item.detail[0]._id,
      username: item.detail[0].username,
    }));
    return {
      _id: user[0]._id,
      name: user[0].name,
      username: user[0].username,
      email: user[0].email,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
      followers,
      followings,
    };
  }
  static async getUsers(args, contextValue) {
    const auth = contextValue.authentication();
    const users = await collection.users
      .aggregate([
        {
          $unset: "password",
        },
      ])
      .toArray();
    return users;
  }
  static async getUserByArgs(args, contextValue) {
    const auth = contextValue.authentication();
    const { username } = args;
    const user = await collection.users
      .aggregate([
        {
          $match: {
            username: { $regex: username, $options: "i" },
          },
        },
        {
          $project: {
            password: 0,
          },
        },
      ])
      .toArray();
    return user;
  }
  static async createUser(args) {
    const isUsername = await collection.users.findOne({ username: args.username });
    if (isUsername) {
      throw new GraphQLError("username is already in use", {
        extensions: { code: "BAD_REQUEST" },
      });
    }
    const isEmail = await collection.users.findOne({ email: args.email });
    if (isEmail) {
      throw new GraphQLError("email is already in use", {
        extensions: { code: "BAD_REQUEST" },
      });
    }
    const user = await collection.users.insertOne({
      name: args.name,
      username: args.username,
      email: args.email,
      password: bcrypt.hashPassword(args.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const newUser = await collection.users.findOne(
      {
        _id: user.insertedId,
      },
      {}
    );
    return newUser;
  }
  static async login(args) {
    const { email, password } = args;
    let user = await collection.users.findOne({
      email,
    });
    if (!user) throw new GraphQLError("invalid email/password", { extensions: { code: "UNAUTHORIZED" } });

    const isPasswordValid = bcrypt.comparePassword(password, user.password);
    if (!isPasswordValid) throw new GraphQLError("invalid email/password", { extensions: { code: "UNAUTHORIZED" } });
    const access_token = jwt.signToken({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    return access_token;
  }
}
