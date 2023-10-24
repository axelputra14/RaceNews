const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    return this.getCollections().insertOne({
      email: user.email,
      username: user.username,
      role: user.role,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteUser(objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }
}

module.exports = User;
