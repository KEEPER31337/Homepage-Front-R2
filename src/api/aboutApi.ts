const getUserInfo = selector({
  key: 'getUserInfo',
  get: async ({ get }) => {
    const response = await axios.get('https://some-url.com');
    return response.data;
  },
});
