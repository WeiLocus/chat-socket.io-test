const tweets = [
  {
    id: 60,
    description: '那些老屁股的見解太迂腐了，我要反對他們！',
    createdAt: '2023-03-23T13:58:29.000Z',
    replyCounts: 2,
    likeCounts: 0,
    isLiked: 0,
    User: {
      id: 100,
      account: 'user100',
      name: 'user100',
      avatar: 'http://placekitten.com/g/200/300',
    },
  },
  {
    id: 61,
    description:
      '我想到一個一定得獎的作品，就是用QR Code當作山水畫的皴法。有沒有畫山水的我們來合作一下。',
    createdAt: '2023-03-22T03:24:29.000Z',
    replyCounts: 2,
    likeCounts: 3,
    isLiked: 1,
    User: {
      id: 101,
      account: 'user101',
      name: 'user101',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    },
  },
  {
    id: 62,
    description:
      '這樣那些感到害怕或認為自己無法實現目標的人看到我衝過馬拉松的終點線，就會對自己說：我也能做到。',
    createdAt: '2023-03-23T05:24:29.000Z',
    replyCounts: 2,
    likeCounts: 5,
    isLiked: 1,
    User: {
      id: 102,
      account: 'user102',
      name: 'user102',
      avatar: 'https://api.lorem.space/image/face?w=250&h=250',
    },
  },
  {
    id: 63,
    description:
      '今天去看of an age, 超好看！台詞還有提到凱特布蘭琪、妮可基嫚、王家衛電影，很有意思。',
    createdAt: '2023-03-23T02:34:29.000Z',
    replyCounts: 2,
    likeCounts: 0,
    isLiked: 0,
    User: {
      id: 103,
      account: 'user103',
      name: 'user103',
      avatar: 'http://placekitten.com/g/500/500',
    },
  },
  {
    id: 64,
    description:
      '天轉熱了 可以喝冰咖啡了 建議用我家的義式咖啡 煮濃一些 加冰塊 很不錯',
    createdAt: '2023-03-20T13:24:29.000Z',
    replyCounts: 2,
    likeCounts: 0,
    isLiked: 0,
    User: {
      id: 104,
      account: 'user104',
      name: 'user104',
      avatar: 'http://placekitten.com/g/600/600',
    },
  },
  {
    id: 65,
    description:
      '以前讀過一個網路廣傳的文章，大意是說哈佛大學學生之所以優秀，是因為他們都睡很少晚上都還在唸書，配圖還搭上哈佛圖書館整晚通亮的樣子。',
    createdAt: '2023-03-23T05:24:59.000Z',
    replyCounts: 2,
    likeCounts: 5,
    isLiked: 1,
    User: {
      id: 105,
      account: 'user105',
      name: 'user105',
      avatar: 'https://api.lorem.space/image/face?w=350&h=350',
    },
  },
];

const replies = [
  {
    id: 30,
    comment: '不能再同意更多',
    createdAt: '2023-03-23T05:24:59.000Z',
    User: {
      id: 101,
      account: 'user101',
      name: 'user101',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    },
  },
  {
    id: 31,
    comment: '超級同意 der',
    createdAt: '2023-03-22T05:24:59.000Z',
    User: {
      id: 102,
      account: 'user102',
      name: 'user102',
      avatar: 'https://api.lorem.space/image/face?w=250&h=250',
    },
  },
  {
    id: 32,
    comment: '你再繼續胡說八道',
    createdAt: '2023-03-23T01:24:59.000Z',
    User: {
      id: 103,
      account: 'user103',
      name: 'user103',
      avatar: 'http://placekitten.com/g/500/500',
    },
  },
  {
    id: 33,
    comment: '一切都是謊言',
    createdAt: '2023-03-22T12:24:59.000Z',
    User: {
      id: 104,
      account: 'user104',
      name: 'user104',
      avatar: 'http://placekitten.com/g/600/600',
    },
  },
  {
    id: 34,
    comment: 'Agree',
    createdAt: '2023-03-23T05:00:59.000Z',
    User: {
      id: 105,
      account: 'user105',
      name: 'user105',
      avatar: 'https://api.lorem.space/image/face?w=350&h=350',
    },
  },
];

