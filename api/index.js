// Import necessary Node.js modules
const fs = require("fs");
const path = require("path");

// This is the main handler for the serverless function
// It receives the request (req) and response (res) objects
module.exports = async (req, res) => {
  // Construct the full file path to db.json.
  // process.cwd() gets the current working directory, which is your project root on Vercel.
  const filePath = path.join(process.cwd(), "db.json");

  try {
    // Read the file synchronously from the file system.
    // Use 'utf8' encoding to get a string.
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Parse the JSON string into a JavaScript object.
    const db = JSON.parse(fileContent);

    // Get the path from the request URL (e.g., '/api/users' -> 'users').
    // We remove the '/api/' prefix.
    const route = req.url.replace("/api/", "");

    // Check if the requested route matches a key in your db.json.
    // For example, if the URL is /api/users, the route is 'users'.
    if (db[route]) {
      // If a matching key is found, send the corresponding data as a JSON response.
      // Use status 200 (OK) to indicate success.
      res.status(200).json(db[route]);
    } else if (route === "") {
      // If the root API endpoint is requested (e.g., /api),
      // send the entire database object.
      res.status(200).json(db);
    } else {
      // If the requested route is not found, send a 404 (Not Found) error.
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    // If there is any error (e.g., file not found or invalid JSON),
    // send a 500 (Internal Server Error) response.
    console.error("Error reading db.json:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};
