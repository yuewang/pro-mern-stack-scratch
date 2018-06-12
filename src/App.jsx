const contentNode = document.getElementById('contents');

//array of 'issues' to generate rows from
const issues = [
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
        effort: 5,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel'
    }
];

const IssueRow = (props) => (
    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
    </tr>
)

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)
    
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
        //4-2 simulate async data 
        setTimeout(() => {
            this.setState({ issues: issues});
        }, 500);
    }

    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length+1;
        newIssues.push(newIssue);
        this.setState({ issues: newIssues });
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