const likes = [
  {
    id: 60,
    description: '那些老屁股的見解太迂腐了，我要反對他們！',
    createdAt: '2023-03-23T13:58:29.000Z',
    replyCounts: 2,
    likeCounts: 1,
    isLiked: 1,
    User: {
      id: 100,
      account: 'user100',
      name: 'user100',
      avatar: 'http://placekitten.com/g/200/300',
    },
  },
  {
    id: 61,
    description:
      '我想到一個一定得獎的作品，就是用QR Code當作山水畫的皴法。有沒有畫山水的我們來合作一下。',
    createdAt: '2023-03-22T03:24:29.000Z',
    replyCounts: 2,
    likeCounts: 3,
    isLiked: 1,
    User: {
      id: 101,
      account: 'user101',
      name: 'user101',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    },
  },
  {
    id: 62,
    description:
      '這樣那些感到害怕或認為自己無法實現目標的人看到我衝過馬拉松的終點線，就會對自己說：我也能做到。',
    createdAt: '2023-03-23T05:24:29.000Z',
    replyCounts: 2,
    likeCounts: 5,
    isLiked: 1,
    User: {
      id: 102,
      account: 'user102',
      name: 'user102',
      avatar: 'https://api.lorem.space/image/face?w=250&h=250',
    },
  },
  {
    id: 63,
    description:
      '今天去看of an age, 超好看！台詞還有提到凱特布蘭琪、妮可基嫚、王家衛電影，很有意思。',
    createdAt: '2023-03-23T02:34:29.000Z',
    replyCounts: 2,
    likeCounts: 1,
    isLiked: 1,
    User: {
      id: 103,
      account: 'user103',
      name: 'user103',
      avatar: 'http://placekitten.com/g/500/500',
    },
  },
  {
    id: 64,
    description:
      '天轉熱了 可以喝冰咖啡了 建議用我家的義式咖啡 煮濃一些 加冰塊 很不錯',
    createdAt: '2023-03-20T13:24:29.000Z',
    replyCounts: 2,
    likeCounts: 1,
    isLiked: 1,
    User: {
      id: 104,
      account: 'user104',
      name: 'user104',
      avatar: 'http://placekitten.com/g/600/600',
    },
  },
  {
    id: 65,
    description:
      '以前讀過一個網路廣傳的文章，大意是說哈佛大學學生之所以優秀，是因為他們都睡很少晚上都還在唸書，配圖還搭上哈佛圖書館整晚通亮的樣子。',
    createdAt: '2023-03-23T05:24:59.000Z',
    replyCounts: 2,
    likeCounts: 5,
    isLiked: 1,
    User: {
      id: 105,
      account: 'user105',
      name: 'user105',
      avatar: 'https://api.lorem.space/image/face?w=350&h=350',
    },
  },
];

const tweetsByUser = [
  {
    id: 60,
    description:
      'Eveniet fuga quibusdam ad veritatis aut tempora deserunt.\nRepudiandae consequatur asperiores esse.\nDelectus iusto ipsa.',
    createdAt: '2023-03-24T08:02:38.000Z',
    updatedAt: '2023-03-24T08:02:38.000Z',
    UserId: 125,
  },
  {
    id: 61,
    description:
      'Accusamus asperiores expedita animi et ipsa commodi nobis rerum.\nVoluptatem dicta porro nulla nostrum neque cupiditate.\nAut ex porro iste beatae sit.\nMagni sapiente voluptas totam optio ducimus.\nOccaecati voluptatibus beatae necessitatibus nisi maiores.',
    createdAt: '2023-03-24T08:02:38.000Z',
    updatedAt: '2023-03-24T08:02:38.000Z',
    UserId: 125,
  },
  {
    id: 62,
    description:
      'Doloribus similique labore quisquam molestias asperiores vitae doloribus.\nQuidem sunt corrupti.\nPraesentium libero nobis optio nobis ducimus asperiores alias libero quam.\nLabore soluta labore fuga libero accusamus.',
    createdAt: '2023-03-24T08:02:38.000Z',
    updatedAt: '2023-03-24T08:02:38.000Z',
    UserId: 125,
  },
];

const repliesByUser = [
  {
    id: 4,
    comment:
      'Vel explicabo voluptas laborum unde unde ipsum tempora laudantium debitis.\nMolestias commodi voluptatem delectus distinctio.',
    createdAt: '2023-03-24T08:02:39.000Z',
    updatedAt: '2023-03-24T08:02:39.000Z',
    UserId: 2,
    TweetId: 18,
  },
  {
    id: 6,
    comment:
      'Occaecati facilis et deleniti facilis.\nAb corporis ducimus ducimus minima.\nQuae vero impedit optio deserunt voluptates labore laudantium a quos.\nFacilis perferendis ipsa nisi enim illo quibusdam culpa cumque maxime.',
    createdAt: '2023-03-24T08:02:39.000Z',
    updatedAt: '2023-03-24T08:02:39.000Z',
    UserId: 2,
    TweetId: 25,
  },
  {
    id: 15,
    comment: 'Totam eius odit assumenda odio dolores libero asperiores.',
    createdAt: '2023-03-24T08:02:39.000Z',
    updatedAt: '2023-03-24T08:02:39.000Z',
    UserId: 2,
    TweetId: 41,
  },
];

