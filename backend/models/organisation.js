const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Organization = sequelize.define('Organization', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true, allowNull: false },
  logo_url: { type: DataTypes.STRING },
  primary_admin_name: { type: DataTypes.STRING },
  primary_admin_email: { type: DataTypes.STRING },
  support_email: { type: DataTypes.STRING },
  contact_phone: { type: DataTypes.STRING },
  alternate_phone: { type: DataTypes.STRING },
  website_url: { type: DataTypes.STRING },
  max_coordinators: { type: DataTypes.INTEGER, defaultValue: 5, allowNull: false },
  timezone_name: { type: DataTypes.STRING },
  timezone_region: { type: DataTypes.STRING },
  language: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('Active', 'Inactive', 'Blocked'), defaultValue: 'Active' }
}, { timestamps: true });

module.exports = Organization;
