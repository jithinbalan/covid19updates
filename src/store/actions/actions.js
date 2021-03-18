export const loading = () => {
  return {
    type: "LOADING"
  };
};


export const getWorldData = () => {
  return {
    type: "GET_WORLD_DATA"
  };
};


export const getNewsData = () => {
  return {
    type: "GET_NEWS_DATA"
  };
};


export const ageUpAsnc = val => {
  return { type: "AGE_UP", value: val };
};

export const ageUp = val => {
  return dispach => {
    dispach(loading());
    setTimeout(() => {
      dispach(ageUpAsnc(val));
    }, 5000);
  };
};

export const ageDown = val => {
  return { type: "AGE_DOWN", value: val };
};
