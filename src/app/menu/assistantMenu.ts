import { CoreMenu } from "@core/types";

export const assistantMenu: CoreMenu[] = [
  {
    id: "Companies",
    title: "Voir les Sociétés",
    type: "item",
    icon: "codesandbox",
    url: "/assistants/companies",
  },
  {
    id: "clients",
    title: "Gérer vos Clients",
    translate: "MENU.SAMPLE",
    type: "item",
    icon: "user",
    url: "assistants/clients",
  },
  {
    id: "Assistantchat",
    title: "Chat",
    type: "item",
    icon: "message-square",
    url: "/chat/assistants",
    badge: {
      title: "New",
      classes: "badge-light-success badge-pill",
    },



  },
  {
    id: "Settings",
    title: "Paramétres ",
    type: "item",
    icon: "user-check",
    url: "/assistants/settings",
  },
];
