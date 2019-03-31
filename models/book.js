// johnny Louifils helped me on this
// karen shea advised me differently and hers works better so I chose her advice
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
          msg: "Author is required"
        }
      }
    },
    
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};