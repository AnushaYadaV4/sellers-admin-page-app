const Sequelize = require('sequelize');
const sequelize = require('../helper/database');
const SellerStock = sequelize.define('sellerstock',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    itemName: Sequelize.STRING,
    description: {
      type: Sequelize.STRING,
      unique: false,
    },
    price: {
      type: Sequelize.INTEGER,
      unique: false,
    },
    
  });

module.exports = SellerStock;