export class accountSettingsFakeData {
  public static data = {
    accountSetting: {
      general: {
        avatar: 'assets/images/portrait/small/avatar-s-11.jpg',
        username: 'Drawil',
        fullName: 'Amine ',
        email: 'drawilamine@gmail.com',
        company: 'Kyrannis Digital Services'
      },
      info: {
        bio: '',
        dob: null,
        country: 'Tunisie',
        website: '',
        phone: '(+2016) 52 486 547'
      },
      social: {
        socialLinks: {
          twitter: 'https://www.twitter.com',
          facebook: '',
          google: '',
          linkedIn: 'https://www.linkedin.com',
          instagram: '',
          quora: ''
        },
        connections: {
          twitter: {
            profileImg: 'assets/images/avatars/11-small.png',
            id: '@johndoe'
          },
          google: {
            profileImg: 'assets/images/avatars/3-small.png',
            id: '@luraweber'
          },
          facebook: {},
          github: {}
        }
      },
      notification: {
        commentOnArticle: true,
        AnswerOnForm: true,
        followMe: false,
        newAnnouncements: true,
        productUpdates: true,
        blogDigest: false
      }
    }
  };
}
