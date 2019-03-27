// Johnny Louifils helped me through this
var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
    Book.findAll({order:[["title", "ASC"]]}).then(function (books){res.render("index", {books});
    }).catch(function(err){
        res.send(500);
    });
  });


  /* Create a new book. */
router.get('/new', function(req, res, next) {
    res.render("books/new", {book: Book.build(), title: "New Book"});
  }).catch(function(err){
    res.send(500);
});

/* POST create book. */
router.post('/new', function(req, res, next) {
    Book.create(req.body).then(function(book){
    res.redirect("/books/");
    }).catch(function(error){
        if(err.name === "SequelizeValidationError") {
            res.render("/books/new", {
                book: Book.build(req.body),
                errors: error.errors
            });
        } else {
            throw error;
        }
    }).catch(function(err){
        res.send(500);
    });
  });
  
/* Edit Book form. */
router.get("/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
        if(book){
    res.render("update", {book: book});
        }   else {
          res.send(404)  
        }
}).catch(function(err){
    res.send(500);
});
   });

   /* Post update book. */
router.post("/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
        if(book) {
    return book.update(req.body);
        }else {
            res.render("page-not-found",404)
        }
    }).then(function (book){
    res.redirect("/books/");
    }) .catch(function(error){
        if(err.name === "SequelizeValidationError") {
            var book = Book.build(req.body);
            book.id = req.params.id;
            res.render("update-book", {
                book: book,
                title: "Edit book",
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
router.post("/:id/delete", function(req, res, next){
    Book.findByPk(req.params.id).then(function (book){
        if(book){
    return book.destroy();
        } else {res.send(404)
        }
    }).then(function(books){
      res.redirect("/books");
    }).catch(function(err){
        res.send(500);
    });
  });

module.exports = router;