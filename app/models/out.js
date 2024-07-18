module.exports = (sequelize, Sequelize) => {
  const Out = sequelize.define(
    "out",
    {
      site_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "site_id",
      },
      house_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "house_id",
      },
      cage_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "cage_id",
      },
      out_time: {
        type: Sequelize.DATE, //日期类型
        allowNull: true,
        field: "out_time",
      },
    },
    {
      freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
      timestamps: false, //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    }
  );

  //2.导出模型
  return Out;
};
