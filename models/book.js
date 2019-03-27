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
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          msg: 'Year must be a number'
        },
        notEmpty: {
          msg: "Must Enter Year"
        }
      }
    },

    //createdAt: DataTypes.DATE,
    //updatedAt: DataTypes.DATE
  });

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};