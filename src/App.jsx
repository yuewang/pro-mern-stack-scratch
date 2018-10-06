const contentNode = document.getElementById('contents');

//array of 'issues' to generate rows from

const IssueRow = (props) => (
    <tr>
        <td>{props.issue._id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
    </tr>
)

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue}/>)
    
    return (
        <table className="bordered-table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Effort</th>
                <th>Completion Date</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>    
            {issueRows}
        </tbody> 
    </table>
    );
}

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for issue filter.</div>
        );
    }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date()
        })
        // clear form for next input
        form.owner.value = ""; 
        form.title.value = "";
    }

    render() {
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues: []}; //4-2 initialized to empty array instead of const

        //4-4 Replace Test Issue hardcode with form
        /*this.createTestIssue = this.createTestIssue.bind(this);
        setTimeout(this.createTestIssue, 2000);*/
        this.createIssue = this.createIssue.bind(this);
    }

    //4-2 Simulation of data loading from server

    //4-2 componentDidMount is React Lifecycle method
    componentDidMount() {  
        this.loadData();
    }

    //4-2 loadData should not be called in constructor because the load may finish before component is rendered. setState should not be called until component is rendered.
    loadData() {

        //5-4 use API to fetch data
        /*fetch('api/issues').then(response => 
            response.json()
        ).then(data => {
            console.log("Total count of records: ", data._metadata.total_count);
            data.records.forEach(issue => {
                issue.created = new Date(issue.created);
                if(issue.completionDate)
                    issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({ issues: data.records });
        }).catch(err => {
            console.log(err);
        });*/    

        //6-10 Use API to fetch data using MongoDB
        fetch('api/issues').then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log("Total count of records:", data._metadata.total_count);
                    data.records.forEach(issue => {
                        issue.created = new Date(issue.created);
                        if (issue.completionDate)
                            issue.completionDate = new Date(issue.completionDate);
                    });
                    this.setState({ issues: data.records });
                });
            } else {
                response.json().then(error => {
                    alert("Failed to fetch issues:" + error.message)
                });
            }
        });
    }

    createIssue(newIssue) {

        fetch('api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue)
        }).then(response => {
            if(response.ok) {
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if(updatedIssue.completionDate)
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({ issues: newIssues});
                });
            } else {
                response.json.then(error => {
                    alert("Failed to add issue: " + error.message)
                });
            }
        }).catch(err => {
            alert("Error in sending data to server: " + err.message);
        });
    }

    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                {/*demo of array usage */}
                <IssueTable issues={this.state.issues} />
                {/*<button onClick={this.createTestIssue}>Add</button> //4-2 Button to call createTestIssue*/}
                <hr />
                <IssueAdd createIssue={this.createIssue}/>
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);

