import { tool } from "@openai/agents";
import { z } from "zod";
import { createMeeting } from "../services/googleMeet.service.js";

export const MeetingInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().default(""),
  date: z.string().describe("ISO 8601 datetime string"),
  attendees: z
    .array(z.string().email("Invalid email format"))
    .min(1, "At least one attendee is required"),
});

export const MeetingOutputSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    eventId: z.string().optional(),
    meetLink: z.string().url().optional(),
    scheduledFor: z.string().optional(),
    error: z.string().optional(),
  })
  .strict();

export type MeetingOutput = z.infer<typeof MeetingOutputSchema>;

export const createMeetingTool = tool({
  name: "create_meeting",
  description:
    "Create a Google Calendar meeting with a Google Meet link and invite attendees",
  parameters: MeetingInputSchema,

  execute: async (input): Promise<MeetingOutput> => {
    try {
      console.log("TOOL INPUT:", input);
      const result = (await createMeeting(
        input.title,
        input.description ?? "",
        input.date,
        input.attendees,
      )) as { id: string; hangoutLink?: string } | null | undefined;
      console.log("TOOL RESULT:", result);
      const output: MeetingOutput = {
        success: true,
        message: "Meeting created successfully",
        eventId: result?.id,
        meetLink: result?.hangoutLink ?? undefined,
        scheduledFor: input.date,
      };

      return MeetingOutputSchema.parse(output);
    } catch (error: any) {
      console.error("TOOL ERROR:", error);
      console.error("ERROR MESSAGE:", error?.message);
      return MeetingOutputSchema.parse({
        success: false,
        message: "Failed to create meeting",
        error: error?.message ?? "Unknown error",
      });
    }
  },
});
