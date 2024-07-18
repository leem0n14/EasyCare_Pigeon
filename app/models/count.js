module.exports = (sequelize, Sequelize) => {
  const Count = sequelize.define("count", {
    site_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'site_id'
    },
    death_sum: {  // 鸽子死亡总数
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'death_sum'
    },
    day_death: {  // 鸽子一天死亡总数
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'day_death',
      defaultValue: 0 // 默认值为0
    },
    time: { // 数据更新时间
      type: Sequelize.DATE, //日期类型
      allowNull: true,
      field: 'time'
    }
  }, {
    freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
    timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
  })

  return Count
}