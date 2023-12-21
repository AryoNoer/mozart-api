const admin = require('firebase-admin');
const db = admin.firestore();

const getAllMuseums = async (req, res) => {
  try {
    const museumsSnapshot = await db.collection('museums').get();
    let museums = [];

    museumsSnapshot.forEach((doc) => {
      const museumData = doc.data();
      const museumId = doc.id;

      const formattedData = {
        id: museumId,
        data: Object.keys(museumData).map(museumName => {
          const museumInfo = museumData[museumName];
          return {
            id: parseInt(museumInfo.id) || 0, 
            museumName: museumName,
            image: museumInfo.image || '',
            description: museumInfo.description || '',
            alamat: museumInfo.alamat || '',
            items: museumInfo.items || [],
          };
        }),
      };

      museums.push(formattedData);
    });

    museums.forEach((museum) => {
      museum.data.sort((a, b) => a.id - b.id);
    });

    res.json(museums);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



const getMuseumById = async (req, res) => {
  try {
    const museumId = req.params.museumId;
    const museumDoc = await db.collection('museums').doc(museumId).get();

    if (!museumDoc.exists) {
      res.status(404).send('Museum not found');
      return;
    }

    const museumData = museumDoc.data();

    const formattedData = {
      id: museumId,
      data: Object.keys(museumData).map(museumName => {
        const museumInfo = museumData[museumName];
        return {
            id: museumInfo.id || '',
            museumName: museumName,
            image: museumInfo.image || '',
            description: museumInfo.description || '',
            alamat: museumInfo.alamat || '',
            items: museumInfo.items || [],
        };
      }),
    };

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getMuseumByName = async (req, res) => {
  try {
    const category = req.params.category;
    const museumName = req.params.museumName;

    const museumDoc = await db.collection('museums').doc(category).get();

    if (!museumDoc.exists) {
      res.status(404).send('Category not found');
      return;
    }

    const museumsData = museumDoc.data();

if (museumsData && museumsData[museumName]) {
  const museumInfo = museumsData[museumName];

  res.json({
    id: category,
    data: [
      {
          museumName: museumName,
          id: museumInfo.id,
          image: museumInfo.image,
          name: museumInfo.name,
          description: museumInfo.description,
          alamat: museumInfo.alamat,
          items: museumInfo.items || [],
          
        },
    ],
  });
} else {
  res.status(404).send('Museum not found');
}

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const searchMuseum = async (req, res) => {
  try {
    const searchTerm = req.query.q.toLowerCase();

    const museumsSnapshot = await db.collection('museums').get();
    const searchResults = [];

    museumsSnapshot.forEach((doc) => {
      const museumData = doc.data();
    
      if (museumData.name.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: doc.id,
          data: museumData,
        });
      }
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createMuseum = async (req, res) => {
  try {
    const museumData = req.body;
    const category = req.params.category;

    if (!category || typeof museumData !== 'object' || museumData === null) {
      res.status(400).json({ error: 'Invalid request format' });
      return;
    }

    const museumPath = `museums/${category}`; 
    const museumRef = db.collection(museumPath).doc(); 

    museumData.createdAt = admin.firestore.FieldValue.serverTimestamp();

   
    await museumRef.set(museumData);

    res.json({
      id: museumRef.id,
      data: museumData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



const updateMuseum = async (req, res) => {
  try {
    const museumId = req.params.museumId;
    const updatedMuseumData = req.body;

    await db.collection('museums').doc(museumId).update(updatedMuseumData);

    res.json({ message: 'Museum updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteMuseum = async (req, res) => {
  try {
    const museumId = req.params.museumId;

    await db.collection('museums').doc(museumId).delete();

    res.json({ message: 'Museum deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateMuseumDescription = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const museumName = req.params.museumName;
    const newDescription = req.body.description;

    if (!categoryId || !museumName || !newDescription) {
      res.status(400).json({ error: 'Invalid request format' });
      return;
    }

    const museumRef = db.collection('museums').doc(categoryId).collection(museumName).doc();
    const museumDoc = await museumRef.get();

    if (!museumDoc.exists) {
      console.log('Dokumen tidak ditemukan:', categoryId, museumName);
      res.status(404).send('Museum tidak ditemukan');
      return;
    }

    await museumRef.update({ description: newDescription });

    res.json({ message: 'Deskripsi museum berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Kesalahan Internal Server');
  }
};

module.exports = {
  getAllMuseums,
  getMuseumById,
  getMuseumByName,
  searchMuseum,
  createMuseum,
  updateMuseum,
  deleteMuseum,
  updateMuseumDescription,
};
