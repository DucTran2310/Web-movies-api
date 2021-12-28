const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '699a62ca875bffd8ff90759b015b462c',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig
