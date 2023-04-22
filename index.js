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
    // https://api.clockify.me/api/v1/workspaces/{workspaceId}/time-entries/{id}
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

userTimeEntriesResponse.forEach(async timeEntry => {
    // console.log(`time entry projectId: ${timeEntry.projectId}`);

    const project = await getProjectById(timeEntry.projectId)
    // console.log(project);

    console.log(`======================`)
    console.log(`Nombre de proyecto: ${project.name}`);
    console.log(`Descripción: ${timeEntry.description}`)
    console.log(`Duración: ${timeEntry.timeInterval.duration}`)
    console.log(`Inicio: ${timeEntry.timeInterval.start}`)
    console.log(`Fin: ${timeEntry.timeInterval.end}`)
    console.log(`======================`)
    // if (project.name === '') {
    // }
});
