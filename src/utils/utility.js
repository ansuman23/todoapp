// export function formatDate(dateString) {
//     const date=new Date(dateString);
//     const day=date.getDate();
//     const month=date.toLocaleString('default', { month: 'long' });
//     const year=date.getFullYear();
//     const suffix=day%10===1 && day!==11 ?'st':day%10===2&&day!==12?'nd':day%10===3&&day!==13?'rd':'th';
//     return `${day}${suffix} ${month} ${year}`;
// }
export function formatDate(dateString) {
    const [month,day,year]=dateString.split('/').map(Number);
    const date=new Date(year,month-1,day);
    const dayNumber=date.getDate();
    const monthName=date.toLocaleString('default', { month: 'long' });
    const yearNumber=date.getFullYear();
    const suffix=dayNumber % 10 === 1 && dayNumber !== 11?'st':dayNumber % 10 === 2 && dayNumber !== 12 ? 'nd':dayNumber % 10 === 3 && dayNumber !== 13?'rd': 'th';
    return `${dayNumber}${suffix} ${monthName} ${yearNumber}`;
}
