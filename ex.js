// Ricky Leung
// Web Dev Period 7/8 Odd
// HTTP Backend Project

const express = require('express');
const app = express();
app.use(express.json());

const songs = [
    {id: 1, genre: 'Pop', name: 'Song 1', year: 1950, month: 1},
    {id: 2, genre: 'Hip Hop', name: 'Song 2', year: 1990, month: 3},
    {id: 3, genre: 'Rap', name: 'Song 3', year: 1992, month: 9},
    {id: 4, genre: 'Classical', name: 'Song 4', year: 1800, month: 6},
    {id: 5, genre: 'Rock', name: 'Song 5', year: 1960, month: 3},
    {id: 6, genre: 'Jazz', name: 'Song 6', year: 1920, month: 8},
    {id: 7, genre: 'Blues', name: 'Song 7', year: 1940, month: 10},
    {id: 8, genre: 'Electronic', name: 'Song 8', year: 1990, month: 11},
];

// GET REQUESTS
app.get('/', (req, res) => {
    res.send('\
        This is the home page for HTTP Backend Project for Web Development\n \
        - /songs to show all songs, and perform post and delete requests\n \
        - /songs/<id> to show a specific song, and perform put requests\n \
        - /songs/year/<year> to show all songs with the given year\n \
        - /songs/month/<month> to show all songs with the given month\n \
        By Ricky Leung \n \
        ');
});
app.get('/songs', (req, res) => {
    res.send(songs);
});
app.get('/songs/:id', (req, res) => {
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) {
        res.status(404).send("The song with the given ID does not exist");
    } else {
        res.send(song);
    }
});
app.get('/songs/year/:year', (req, res) => {
    let sameYears = [];
    for (let song of songs) {
        if (song.year == req.params.year) {
            sameYears.push(song);
        }
    }
    if (sameYears.length !== 0){
        res.send(sameYears);
    } else {
        res.status(404).send("The songs with the given year was not found");
    }
});
app.get('/songs/month/:month', (req, res) => {
    let sameMonths = [];
    for (let song of songs) {
        if (song.month == req.params.month) {
            sameMonths.push(song);
        }
    }
    if (sameMonths.length !== 0) {
        res.send(sameMonths);
    } else {
        res.status(404).send("The songs with the given month was not found");
    }
});

// POST REQUESTS
app.post('/songs', (req, res) => {
    let song;
    if (req.body.genre.length > 2 && req.body.name.length > 2) {
        song = {
            id: songs.length + 1,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs.push(song);
        res.send(songs);
    } else {
        res.send('Genre, name, year, and month is required;\nGenre and name has to be at least 3 characters long');
    }
});

// PUT REQUESTS
app.put('/songs/:id', (req, res) => {
    const originalSong = songs.find(c => c.id === parseInt(req.params.id));
    let newSong;
    if (req.body.genre.length > 2 && req.body.name.length > 2) {
        newSong = {
            id: originalSong.id,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs[originalSong.id - 1] = newSong;
        res.send(newSong);
    } else {
        res.send('Genre, name, year, and month is required;\nGenre and name has to be at least 3 characters long');
    }
});

// DELETE REQUESTS
app.delete('/songs', (req, res) => {
    originalSong = songs[req.body.id - 1];
    index = songs.indexOf(originalSong);
    if (originalSong !== undefined) {
        songs.splice(index, 1);
        res.send(originalSong);
    } else {
        res.status(404).send("Song with the given ID does not exist");
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})

// Programs are usually able to communicate with each other through
// their resepective backends. If one part of the backend were to not work properly,
// although there may be certain conditions to catch those errors(like the use of else statements
// in this project), then the rest of the program wouldn't work as intended. Through this project, I was 
// able to learn how to implement the concepts I learned from the 2 backend tutorials into
// a real-world situation. Since this backend project was relatively simple in comparison to actual 
// programs, I think I can extend this project further by adding more filters and routes that provide more 
// functionality to the music app.
