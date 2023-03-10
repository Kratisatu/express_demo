const express = require('express');
const app = express();

//MiddleWare
app.use(express.json());


//const bodyParser = require('body-parser');
//const itemRouter = require('./routes/itemRouter');
//const personRouter = require('./routes/personRouter');

//app.use('/item', itemRouter);
//app.use('/person', personRouter);

const courses = [{ id: 1, name: 'course1'}, {id: 2, name: 'course2'}, {id: 3, name: 'course3'}];



app.get('/', (req, res) => {
    res.send('You got this app working!!!!!!!!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found'); // 404--Object Not Found
    res.send(course);
})

//Posting to server
app.post('/api/courses', (req, res) => {
    const course = { 
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
    console.log("Course successfully added to server!");
})

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app is listening on Port ${port}`);

});