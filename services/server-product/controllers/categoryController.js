const { Post, Tag, User, Category } = require("../models");

class categoryController {
  static async fetchCategory(req, res, next) {
    try {
      const { count, rows } = await Category.findAndCountAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        message: "Success get category",
        data: rows,
        count: count,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const response = await Category.create({
        name,
      });
      res.status(201).json({
        message: "Category added successfully",
        data: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const searchResult = await Category.findByPk(id);
      // nanti auth beda admin gak bisa update ?

      if (!searchResult) {
        throw new Error("CATEGORy_NOT_FOUND");
      }
      const result = await Tag.update(
        {
          name,
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

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const searchResult = await Category.findByPk(id);
      if (!searchResult) {
        throw new Error("CATEGORY_NOT_FOUND");
      }
      const result = await Category.destroy({
        where: { id },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = categoryController;
