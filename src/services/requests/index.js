export const fetchData = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(url).then((res) => res && resolve(res));
    } catch (error) {
      console.log(error);
    }
  });
};
