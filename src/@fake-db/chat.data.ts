export class ChatFakeData {
  public static profileUser = {
    id: 11,
    avatar: 'assets/images/portrait/small/avatar-s-11.jpg',
    fullName: 'Amine Drawil',
    role: 'admin',
    about:
      'Un professionnel qui vise à devenir une meilleure version de lui-même chaque jour.',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  };
  public static contacts = [
    {
      id: 1,
      fullName: 'Ons Drawil',
      role: 'Frontend Developer',
      about: '',
      avatar: 'assets/images/avatars/1.png',
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Sabri Abbassi',
      role: 'UI/UX Designer',
      about:
        'CEO @Kyrannis Digital Services',
      avatar: 'assets/images/avatars/2.png',
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Salima Salima',
      role: 'Dev',
      about:
        'UI/UX Designer',
      avatar: 'assets/images/avatars/3.png',
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Badis Souissi',
      role: 'Data scientist',
      about:
        'CEO @Kyrannis Digital Services',
      avatar: 'assets/images/avatars/4.png',
      status: 'online'
    },
    {
      id: 5,
      fullName: 'Salima ',
      role: 'Dietitian',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatar: 'assets/images/avatars/5.png',
      status: 'busy'
    },
    {
      id: 6,
      fullName: 'Salma Soulayma',
      role: 'Marketing executive',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: 'assets/images/avatars/6.png',
      status: 'online'
    },
    {
      id: 7,
      fullName: 'Amine Draaa',
      role: 'Special educational needs teacher',
      about:
        'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
      avatar: 'assets/images/avatars/7.png',
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Mauro Elenbaas',
      role: 'Advertising copywriter',
      about:
        'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
      avatar: 'assets/images/avatars/12.png',
      status: 'away'
    },
    {
      id: 9,
      fullName: 'Bridgett Omohundro',
      role: 'Designer, television/film set',
      about:
        'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
      avatar: 'assets/images/avatars/9.png',
      status: 'offline'
    },
    {
      id: 10,
      fullName: 'Zenia Jacobs',
      role: 'Building surveyor',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatar: 'assets/images/avatars/10.png',
      status: 'away'
    }
  ];

  public static chats = [
    {
      id: 1,
      userId: 2,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Bonjour',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Bonjour, tout va bien Amine?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'Oui Sabri merci , vous pouvez voir Bitbucket ? je viens de rajouter une nouvelle fonctionnalité , il me faut un code review',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Ok, à toute.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
      ]
    },
    {
      id: 2,
      userId: 1,
      unseenMsgs: 1,
      chat: [
        {
          message: "How can we help? We're here for you!",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'It should be Bootstrap 4 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Modern admin is the responsive bootstrap 4 admin template.!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Looks clean and fresh UI.',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: "It's perfect for my next project.",
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Thanks, from ThemeForest.',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'I will purchase it for sure. 👍',
          time: 'previousDay',
          senderId: 1
        }
      ]
    }
  ];
}
