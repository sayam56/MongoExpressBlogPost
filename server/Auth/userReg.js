const bcrypt = require('bcrypt');

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(dateString);
}

async function registerUser(usersCollection, userData) {
  const { username, email, password, registrationDate } = userData;

  // Validate input fields
  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }

  // Validate registrationDate format
  if (registrationDate && !isValidDate(registrationDate)) {
    throw new Error('Invalid registrationDate format');
  }

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email: email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user data into MongoDB
  await usersCollection.insertOne({
    username: username,
    email: email,
    password: hashedPassword,
    registrationDate: registrationDate || new Date(),
  });

  return 'User registered successfully';
}

module.exports = registerUser;
