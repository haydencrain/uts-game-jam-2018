export const centerGameObjects = (objects) => {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
};

export const getRandomNumber = (min, max) => Math.random() * (max - min) + min;


export const getRandomX = (x, width) => getRandomNumber(x, (x + width));

export const getRandomY = (y, height) => getRandomNumber(y, (y + height));
