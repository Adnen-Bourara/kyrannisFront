import { CoreMenu } from "@core/types";

export const adminMenu: CoreMenu[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "collapsible",
    icon: "home",
    children: [
      {
        id: "home",
        title: "Page d'acceuil",
        type: "item",
        icon: "airplay",
        url: "/admin/home",
      },
      {
        id: "History",
        title: "Historique ",
        type: "collapsible",
        icon: "archive",
        badge: {
          title: "8",
          classes: "badge-light-warning badge-pill",
        },
        children: [
          {
            id: "Users",
            title: "Utilisateurs",
            type: "item",
            icon: "users",
            url: "#",
          },
          {
            id: "Transactions",
            title: "Transactions ",
            type: "item",
            icon: "repeat",
            url: "#",
          },
        ],
      },
    ],
  },
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
  // Files
  {
    id: "files",
    title: "Fichiers",
    type: "collapsible",
    icon: "file-text",
    children: [
      {
        id: "upload",
        title: "Envoyer Fichiers",
        type: "item",
        icon: "upload",
        url: "/upload/admin",
      },
      {
        id: "allFiles",
        title: "Consulter Fichiers",
        type: "item",
        icon: "list",
        url: "/admin/viewfiles",
      },
    ],
  },
  {
    id: "Settings",
    title: "Paramétres ",
    type: "item",
    icon: "user-check",
    url: "/admin/settings",
  },
];
