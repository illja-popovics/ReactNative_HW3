export const travelCards = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Ейфелева вежа",
    location: "Париж, Франція",
    likes: 152,
    comments: [
      { id: 1, user: "Anna", text: "Який шикарний вигляд!", dateTime: "09 червня, 2020 | 08:40"},
      { id: 2, user: "Ihor", text: "Мрію побувати тут.", dateTime: "12 червня, 2020 | 12:40" }
    ],
    geoLocation: {
      latitude: 60.73061,
      longitude: -73.935242,
    },
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Гранд-Каньйон",
    location: "Аризона, США",
    likes: 98,
    comments: [
      { id: 1, user: "Oleh", text: "Неймовірне місце!", dateTime: "07 червня, 2020 | 07:40" },
    ],
    geoLocation: {
      latitude: 50.73061,
      longitude: -53.935242,
    },
  },
  {
    id: 3,
    photo: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Північне сяйво",
    location: "Тромсе, Норвегія",
    likes: 203,
    comments: [],
    geoLocation: {
      latitude: 40.73061,
      longitude: -73.935242,
    },
  },
];
