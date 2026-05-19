// bài học
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate(models) {
      Lesson.belongsTo(models.Section, {
        foreignKey: "sectionId",
        targetKey: "id",
      });
    }
  }
  Lesson.init(
    {
      title: DataTypes.STRING,
      lessonType: DataTypes.ENUM("video", "article", "quiz"),
      videoUrl: DataTypes.STRING,
      content: DataTypes.TEXT,
      duration: DataTypes.INTEGER,
      isPreview: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      orderIndex: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lesson",
      tableName: "lessons",
    },
  );
  return Lesson;
};
