module.exports = (sequelize, Sequelize) => {
  const Abnormal = sequelize.define('abnormal', {
    // id: {
    //   type: Sequelize.INTEGER, //表示id的数据类型为int型（整数型）
    //   autoIncrement: true, //表示id的值在表中是自增的
    //   allowNull: false, //表示id对应列的值不能为空
    //   field: 'id' //实现模型的属性名和表的列名之间映射关系（对应关系）
    // },
    site_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'site_id'
    },
    house_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'house_id'
    },
    cage_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'cage_id'
    },
    refer: { // 记录异常情况信息
      type: Sequelize.STRING, //STRING类型对应Mysql中的varchar类型
      allowNull: true,
      field: 'refer'
    },
    time: { // 记录异常的时间
      type: Sequelize.DATE, //日期类型
      allowNull: true,
      field: 'time'
      // defaultValue: Sequelize.NOW // 默认值为当前时间
    },
    statu: { // 是否已完成异常处理
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'statu'
    }
  }, {
    freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
    timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
  })

  //2.导出模型
  return Abnormal
}
