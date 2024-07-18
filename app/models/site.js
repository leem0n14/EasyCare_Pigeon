/* module.exports = (sequelize, Sequelize) => {
  const Site = sequelize.define("site", {
    name: {
      type: Sequelize.STRING, //STRING类型对应Mysql中的varchar类型
      allowNull: true,
      field: 'name'
    },
  }, {
    freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
    timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
  })

  return Site
} */