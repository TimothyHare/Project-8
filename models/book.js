// johnny Louifils helped me on this
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: { 
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "Title is required"
      }
    }
  },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter Genre'
        }
      }
    },

    year: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Year must be a number'
        },
        notEmpty: {
          msg: "Must Enter Year"
        }
      }
    },

    
  });

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};