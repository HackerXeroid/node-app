const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());
app.use(logger);

const readFromFile = (fileName) => {
  let data = [];
  try {
    data = fs.readFileSync(fileName);
  } catch (err) {
    throw err;
  }

  return JSON.parse(data);
};

// const saveToFile = (newData) => {
//   fs.writeFileSync("data.json", "utf-8", JSON.stringify(newData));
// };

const fruits = readFromFile("data.json");

app.get("/fruits", (req, res) => {
  res.json(fruits);
});

app.post("/fruits", (req, res) => {
  fruits.push({ ...req.body, id: fruits.length + 1 });
  // saveToFile();
  res.json(fruits);
});

app.put("/fruits/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = fruits.findIndex((fruit) => fruit.id === id);

  if (index === -1) {
    res.status(404).send("Fruit not found");
  } else {
    fruits[index] = { ...req.body, id: id };
    // saveToFile();
    res.json(fruits[index]);
  }
});

app.delete("/fruits/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = fruits.findIndex((fruit) => fruit.id === id);

  if (index === -1) {
    res.status(404).send("Fruit not found");
  } else {
    fruits.splice(index, 1);
    // saveToFile();
    res.status(200).json(fruits);
  }
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`);
});

function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.host}${req.originalUrl} ${req.ip} ${res.statusCode} ${duration}ms`
    );
  });

  next();
}

// git add .
// git add folder1 folder2
