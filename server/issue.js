//'Issue' object functions
'use strict';

const validIssueStatus ={
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
}

const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
}

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

module.exports = {
    validateIssue: validateIssue
};