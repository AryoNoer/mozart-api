
// const admin = require('firebase-admin');
// const db = admin.firestore();

// const getAllUsers = async (req, res) => {
//   try {
//     const usersSnapshot = await db.collection('users').get();
//     const users = [];
//     usersSnapshot.forEach((doc) => {
//       users.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const userDoc = await db.collection('users').doc(userId).get();

//     if (!userDoc.exists) {
//       res.status(404).send('User not found');
//       return;
//     }

//     res.json({
//       id: userDoc.id,
//       data: userDoc.data(),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const createUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     const newUserRef = await db.collection('users').add(userData);
//     const newUserDoc = await newUserRef.get();

//     res.json({
//       id: newUserDoc.id,
//       data: newUserDoc.data(),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const updatedUserData = req.body;

//     await db.collection('users').doc(userId).update(updatedUserData);

//     res.json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     await db.collection('users').doc(userId).delete();

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// };
