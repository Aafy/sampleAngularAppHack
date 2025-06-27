import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Define the shape of your database object for type safety
interface DbData {
  users: { id: number; name: string; email: string }[];
  posts: { id: number; title: string; body: string; userId: number }[];
}

// This is the main handler for the serverless function.
// We use Vercel's specific types for the request and response objects.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- DEBUGGING LOGS (Optional, but recommended) ---
  const cwd: string = process.cwd();
  const reqUrl: string = req.url || ''; // req.url can be undefined
  console.log('Current Working Directory (CWD):', cwd);
  console.log('Incoming Request URL:', reqUrl);

  const filePath: string = path.join(cwd, 'db.json');
  console.log('Attempting to read file at path:', filePath);
  // --- END DEBUGGING LOGS ---

  try {
    // Read the file content
    const fileContent: string = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON content and cast it to our defined type
    const db: DbData = JSON.parse(fileContent);

    // Extract the route from the URL. reqUrl is `/api/users` or `/api/posts`.
    // The Vercel function's path is `/api/index`, so the route is what comes after.
    const route: string = reqUrl.replace('/api/', '');

    if (route in db) {
      // Check if the route is a valid key in the db object
      // If a matching key is found, send the corresponding data.
      res.status(200).json(db[route as keyof DbData]); // Use keyof DbData to ensure type safety
    } else if (route === '') {
      // If the root API endpoint is requested, send the entire database object.
      res.status(200).json(db);
    } else {
      // If the requested route is not found, send a 404 error.
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error: any) {
    // Catch errors like `ENOENT` (file not found) or invalid JSON.
    console.error('An error occurred during file processing:', error.message);
    res
      .status(500)
      .json({ error: `Failed to retrieve data: ${error.message}` });
  }
}
