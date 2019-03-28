// Johnny Louifils helped me through this
var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
    Book.findAll({order:[["id", "ASC"]]}).then(function (books){res.render("index", {books:books});
    }).catch(function(error){
        res.send(500,error);
    });
  });


  /* Create a new book. */
router.get('/new', function(req, res, next) => {
    res.render("new-book");
  });

/* POST create book. */
router.post('/new', function(req, res, next) => {
    Book.create(req.body).then(function(book){
    res.redirect('/books/');
    }).catch(function(error){
        if(error.name === "SequelizeValidationError") {
            var book = Book.build(req.body);
            book.id = req.params.id;
            res.render("newBook", {
                book: book,
                errors: error.errors
            });
        } else {
            throw error;
        }
    }).catch(function(error){
        res.send(500,error);
    });
  });
  
/* Edit Book form. */
router.get('/:id', function(req, res, next) => {
    Book.findByPk(req.params.id).then(function(book){
        if(book){
    res.render("update", {book: book});
        }   else {
          res.send(404)  
        }
}).catch(function(error){
    res.send(500,error);
});
   });

   /* Post update book. */
router.post('/:id', function(req, res, next) => {
    Book.findByPk(req.params.id).then(function(book){
        if(book) {
    return book.update(req.body);
        }else {
            res.render('page-not-found', 404)
        }
    }).then(function (book){
    res.redirect("/books/");
    }) .catch(function(error){
        if(error.name === "SequelizeValidationError") {
            var book = Book.build(req.body);
            book.id = req.params.id;
            res.render("update-book", {
                book: book,
                errors: error.errors
            });
        } else {
            throw error;
        }
    }).catch(function(error){
        res.send(500, error);
    });
});

  /* DELETE individual book. */
router.post("/:id/delete", function(req, res, next) => {
    Book.findByPk(req.params.id).then(function (book){
        if(book){
    return book.destroy();
        } else {res.send(404)
        }
    }).then(function(books){
      res.redirect("/books");
    }).catch(function(error){
        res.send(500,error);
    });
  });

module.exports = router;