export interface protocolType {
  name: string;
  allowGroupReplies: boolean;
  allowBadWords: boolean;
  description: string;
}

type ContactGroup = {
  number: number[];
};

export type Contacts = {
  importants: ContactGroup;
  friends: ContactGroup;
};

// export type eventType = {
//   summary: string;
//   description?: string;
//   start: {
//     dateTime: string;
//     timeZone: string;
//   };
//   end: {
//     dateTime: string;
//     timeZone: string;
//   };
//   reminders: {
//     useDefault: boolean;
//     overrides: {
//       method: "popup" | "email";
//       minutes: number;
//     }[];
//   };
// };
