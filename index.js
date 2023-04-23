import fetch from "node-fetch";

const clockifyApiKey = "MzMwNTAwZDAtZThiZi00Y2QyLTk5ZDgtODg3MzA2YmNiYjAx";
const clockifyApiUrl = "https://api.clockify.me/api/v1";

async function getUserInfo() {
	const response = await fetch(`${clockifyApiUrl}/user`, {
		headers: { "X-Api-Key": clockifyApiKey },
	});
	return response.json();
}

const userInfoResponse = await getUserInfo();
const activeWorkspace = userInfoResponse.activeWorkspace;

// console.log(userInfoResponse);

async function getUserTimeEntries(userId) {
	console.log(userId, activeWorkspace);
    // https://api.clockify.me/api/v1/workspaces/{workspaceId}/user/{userId}/time-entries
	const url = `${clockifyApiUrl}/workspaces/${activeWorkspace}/user/${userId}/time-entries`;

    console.log(url);

	const result = await fetch(url, {
		headers: { "X-Api-Key": clockifyApiKey }
	});

	console.log(result);

	return result.json();
}

async function getProjectById(projectId) {
    // https://api.clockify.me/api/v1/workspaces/{workspaceId}/projects/{projectId}
	const url = `${clockifyApiUrl}/workspaces/${activeWorkspace}/projects/${projectId}`;
    // console.log(url);

	const result = await fetch(url, {
		headers: { "X-Api-Key": clockifyApiKey }
	});

	// console.log(result);

	return result.json();
}

const userTimeEntriesResponse = await getUserTimeEntries(userInfoResponse.id);

console.log(userTimeEntriesResponse);

console.log(userTimeEntriesResponse.length);

let count = 0;
userTimeEntriesResponse.forEach(async timeEntry => {
    console.log('count: ', count);
    console.log(`time entry projectId: ${timeEntry.projectId}`);

    const project = await getProjectById(timeEntry.projectId)
    console.log(project);

    if (project.name = 'Pagina 12') {
        console.log(`======================`)
        console.log(`Nombre de proyecto: ${project?.name}`);
        console.log(`Descripción: ${timeEntry.description}`)
        console.log(`Duración: ${timeEntry.timeInterval.duration}`)
        console.log(`Inicio: ${timeEntry.timeInterval.start}`)
        console.log(`Fin: ${timeEntry.timeInterval.end}`)
        console.log(`======================`)
    }
    // if (project.name === '') {
    // }
    const harvestTimeEntry = {
        "project_id": 20330224,
        "task_id": 4626568,
        "spent_date": "2023-04-21",
        "hours": "1",
        "notes": "this is a note"
    }

    postHarvestTimeEntry(harvestTimeEntry);

    count = count + 1;
});

const harvertApiUrl = 'https://api.harvestapp.com/v2/';
const harvertApiKey = '3125129.pt.9pq74TxIy8QL4UA2y0qJMxsTNhoSbMYLY0IoVQHigFcqhIkOGrOpTQCXxPpPYJF8f-2C9YF9JldOEmkTycKTfA';
const harvertAccountId = 519914;

async function postHarvestTimeEntry({projectId, taskId, date, hours, notes}) {
    // /v2/time_entries
	const url = `${harvertApiUrl}/time_entries`;
    // console.log(url);

	const result = await fetch(url, {
        type: 'POST',
		headers: { 
            "Authorization": `Bearer ${harvertApiKey}`,
            "Harvest-Account-Id": harvertAccountId
        },
        body: {
            "project_id": 20330224,
            "task_id": 4626568,
            "spent_date": "2023-04-21",
            "hours": "1",
            "notes": "this is a note"
        }
	});

	// console.log(result);

	return result.json();
}
