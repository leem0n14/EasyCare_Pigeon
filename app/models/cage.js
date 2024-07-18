module.exports = (sequelize, Sequelize) => {
  const Cage = sequelize.define('cage', {
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
    number: { // 种鸽数量
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'number',
      defaultValue: 2 // 默认值为2
    },
    statu: { // 该鸽笼目前的状态
      type: Sequelize.STRING, //STRING类型对应Mysql中的varchar类型
      allowNull: true,
      field: 'statu',
      defaultValue: "初始状态" // 默认值为初始状态
    },
    cub_number: {  // 带仔数量
      type: Sequelize.INTEGER, //小数类型，共10位，其中小数点后有2位
      allowNull: true,
      field: 'cub_number',
      defaultValue: 0 // 默认值为带仔数为0
    }
    // time: {
    //   type: Sequelize.DATE, //日期类型
    //   allowNull: true,
    //   field: 'time',
    //   defaultValue: Sequelize.NOW // 默认值为当前时间
    // }
  }, {
    freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
    timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
  })

  //2.导出模型
  return Cage
}
