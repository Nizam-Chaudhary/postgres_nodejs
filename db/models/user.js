"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");
module.exports = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      allowNull: false,
      type: DataTypes.ENUM("0", "1", "2"),
      validate: {
        notNull: {
          msg: "Usertype cannot be null",
        },
        notEmpty: {
          msg: "Usertype cannot be empty",
        },
      },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "First Name cannot be null",
        },
        notEmpty: {
          msg: "First Name cannot be empty",
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Last Name cannot be null",
        },
        notEmpty: {
          msg: "Last Name cannot be empty",
        },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Email cannot be null",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Password cannot be null",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value === this.password && value.length >= 8) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else if (value !== this.password) {
          throw new Error("Password and Confirm Password must be same");
        } else if (value.length <= 8) {
          throw new Error("Password length must be greater than 8");
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "user",
  }
);
