export const dateToString = date => {
  const option = {year: 'numeric', month: 'long', day: 'numeric'};
  const stringDate = new Date(date).toLocaleString('id-ID', option);
  const arrDate = stringDate.split(' ');
  return `${arrDate[1]} ${arrDate[2]}`;
};
