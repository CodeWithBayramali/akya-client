export const dateConverter = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDay();
  const month = date.getMonth() + 1; // Aylar 0'dan başlar, bu yüzden 1 ekliyoruz
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formatNumber = (num:number) => (num < 10 ? `0${num}` : num);
  const formattedDate = `${formatNumber(day)}/${formatNumber(month)}/${year} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
    return formattedDate;
};
