const { Post, Tag, User, Category } = require("../models");

class tagController {
  static async fetchTag(req, res, err) {
    try {
      const { count, rows } = await Tag.findAndCountAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Post,
            attributes: ["slug"],
          },
        ],
      });
      res.status(200).json({
        message: "Success get tag",
        data: rows,
        count: count,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async addTag(req, res, err) {
    try {
      const { name, postId } = req.body;
      const response = await Tag.create({
        name,
        postId,
      });
      res.status(201).json({
        message: "Tag added successfully",
        data: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateTag(req, res, err) {
    try {
      const { id } = req.params;
      const { name, postId } = req.body;
      const searchResult = await Tag.findByPk(id);
      // nanti auth beda admin gak bisa update ?

      if (!searchResult) {
        throw new Error("TAG_NOT_FOUND");
      }
      const result = await Tag.update(
        {
          name,
          postId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        statusCode: 200,
        message: `Successfully updated`,
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteTag(req, res, err) {
    try {
      const { id } = req.params;
      const searchResult = await Tag.findByPk(id);
      if (!searchResult) {
        throw new Error("TAG_NOT_FOUND");
      }
      const result = await Tag.destroy({
        where: { id },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = tagController;
