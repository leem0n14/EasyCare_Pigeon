module.exports = (sequelize, Sequelize) => {
  const House = sequelize.define(
    "house",
    {
      nfc_id: {
        // INTEGER
        type: Sequelize.STRING,
        allowNull: false,
        field: "nfc_id",
      },
      house_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false, //表示对应列的值不能为空
        // autoIncrement: true, // 这里设置为自增  ||2024年5月12日取消自增
        field: "house_id",
      },
      //   houseName: {
      // 1-2-138
      //     type: Sequelize.STRING,
      //     // allowNull: false,
      //   },
      // 所属仓号 ： 1， 2， 3……
      site_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "site_id",
      },
    },
    {
      freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
      timestamps: false, //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    }
  );

  return House;
};
