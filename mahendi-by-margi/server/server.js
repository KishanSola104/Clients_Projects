import http from "http";
import fs from "fs";
import path from "path";
import { parse } from "url";
import { fileURLToPath } from "url";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API Route: Return all states
  if (pathname === "/api/states" && req.method === "GET") {
    const dataPath = path.join(__dirname, "data", "states.json");

    fs.readFile(dataPath, "utf8", (err, jsonData) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unable to read states data" }));
        return;
      }

      try {
        const states = JSON.parse(jsonData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ states }));
      } catch (parseError) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({error: "Error parsing states data" }));
      }
    });
    return;
  }


  // API Route: Return districts based on selected state
if (pathname.startsWith("/api/districts") && req.method === "GET") {
  const selectedState = parsedUrl.query.state; 

  const dataPath = path.join(__dirname, "data", "districts.json");

  fs.readFile(dataPath, "utf8", (err, jsonData) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unable to read district data" }));
      return;
    }

    try {
      const districts = JSON.parse(jsonData);
      const stateDistricts = districts[selectedState] || [];

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ districts: stateDistricts }));
    } catch (parseError) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Error parsing district data" }));
    }
  });

  return;
}




  // Serve static files
  let filePath = path.join(
    __dirname,
    "..",
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  let extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      } else {
        res.writeHead(500);
        res.end("Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
