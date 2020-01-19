const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

// app.get("/", (req, res) => res.send("Hello world!"));
app.use(express.json());
app.use("/", express.static("./src/public/"));

app.get("/catalog", (req, res) => {
  fs.readFile("./src/server/db/catalog.json", "UTF-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});

app.get("/cart", (req, res) => {
  fs.readFile("./src/server/db/cart.json", "UTF-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});

app.post("/addtocart", (req, res) => {
  fs.readFile("./src/server/db/cart.json", "UTF-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      let productInCart = JSON.parse(data);
      let findProductIndexCart = productInCart.findIndex(
        val => val.id_product === req.body.id_product
      );

      if (findProductIndexCart === -1) {
        let good = req.body;
        good.qty = 1;
        productInCart.push(good);
        fs.writeFile(
          "./src/server/db/cart.json",
          JSON.stringify(productInCart),
          err => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log("Cart update...");
            }
          }
        );
      } else {
        ++productInCart[findProductIndexCart].qty;
        fs.writeFile(
          "./src/server/db/cart.json",
          JSON.stringify(productInCart),
          err => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log("Cart update...");
            }
          }
        );
      }

      res.status(200);
      res.send(productInCart);
    }
  });
});

app.delete("/delfromcart", (req, res) => {
  fs.readFile("./src/server/db/cart.json", "UTF-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      let productInCart = JSON.parse(data);
      let findProductIndexCart = productInCart.findIndex(
        val => val.id_product === req.body.id_product
      );

      if (
        findProductIndexCart !== -1 &&
        productInCart[findProductIndexCart].qty > 1
      ) {
        --productInCart[findProductIndexCart].qty;
        fs.writeFile(
          "./src/server/db/cart.json",
          JSON.stringify(productInCart),
          err => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log("Cart update...");
            }
          }
        );
      } else if (
        findProductIndexCart !== -1 &&
        productInCart[findProductIndexCart].qty === 1
      ) {
        productInCart.splice(findProductIndexCart, 1);
        fs.writeFile(
          "./src/server/db/cart.json",
          JSON.stringify(productInCart),
          err => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log("Cart update...");
            }
          }
        );
      }

      res.status(200);
      res.send(productInCart);
    }
  });
});

app.listen(port, () => console.log(`Listen port ${port}`));
