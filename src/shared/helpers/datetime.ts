export const formatTime = (h: number, m: number, s: number) => {
   const hours = h < 10 ? `0${h}` : h;
   const minutes = m < 10 ? `0${m}` : m;
   const seconds = s < 10 ? `0${s}` : s;
   return `${hours}:${minutes}:${seconds}`;
};
