import { ObjectId } from "mongodb";
import { collection } from "../config/index.js";

export default class Follow {
  static async createFollow(args, contextValue) {
    const auth = contextValue.authentication();
    const { followingId } = args;
    const isFollow = await collection.follows.findOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(auth._id)
    })
    console.log("🚀 ~ Follow ~ createFollow ~ isFollow:", isFollow)
    if (isFollow) {
      await collection.follows.deleteOne({ _id: new ObjectId(isFollow._id) });
      return `you are now unfollowing`;
    } else {
      await collection.follows.insertOne({
        followingId: new ObjectId(followingId),
        followerId: new ObjectId(auth._id),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const following = await collection.users.findOne({
        _id: new ObjectId(followingId),
      });
      return `you are now following ${following.username}`;
    }
  }
}
