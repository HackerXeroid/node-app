const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");

// fs.appendFile("file.txt", "Hello There, You \n", "utf-8", (err) => {
//   if (err) console.error(err.message);
//   console.log("The file has been saved!");
// });

// const data = fs.readFileSync("file.txt");

// fs.appendFile("file.txt", "class is going on\n", "utf-8", (err) => {
//   if (err) console.error(err.name + " " + err.message);
//   console.log("Successfully written");
// });

// fs.mkdir("myDir", (err) => {
//   if (err) return console.error("Oopsie... You got an error: " + err.message);

//   console.log("Directory succesfully created.");
// });

// fs.rmdir("myDir", (err) => {
//   if (err)
//     console.error(
//       "Unable to remove your directory. The error goes here: " + err.message
//     );

//   console.log("Directory successfully removed.");
// });

// fs.rename("myDir", "myDir1", (err) => {
//   if (err) return console.error("Unable to rename: " + err.message);

//   console.log("Renamed successfully");
// });

// ---

// const p = "/home/xeroid/Desktop/node-app/file.txt";

// const dirname = path.dirname(p);
// const extension = path.extname(p);

// console.log(dirname);
// console.log(dirname);

// fs.mkdirSync("source");
// fs.mkdirSync("dest");

// fs.writeFile("file.txt", "Hello There");
// fs.copyFileSync(`${__dirname}/file.txt`, `${__dirname}/dest`);
// const source = path.dirname("source");
// const dest = path.dirname("dest");
// fs.copyFile();

// async function fileExists(file) {
//   try {
//     await fs.access(file, fs.constants.F_OK);
//     return true;
//   } catch {
//     return false;
//   }
// }

// async function appendTextAndCopy(fileLocation, destLocation, textToAppend) {
//   try {
//     await fs.appendFile(fileLocation, textToAppend, "utf-8");

//     const fileObj = path.parse(fileLocation);
//     const fileName = fileObj.name;
//     const fileExtension = fileObj.ext;

//     // If dest doesn't exist then, create it.
//     await fs.mkdir(destLocation, { recursive: true });

//     // New file location
//     let locationToCopyFile = `${destLocation}/${fileName}${fileExtension}`;
//     let i = 1;
//     while (true) {
//       const exists = await fileExists(locationToCopyFile);
//       if (!exists) break;

//       locationToCopyFile = `${destLocation}/${fileName}(${i})${fileExtension}`;
//       i++;
//     }

//     await fs.copyFile(fileLocation, locationToCopyFile);
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// appendTextAndCopy(
//   `${__dirname}/file.txt`,
//   `${__dirname}/dest/`,
//   "Hello There\n"
// );

const htmlDocument = (content) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    ${content}
  </body>
</html>
`;

const indexHtml = fs.readFileSync("index.html", "utf-8");
const errorHtml = fs.readFileSync("error.html", "utf-8");

const PORT = 3000;
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  switch (parsedUrl.pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(indexHtml);
      break;
    case "/login":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlDocument("Hello from Login Page"));
      break;
    default:
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(errorHtml);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
