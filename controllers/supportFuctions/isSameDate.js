const isSameDate = (date1, date2)=> {
    console.log(date1,date2);
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
           date1.getUTCMonth() === date2.getUTCMonth() &&
           date1.getUTCDate() === date2.getUTCDate();
  }


module.exports ={
    isSameDate
}