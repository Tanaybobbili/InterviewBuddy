const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Organization = require('./organisation');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Organization, key: 'id' }
  },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Admin', 'Coordinator'), allowNull: false },
}, { timestamps: true });

User.belongsTo(Organization, { foreignKey: 'organization_id' });
Organization.hasMany(User, { foreignKey: 'organization_id' });

module.exports = User;
