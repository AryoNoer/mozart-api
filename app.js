
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./key/serviceAccountkey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-project-id.firebaseio.com', 
});

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());


// const userRoutes = require('./routes/userRoutes');
const museumRoutes = require('./routes/museumRoutes');

// app.use('/api/users', userRoutes);
app.use('/api/museums', museumRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
