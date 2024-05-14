import { ObjectId } from "mongodb";
import { collection, redis } from "../config/index.js";

export default class Post {
  static async findPostById(args, contextValue) {
    const auth = contextValue.authentication();
    const { postId } = args;
    console.log("🚀 ~ Post ~ findPostById ~ postId:", postId);
    const post = await collection.posts
      .aggregate([
        { $match: { _id: new ObjectId(postId) } },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
            pipeline: [
              {
                $project: {
                  password: 0,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: false,
          },
        },
      ])
      .toArray();
    console.log("🚀 ~ Post ~ findPostById ~ post:", post);
    return post[0];
  }
  static async getPost(contextValue) {
    const auth = contextValue.authentication();
    let post = await redis.get("post");
    console.log("🚀 ~ Post ~ getPost ~ post:", post);
    if (post) {
      return JSON.parse(post);
    } else {
      post = await collection.posts
        .aggregate([
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
              pipeline: [
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$author",
              preserveNullAndEmptyArrays: false,
            },
          },
        ])
        .toArray();
      await redis.set("post", JSON.stringify(post));
    }
    return post;
  }
  static async createPost(args, contextValue) {
    const auth = contextValue.authentication();
    const { content, tags, imgUrl } = args;
    const post = await collection.posts.insertOne({
      content,
      tags,
      imgUrl,
      authorId: new ObjectId(auth._id),
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const newPost = await collection.posts.findOne({
      _id: post.insertedId,
    });
    await redis.del("post");
    return newPost;
  }
  static async createComment(args, contextValue) {
    const auth = contextValue.authentication();
    const { postId, content } = args;
    const comment = await collection.posts.updateOne(
      { _id: new ObjectId(postId) }, // Filter dokumen yang ingin diupdate
      {
        $push: {
          comments: {
            $each: [
              {
                username: auth.username,
                content: content,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            $sort: {
              createdAt: -1,
            },
          },
        },
      }
    );
    await redis.del("post");
    return "success add comment";
  }
  static async createLike(args, contextValue) {
    const auth = contextValue.authentication();
    const { postId } = args;
    const isLiked = await collection.posts.findOne({ _id: new ObjectId(postId), "likes.username": auth.username });
    if (isLiked) {
      await collection.posts.updateOne(
        {
          _id: new ObjectId(postId),
        },
        {
          $pull: {
            likes: {
              username: auth.username,
            },
          },
        }
      );
      await redis.del("post");
      return 'success unlike'
    } else {
      await collection.posts.updateOne(
        { _id: new ObjectId(postId) }, // Filter dokumen yang ingin diupdate
        {
          $push: {
            likes: {
              $each: [
                {
                  username: auth.username,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
              $sort: {
                createdAt: -1,
              },
            },
          },
        }
      );
      await redis.del("post");
      return "success add like";
    }
  }
}
