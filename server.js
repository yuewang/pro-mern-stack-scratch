const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

//Chapter 5

//enums
const validIssueStatus ={
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
}

const issueFieldType = {
    //id: 'required', //Removed after id generation responsibility delegated to Mongo 6-12
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
}
//end enums

//Check for valid issue during creation
function validateIssue(issue){
    for (const field in issueFieldType) {
        const type = issueFieldType[field];
        if (!type){
            console.log("invalid type");
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            console.log("missing required field");
            return `${field} is required.`;
        }
    }

    if (!validIssueStatus[issue.status]) {
        console.log("invalid issue!");
        return `${issue.status} is not a valid status.`;
    }
    return null;
}

//hardcoded for simulated data - replaced with Mongo 6-12
/*const issues = [
    {
        id: 1,
        status: 'Open',
        owner: 'Ravan',
        created: new Date('2016-08-15'),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date('2016-08-16'),
        effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing Bottom border on panel' 
    }
];*/

// List API before MongoDB Integration using simulated data
/*app.get('/api/issues', (req, res) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length+1;
    newIssue.created = new Date();
    if(!newIssue.status)
        newIssue.status = 'New';
    const err = validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: 'Invalid request: ${err}' })
        return;
    }
    issues.push(newIssue);
    res.json(newIssue);
});

//END Chapter 5
*/

// List API after Mongo Integration

//6-8
app.get('/api/issues', (req, res) => {
    db.collection('issues').find().toArray().then(issues => {
        const metadata = { total_count: issues.length };
        res.json({ _metadata: metadata, records: issues });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Servor Error: ${error}` });
    });
});

//6-11
app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }
    const err = validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    
    db.collection('issues').insertOne(newIssue).then(result => 
        db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
    ).then(newIssue => {
        res.json(newIssue);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

let db;
MongoClient.connect('mongodb://localhost').then(connection => {
    db = connection.db('issuetracker');
    app.listen(3000, () => {
        console.log('App started on port 3000');
    });
}).catch(error => {
    console.log('ERROR', error);
});

/*app.listen(3000, function() {
    console.log('App started on port 3000');
});*/
