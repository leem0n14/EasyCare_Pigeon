module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "role",
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "username",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "password",
      },
      canghao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "canghao",
      },
      realName: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "realName",
      },
    },
    {
      freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
      timestamps: false, //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    }
  );

  //2.导出模型
  return User;
};
