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