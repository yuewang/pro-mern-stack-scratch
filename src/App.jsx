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

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for issue filter.</div>
        );
    }
}

class IssueRow extends React.Component {

    //demo of static getter function to establish proptypes on class creation
    /*static get propTypes() {
        return {
            issue_id: React.PropTypes.number.isRequired,
            issue_title: React.PropTypes.string
        };
    } */

    render() {
        //3-8 IssueRow using Issue Object Prop
        const issue = this.props.issue;
        //const borderedStyle = {border: "1px solid silver", padding: 4};

        return (
        <tr>
            {/*3-8 Replaced with more detailed row
            <td style={borderedStyle}>{this.props.issue_id}</td> //using properties
            <td style={borderedStyle}>{this.props.children}</td> //using children
            */}

            {/*3-8 IssueRow using Issue Object Prop*/}
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
            <td>{issue.title}</td>

        </tr>
        );
    }
}

/*class BorderWrap extends React.Component {
    //Example of wrapper to apply style (border) outside of inner component
    render() {
        const borderedStyle = {border: "1px solid silver", padding: 6};
        return (
            <div style={borderedStyle}>
                {this.props.children}
            </div>
        );
    }
}*/

class IssueTable extends React.Component {
    render() {
        //3-7 Passing array of issues as property, using map function to map each issue in array to IssueRow
        const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
        //const borderedStyle = {border: "1px solid silver", padding: 6};
        return (
            //<table style={{borderCollapse: "collapse", border: 1}}>
            <table className="bordered-table"> {/*3-9 using JSX className for CSS class*/}
                <thead>
                    <tr>
                        {/*Removed 3-7 for more detailed table
                        <th style={borderedStyle}>Id</th>
                        <th style={borderedStyle}>Title</th>*/}

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
                    {/*3-3 Using properties to pass both inputs
                    <IssueRow issue_id={1}
                    issue_title="Error in console when clicking Add" />

                    <IssueRow issue_id={2}
                    issue_title="Missing bottom border on panel" />
                    */}

                    {/*3-4 Using properties to pass id and 'child' (content inside tags) to pass content
                    <IssueRow issue_id={1}>Error in console when clicking Add</IssueRow>
                    <IssueRow issue_id={2}>Missing bottom <b>border</b> on panel</IssueRow>
                    */}

                    {/*3-7 Array of IssueRows*/}
                    {issueRows}

                </tbody> 
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a placeholder for issue add entry form.</div>
        );
    }
}

class IssueList extends React.Component {
    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                
                <IssueFilter />
                <hr />
                {/*demo of array usage */}
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd />
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);
