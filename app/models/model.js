module.exports = (sequelize, Sequelize) => {
  const Query = sequelize.define(
    "queries",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Keyword: {
        type: Sequelize.STRING,
      },
      Country: {
        type: Sequelize.STRING,
      },
      Difficulty: {
        type: Sequelize.INTEGER,
        null: true,
      },
      Volume: {
        type: Sequelize.INTEGER,
        null: true,
      },
      CPC: {
        type: Sequelize.DOUBLE,
        null: true,
      },
      Clicks: {
        type: Sequelize.INTEGER,
        null: true,
      },
      CPS: {
        type: Sequelize.DOUBLE,
        null: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return Query;
};
