"use strict";
const fs = require('fs');

// File paths
const timelineFile = './data/timeline.json';
const transcriptFile = './data/transcript.txt';
const outputFilePath = './data/updated_transcript.txt'; // Define the path for the output file

interface TimelineEntry {
    users: Users[];
    ts: string;
}

interface Users {
    avatar_url: string;
    client_type: number;
    email_address: string;
    multiple_people: boolean;
    user_id: number;
    username: string;
    zoom_userid: string;
}

// Declare variables for timeline and transcriptData
let timeline: TimelineEntry [] = [];
let transcriptData: string = '';

// Read timeline.json
fs.readFile(timelineFile, 'utf-8', (errTimeline: string, timelineData: string) => {
    if (errTimeline) {
        console.error('Error reading the timeline file:', errTimeline);
        return;
    }

    try {
        // Parse JSON data from timeline.json
        const jsonData = JSON.parse(timelineData);
        // Access the "timeline" property
        timeline = jsonData.timeline;
    } catch (jsonError) {
        console.error('Error parsing JSON from timeline.json:', jsonError);
        return;
    }

    if (!Array.isArray(timeline)) {
        console.error('Invalid format in timeline.json. Expected an array.');
        return;
    }

    // Read transcript.txt with specified encoding
    fs.readFile(transcriptFile, 'utf-8', (errTranscript: string, transcriptDataFromFile: string) => {
        if (errTranscript) {
            console.error('Error reading the transcript file:', errTranscript);
            return;
        }

        // Assign transcriptData from the file
        transcriptData = transcriptDataFromFile;

        // Use the findSpeakerInTranscript function and write the result to the output file
        const updatedTranscript = findSpeakerInTranscript(timeline, transcriptData);
        fs.writeFileSync(outputFilePath, updatedTranscript, 'utf-8');
        console.log(`Updated transcript written to ${outputFilePath}`);
    });
});

// Function to capitalize the first letter of each word in a string
function capitalizeFirstLetterOfEachWord(str: string): string {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function findSpeakerInTranscript(timeline: TimelineEntry[], transcriptData: string) {
    // Mapping usernames to speaker index
    const usernameToSpeakerIndex: { [key: string]: number } = {};

    // Assign unique speaker index to each username using map
    timeline.forEach((entry) => {
        const users: { username: string }[] = entry.users || [];
        users.forEach((user) => {
            const username = capitalizeFirstLetterOfEachWord(user.username);
            if (!(username in usernameToSpeakerIndex)) {
                // Assign a unique speaker index to each username
                usernameToSpeakerIndex[username] = Object.keys(usernameToSpeakerIndex).length;
            }
        });
    });

    // Replace speaker names with usernames in the transcript
    let updatedTranscript = transcriptData;
    Object.keys(usernameToSpeakerIndex).forEach((username) => {
        const speakerIndex = usernameToSpeakerIndex[username];
        const regex = new RegExp(`^Speaker ${speakerIndex}:`, 'gm');
        // Use regex to replace speaker names with usernames (capitalizing each word)
        updatedTranscript = updatedTranscript.replace(regex, `${username}:`);
    });

    // Return the updated transcript
    return updatedTranscript;
}