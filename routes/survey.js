const express = require('express');
const router = express.Router();

let categories = [
    {
        catId: 0,
        cat: "Intuitive",
        desc: "Intuitives pay attention to their intuition, instinct, and ability to draw meaning from seemingly disconnected facts. They are good at reading between the lines and recognizing connections between random groups of facts. People with this preference are abstract and theoretical."
    },
    {
        catId: 1,
        cat: "Analytical",
        desc: "The Analytical Personality Type People who have the Analytical personality type usually appear to be very intelligent, nerdy or systematical. They normally have little to no emotion and make decisions slowly and with much second thought."
    },
    {
        catId: 2,
        cat: "Feeler",
        desc: "Intuitives pay attention to their intuition, instinct, and ability to draw meaning from seemingly disconnected facts. They are good at reading between the lines and recognizing connections between random groups of facts. People with this preference are abstract and theoretical."
    }
];

let questions = [
    {id: 'q1', q: "Are you naturally observant?", cat: 0}, {
        id: 'q2',
        q: "Do you like to work puzzles?",
        cat: 1
    },
    {id: 'q3', q: "Is Authenticity important to you?", cat: 2}, {
        id: 'q4',
        q: "Do you use personal values to make decisions?",
        cat: 2
    },
    {id: 'q5', q: "Do you find it easy to trust your gut instinct?", cat: 0}, {
        id: 'q6',
        q: "Do you know how things work?",
        cat: 1
    },
    {id: 'q7', q: "Are you a good judge of character?", cat: 0}, {
        id: 'q8',
        q: "Do you think you are naturally Curious?",
        cat: 1
    },
    {id: 'q9', q: "Are you a good judge of character?", cat: 2}];

const MAX_PTS = 6;

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/survey', (req, res) => {
    res.render('survey', {
        pageTitle: "Interest Survey",
        from: 'survey',
        questions: questions
    });
});

router.post('/survey', (req, res) => {
    // Calculate results based on the MAX_PTS
    let scores = {
        0: 0,  // Intuitive category
        1: 0,  // Analytical category
        2: 0   // Feeler category
    };

    questions.forEach(question => {
        const questionId = question.id;
        const category = question.cat;
        const answerValue = parseInt(req.body[questionId]);  // convert to integer
        scores[category] += answerValue;  // update the score for the corresponding category
    });

    let points = [];
    let percent = [];

    for (const catId in scores) {
        points.push(scores[catId]);
        percent.push(Math.floor((scores[catId] / MAX_PTS) * 100));
    }

    // Render the results page, passing in necessary data
    res.render('surveyResults', {
        pageTitle: "Interest Survey Results",
        categories: categories,
        points: points,
        percent: percent
    });
});

module.exports = router;
