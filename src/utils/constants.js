import imageCard1 from '../images/imgMovie1.png'
import imageCard2 from '../images/imgMovie2.png'
import imageCard3 from '../images/imgMovie3.png'

export const works = [
  {
    id: 1,
    title: "Статичный сайт",
    url: "https://github.com/ruslanabronnikova/how-to-learn"
  },
  {
    id: 2,
    title: "Адаптивный сайт",
    url: "https://github.com/ruslanabronnikova/russian-travel"
  },
  {
    id: 3,
    title: "Одностраничное приложение",
    url: "https://github.com/ruslanabronnikova/react-mesto-api-full-gha"
  },
];

const saveMoviesData = [
  {
    title: "33 слова о дизайне",
    duration: "1ч 17м",
    imageUrl: imageCard1,
    isSaved: false,
  },
  {
    title: "Киноальманах «100 лет дизайна»",
    duration: "1ч 17м",
    imageUrl: imageCard2,
    isSaved: true,
  },
  {
    title: "В погоне за Бенкси",
    duration: "1ч 17м",
    imageUrl: imageCard3,
    isSaved: false,
  },
]

export const data = {saveMoviesData}
