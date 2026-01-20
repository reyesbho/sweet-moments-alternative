import { Timestamp } from "firebase/firestore";

const dateTimeOptions:Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year:"numeric",
    day: "2-digit",
    hour12 : false,
    hourCycle: "h12",
    hour: "2-digit",
    minute: "2-digit",
}

export const formatDateStringFromTimestamp= (date:Timestamp) => {
    if(!date){
        return '';
    }
    return new Date(date.seconds * 1000 + date.nanoseconds).toLocaleTimeString("es-MX", dateTimeOptions);
}



export const formatDateFromTimestamp= (date?:Timestamp) => {
    if(!date){
        return new Date();
    }
    return new Timestamp(date.seconds, date.nanoseconds).toDate();
}


export const getDateStringFromDate = (date: Date):string => {
    return date.toLocaleDateString('es-MX');
}

export const getHourFromDate = (date: Date) => {
   return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

export const addHourToDate = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);

  const newDate = new Date(date); // copia, no muta el original
  newDate.setHours(hours, minutes, 0, 0);

  return newDate;
};