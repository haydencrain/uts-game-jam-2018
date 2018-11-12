export const centerGameObjects = (objects) => {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
};

export const getRandomNumber = (num1, num2) => Math.floor(Math.random() * (num2)) + num1;
