import type { FirestoreTimestamp } from "@/interfaces/pedidos-response";

const dateTimeOptions:Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year:"numeric",
    day: "2-digit",
    hour12 : false,
    hourCycle: "h12",
    hour: "2-digit",
    minute: "2-digit",
}

export const formatDateTime= (date:FirestoreTimestamp) => {
    if(!date){
        return '';
    }
    return new Date(date.seconds * 1000).toLocaleTimeString("es-MX", dateTimeOptions);
}
