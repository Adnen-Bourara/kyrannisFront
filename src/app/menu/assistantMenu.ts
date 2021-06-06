import { CoreMenu } from "@core/types";

export const assistantMenu: CoreMenu[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: "home",
    url: "assistants/home",
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
    id: "files",
    title: "Files",
    type: "collapsible",
    icon: "file-text",
    children: [
      {
        id: "upload",
        title: "Envoyer Fichiers",
        type: "item",
        icon: "upload",
        url: "/upload/assistants",
      },
      {
        id: "allFiles",
        title: "Consulter Fichiers",
        type: "item",
        icon: "list",
        url: "/assistants/viewfiles",
      },
    ],
  },
  {
    id: "Settings",
    title: "Paramétres ",
    type: "item",
    icon: "user-check",
    url: "/assistants/settings",
  },
];
