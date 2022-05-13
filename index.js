const express = require("express");
const app = express();
const fs = require("fs");
// var dateFormat = require("dateformat");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/books");
app.set("view options", { layout: false });

app.get("/book", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let data1 = JSON.parse(data);
      let data2 = [];
      for (var i = 1; i <= 100; i++) {
        let array = data1.books[Math.floor(Math.random() * data1.books.length)];
        if (i < 4) {
          data2.push(array.title);
        }
      }

      // const data3 = data1.books.map((e) => {
      //   return e[Math.floor(Math.random() * e.length)];
      // });

      res.render("books", { data: data2 });
    }
  });
  // res.send("hello");
});

app.get("/published", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let data1 = JSON.parse(data);
      // console.log(data);
      let data2 = data1.books.map((e) => {
        return e.published;
      });
      // console.log(data2);
      // let data3 = [{ ...data2 }];
      let data4 = [];
      // console.log(data2[0]);
      for (let i = 0; i < data2.length; i++) {
        let data3 = data2[i].slice(0, 10);
        data4.push(data3);
      }
      // console.log(data4);
      let data5 = data4.sort();
      console.log(data5);
      res.send(data5);
    }
  });
});

app.get("/author", (req, res) => {
  fs.readFile("book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let data1 = JSON.parse(data);
      // console.log(data);
      let data2 = data1.books.map((e) => {
        return e.author;
      });

      res.send(data2);
    }
  });
});

app.get("/all", (req, res) => {
  fs.readFile("books.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      // console.log(data);
      let data1 = JSON.parse(data);
      let data2 = data1.books.map((e) => {
        console.log(e);
        return e;
      });

      res.render("allBook", { data: data2 });
    }
  });
});

app.get("/book/:isbn_id", (req, res) => {
  const id = req.params.isbn_id;
  fs.readFile("books.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let data1 = JSON.parse(data);
      let data5 = "";
      for (let i = 0; i < data1.length; i++) {
        if (id === data1.books[i].isbn) {
          return data1.books[i].title;
        }
      }

      res.send(data5);
    }
  });
});
app.listen(3000);
