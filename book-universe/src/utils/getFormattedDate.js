const getFormattedDate = (date) => {
    console.log()
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    var formattedDate =  (dd > 9 ? '' : '0') + dd + '-' + (mm > 9 ? '' : '0') + mm + '-' + date.getFullYear() + ' ' + hours + ':' + minutes
    
    return formattedDate
};

export default getFormattedDate;