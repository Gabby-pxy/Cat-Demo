const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const catsCollection = db.collection('cats');

const webApp = express(); //here init firestore app

webApp.use(express.urlencoded({extended: true}));
webApp.use(express.json());

// POST endpoint to add a new cat
webApp.post('/cats', async (req, res) => {
    try {
        const { Id, Name, Age, PictureUrl } = req.body;
        
        if (!Id || !Name || !Age) {
            return res.status(400).send('Id, Name, and Age are required fields');
        }

        if (typeof Id !== 'number' || typeof Age !== 'number') {
            return res.status(400).send('Id and Age must be numbers');
        }

        if (typeof Name !== 'string') {
            return res.status(400).send('Name must be a string');
        }

        await catsCollection.doc(Id.toString()).set({ Name, Age, PictureUrl });
        res.status(201).json({ Id, Name, Age, PictureUrl });
    } catch (error) {
        console.error('Error adding cat:', error);
        res.status(500).send('Error adding cat');
    }
});

// PUT endpoint to update an existing cat
webApp.put('/cats/:id', async (req, res) => {
    try {
        const catId = req.params.id;
        const { Name, Age, PictureUrl } = req.body;
        
        if (typeof Age !== 'number') {
            return res.status(400).send('Age must be a number');
        }

        if (typeof Name !== 'string') {
            return res.status(400).send('Name must be a string');
        }

        const cat = {
            Name,
            Age,
            PictureUrl 
        };

        await catsCollection.doc(catId).update(cat);
        res.status(200).send('Cat updated successfully');
    } catch (error) {
        console.error('Error updating cat:', error);
        res.status(500).send('Error updating cat');
    }
});

// GET endpoint to retrieve all cats
webApp.get('/cats', async (req, res) => {
    try {
        const snapshot = await catsCollection.get();
        let catList = '';

        snapshot.forEach(doc => {
            const catData = doc.data();
            catList += `ID: ${doc.id}, Name: ${catData.Name}, Age: ${catData.Age}\n`;
        });

        console.log('Cat List:', catList);
        
        res.setHeader('Content-Type', 'text/plain');
        
        res.send(catList);
    } catch (error) {
        console.error('Error getting cats:', error);
        res.status(500).send('Error getting cats');
    }
});

// GET endpoint to retrieve a specific cat by ID
webApp.get('/cats/:id', async (req, res) => {
    try {
        const catId = req.params.id;
        const catDoc = await catsCollection.doc(catId).get();
        if (!catDoc.exists) {
            res.status(404).send('Cat not found');
        } else {
            res.json({ id: catDoc.id, ...catDoc.data() });
        }
    } catch (error) {
        console.error('Error getting cat:', error);
        res.status(500).send('Error getting cat');
    }
});

// DELETE endpoint to delete a cat by ID
webApp.delete('/cats/:id', async (req, res) => {
    try {
        const catId = req.params.id;
        await catsCollection.doc(catId).delete();
        res.status(200).send('Cat deleted successfully');
    } catch (error) {
        console.error('Error deleting cat:', error);
        res.status(500).send('Error deleting cat');
    }
});

exports.webApp = functions.https.onRequest(webApp); //starts app?