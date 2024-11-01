import { readFile, writeFile } from "node:fs/promises"; // Import fs promises for async file reading and writing
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the user data file
const userDataPath = path.join(__dirname, "../utils/database/userData.json");

// Function to read users from the JSON file
const getUsers = async () => {
  try {
    const data = await readFile(userDataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading user data:", error);
    return []; // Return an empty array if there's an error
  }
};

// Function to save users to the JSON file
const saveUsers = async (users) => {
  try {
    await writeFile(userDataPath, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Exported function to register a new user
export const registerUser = async (req, res) => {
  const {body:{name, email, password, phone }} = req;

  // Basic validation
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Read the current list of users
    const users = await getUsers();

    // Check if the email already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Create a new user and add it to the list
    const newUser = { id: users.length + 1, name, email, password, phone };
    users.push(newUser);

    // Save the updated list of users
    await saveUsers(users);

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
