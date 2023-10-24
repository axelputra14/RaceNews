const { Post, Tag, Category, sequelize } = require("../models");

class postController {
  static async fetchPost(req, res, next) {
    try {
      const { count, rows } = await Post.findAndCountAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Tag,
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json({
        message: "Success get post",
        data: rows,
        count: count,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchPostById(req, res, next) {
    try {
      const { id } = req.params;

      const response = await Post.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Tag,
            attributes: ["name"],
          },
        ],
      });
      if (!response) {
        throw new Error("POST_NOT_FOUND");
      }
      res.status(200).json({
        message: `Success get post`,
        response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { title, content, imgUrl, categoryId, tags, authorId } = req.body;

      const response = await Post.create(
        {
          title,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        { transaction: trx }
      );

      if (tags) {
        tags.forEach((el) => {
          el.createdAt = el.updatedAt = new Date();
        });

        const responseTag = await Tag.bulkCreate(tags, {
          validate: true,
          transaction: trx,
        });
      }
      await trx.commit();
      res.status(201).json({
        message: "Post added successfully",
        data: response,
      });
    } catch (err) {
      await trx.rollback();
      next(err);
    }
  }

  static async updatePost(req, res, next) {
    try {
      // ini put
      const { id } = req.params;
      const { title, slug, content, imgUrl, categoryId } = req.body;
      // const { userId } = req.extraData;
      const searchResult = await Post.findByPk(id);
      // nanti auth beda admin gak bisa update ?

      if (!searchResult) {
        throw new Error("POST_NOT_FOUND");
      }

      const result = await Post.update(
        {
          title,
          slug,
          content,
          imgUrl,
          categoryId,
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
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const searchResult = await Post.findByPk(id);
      if (!searchResult) {
        throw new Error("POST_NOT_FOUND");
      }
      const result = await Post.destroy({
        where: { id },
      });
      res.status(200).json({
        statusCode: 200,
        message: `${searchResult.title} successfully deleted`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = postController;