const currentUser = {
  id: 125,
  name: 'user125',
  email: 'user125@example.com',
  account: 'user125',
  introduction:
    'Reach out if you want to talk about emerging tech, creating software products, or baseball.',
  avatar:
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/268.jpg',
  cover: 'https://loremflickr.com/640/480/nature?lock=27430',
  isAdmin: false,
  createdAt: '2023-03-20T15:44:34.000Z',
  updatedAt: '2023-03-20T15:44:34.000Z',
};

const users = [
  {
    id: 125,
    name: 'user125',
    email: 'user125@example.com',
    account: 'user125',
    introduction:
      'Reach out if you want to talk about emerging tech, creating software products, or baseball.',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/268.jpg',
    cover: 'https://loremflickr.com/640/480/nature?lock=27430',
    isAdmin: false,
    createdAt: '2023-03-20T15:44:34.000Z',
    updatedAt: '2023-03-20T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 100,
    name: 'user100',
    email: 'user100@example.com',
    account: 'user100',
    introduction: '我要成為海賊王 喵喵喵 ',
    avatar: 'http://placekitten.com/g/200/300',
    cover: 'https://picsum.photos/id/123/700/300',
    isAdmin: false,
    createdAt: '2023-03-21T15:44:34.000Z',
    updatedAt: '2023-03-21T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 101,
    name: 'user101',
    email: 'user101@example.com',
    account: 'user101',
    introduction:
      'Throughout my life, I have developed this art of being able to communicate with anyone at any given time.',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    cover: 'https://picsum.photos/id/145/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 102,
    name: 'user102',
    email: 'user102@example.com',
    account: 'user102',
    introduction:
      'I manage a small cafe. I am passionate about making delicious food for others.',
    avatar: 'https://api.lorem.space/image/face?w=250&h=250',
    cover: 'https://picsum.photos/id/250/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 103,
    name: 'user103',
    email: 'user103@example.com',
    account: 'user103',
    introduction:
      'I am a high school librarian. I am passionate about helping people read.',
    avatar: 'http://placekitten.com/g/500/500',
    cover: 'https://picsum.photos/id/310/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 104,
    name: 'user104',
    email: 'user104@example.com',
    account: 'user104',
    introduction:
      'I am a professor at Stone University. I have written a book and journal article on the topics of Paleolithic history.',
    avatar: 'http://placekitten.com/g/600/600',
    cover: 'https://picsum.photos/id/400/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 105,
    name: 'user105',
    email: 'user105@example.com',
    account: 'user105',
    introduction:
      'I am passionate about travel and exploration. I am currently a truck driver, where I gained experiences in 45 places.',
    avatar: 'https://api.lorem.space/image/face?w=350&h=350',
    cover: 'https://picsum.photos/id/500/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 106,
    name: 'user106',
    email: 'user106@example.com',
    account: 'user106',
    introduction:
      'Proin quis dolor mollis, blandit erat nec, tristique ligula. Nulla volutpat urna augue, nec dignissim massa fermentum sit amet.',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
    cover: 'https://picsum.photos/id/600/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 107,
    name: 'user107',
    email: 'user107@example.com',
    account: 'user107',
    introduction: "This is user 107's profile",
    avatar: 'https://api.lorem.space/image/face?w=850&h=850',
    cover: 'https://picsum.photos/id/700/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 108,
    name: 'user108',
    email: 'user108@example.com',
    account: 'user108',
    introduction:
      'Proin quis dolor mollis, blandit erat nec, tristique ligula. Nulla volutpat urna augue, nec dignissim massa fermentum sit amet.',
    avatar: 'https://api.lorem.space/image/face?w=950&h=950',
    cover: 'https://picsum.photos/id/800/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 109,
    name: 'user109',
    email: 'user109@example.com',
    account: 'user109',
    introduction:
      'Nullam vel enim dignissim nunc pretium rhoncus. Integer ullamcorper tincidunt mattis. Nunc rutrum egestas pulvinar. Nunc viverra interdum dui sed imperdiet. Duis id felis vitae mi auctor sodales sed quis tortor. ',
    avatar: 'https://api.lorem.space/image/face?w=500&h=500',
    cover: 'https://picsum.photos/id/900/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
  {
    id: 110,
    name: 'user110',
    email: 'user110@example.com',
    account: 'user110',
    introduction:
      'Nullam vel enim dignissim nunc pretium rhoncus. Integer ullamcorper tincidunt mattis. Nunc rutrum egestas pulvinar. Nunc viverra interdum dui sed imperdiet. Duis id felis vitae mi auctor sodales sed quis tortor. ',
    avatar: 'https://api.lorem.space/image/face?w=600&h=600',
    cover: 'https://picsum.photos/id/1000/700/300',
    isAdmin: false,
    createdAt: '2023-03-22T15:44:34.000Z',
    updatedAt: '2023-03-22T15:44:34.000Z',
    followerCounts: 1,
    followingCounts: 1,
  },
];

export {
  tweets,
  replies,
  likes,
  currentUser,
  users,
  tweetsByUser,
  repliesByUser,
};
