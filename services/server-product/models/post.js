"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, { foreignKey: "categoryId" });
      Post.hasMany(models.Tag, { foreignKey: "postId" });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title cannot be empty" },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Content cannot be empty" },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.slug = instance.title.toLowerCase().split(" ").join("-");
        },
      },
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
