module.exports = (sequelize, Sequelize) => {
  const Stay = sequelize.define(
    "stay",
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
      stay_time: {
        // 留窝的日期
        type: Sequelize.DATE, //日期类型
        owNull: true,
        field: "stay_time",
      },
      statu: {
        // 是否已经处理了该鸽笼雏鸟
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "statu",
        defaultValue: 0, // 默认值为未处理
      },
    },
    {
      freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
      timestamps: false, //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    }
  );

  return Stay;
};
