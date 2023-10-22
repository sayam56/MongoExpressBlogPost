const bcrypt = require('bcrypt');

async function loginUser(usersCollection, email, password) {
  // Find the user by email
  const user = await usersCollection.findOne({ email: email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  return 'Login successful';
}

module.exports = loginUser;
