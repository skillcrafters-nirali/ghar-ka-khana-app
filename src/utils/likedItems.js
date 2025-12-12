// Global state for liked items
let globalLikedItems = {};

export const setGlobalLikedItems = (likedItems) => {
  globalLikedItems = likedItems;
};

export const getGlobalLikedItems = () => {
  return globalLikedItems;
};