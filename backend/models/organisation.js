const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Organization = sequelize.define('Organization', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  // General Info
  name: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Organization name is required' }
    }
  },
  slug: { 
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-z0-9-]+$/i,
        msg: 'Slug can only contain letters, numbers, and dashes'
      },
      notEmpty: { msg: 'Slug is required' }
    }
  },
  logo_url: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrlOrEmpty(value) {
        if (value && !/^https?:\/\/.+/.test(value)) {
          throw new Error('Logo must be a valid URL');
        }
      }
    }
  },

  // Admin details
  primary_admin_name: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      lenOrEmpty(value) {
        if (value && (value.length < 3 || value.length > 100)) {
          throw new Error('Name must be between 3 and 100 characters');
        }
      }
    }
  },
  primary_admin_email: { 
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Primary Admin Email must be valid' },
      notEmpty: { msg: 'Primary Admin Email is required' }
    }
  },
  support_email: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmailOrEmpty(value) {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          throw new Error('Support Email must be valid');
        }
      }
    }
  },

  // Contact details
  contact_phone: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Phone number is required' },
      is(value) {
        if (value && !/^\+?\d{10,15}$/.test(value)) {
          throw new Error('Phone number must be 10–15 digits with optional + prefix');
        }
      }
    }
  },
  alternate_phone: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isOrEmpty(value) {
        if (value && !/^\+?\d{10,15}$/.test(value)) {
          throw new Error('Alternate phone must be 10–15 digits with optional + prefix');
        }
      }
    }
  },

  // Web info (with URL normalization in setter)
  website_url: { 
    type: DataTypes.STRING,
    allowNull: true,
    set(value) {
      if (value && value.length > 0 && !/^https?:\/\//i.test(value)) {
        this.setDataValue('website_url', `https://${value}`);
      } else {
        this.setDataValue('website_url', value);
      }
    },
    validate: {
      isUrlOrEmpty(value) {
        if (value && !/^https?:\/\/.+/.test(value)) {
          throw new Error('Website URL must be valid and start with http:// or https://');
        }
      }
    }
  },

  // Limits (with label parsing in setter)
  max_coordinators: { 
    type: DataTypes.ENUM('1', '5', '10', '25', '50', '100'),
    defaultValue: '5',
    set(value) {
      // Accept either pure number or 'Upto X Coordinators'
      if (typeof value === 'string' && value.startsWith('Upto')) {
        const num = value.match(/\d+/);
        if (num) {
          this.setDataValue('max_coordinators', num[0]);
          return;
        }
      }
      this.setDataValue('max_coordinators', value);
    }
  },

  // Dropdown / ENUM selections
  timezone_name: { 
    type: DataTypes.ENUM(
      'Indian Standard Time', 
      'Pacific Standard Time', 
      'Eastern Standard Time', 
      'Central European Time'
    ),
    defaultValue: 'Indian Standard Time'
  },
  timezone_region: { 
    type: DataTypes.ENUM(
      'Asia/Kolkata', 
      'Asia/Colombo', 
      'Europe/London', 
      'America/Los_Angeles'
    ),
    defaultValue: 'Asia/Kolkata'
  },
  language: { 
    type: DataTypes.ENUM(
      'English', 
      'Spanish', 
      'French', 
      'German', 
      'Hindi', 
      'Tamil',
      'Telugu'
    ),
    defaultValue: 'English'
  },

  // Org status
  status: { 
    type: DataTypes.ENUM('Active', 'Inactive'), 
    defaultValue: 'Active' 
  }
}, 
{
  timestamps: true,
  underscored: true,
  tableName: 'organizations'
});

module.exports = Organization;
