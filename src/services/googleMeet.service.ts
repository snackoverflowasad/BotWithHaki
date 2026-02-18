import path from "node:path";
import { Auth, google } from "googleapis";
import { title } from "node:process";
import { getAuth } from "../utils/googleAuth.js";
// import { eventType } from "../types/types.js";
// import { authenticate as AuthType } from "@google-cloud/local-auth";
import { calendar_v3 } from "googleapis";
import { createEvent } from "../utils/response.js";

type eventType = calendar_v3.Schema$Event;

export const createMeeting = async (
  title: string,
  description: string,
  date: string,
  attendeeEmails: string[],
): Promise<void> => {
  const auth = await getAuth();
  const calendar = google.calendar({ version: "v3", auth: auth as any });
  const event: eventType = {
    summary: title,
    description,
    start: {
      dateTime: date,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(
        new Date(date).getTime() + 60 * 60 * 1000,
      ).toISOString(),
      timeZone: "Asia/Kolkata",
    },
    attendees: attendeeEmails.map((email) => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(7),
      },
    },
  };
  const res = createEvent(event);
  console.log("Meeting created successfully!");
  res
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res);
    });
};
