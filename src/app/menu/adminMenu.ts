import { CoreMenu } from "@core/types";

export const adminMenu: CoreMenu[] = [
    {
    id: "Assistants",
    title: "Gérer Assistants",
    type: "item",
    icon: "user-check",
    url: "/admin/assistants",
  },
  {
    id: "Clients",
    title: "Gérer Clients",
    type: "item",
    icon: "users",
    url: "/admin/clients",
  },
  {
    id: "Companies",
    title: "Voir les Sociétés",
    type: "item",
    icon: "codesandbox",
    url: "/admin/companies",
  },
  {
    id: "chat",
    title: "Chat",
    type: "item",
    icon: "message-square",
    url: "/chat/admin",
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
    url: "/admin/settings",
  },
];
