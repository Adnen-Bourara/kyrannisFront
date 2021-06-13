import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: "clients",
    title: "Gérer vos Fichiers",
    translate: "MENU.SAMPLE",
    type: "item",
    icon: "user",
    url: "clients/Fichier",
  },
  {
    id: "Clientchat",
    title: "Chat",
    type: "item",
    icon: "message-square",
    url: "/chat/clients",
    badge: {
      title: "New",
      classes: "badge-light-success badge-pill",
    },
  }

]
