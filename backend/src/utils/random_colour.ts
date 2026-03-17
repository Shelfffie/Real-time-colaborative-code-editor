export const getRandomColour = () => {
  let r: number = Math.floor(Math.random() * 256);
  let g: number = Math.floor(Math.random() * 256);
  let b: number = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};
