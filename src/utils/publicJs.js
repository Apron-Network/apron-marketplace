const formatResult =  (result) =>{
    let str;
    if (result && result.output) {
        str = result.output.toHuman();
    }
    return str;
}


const  dateType = (timestamp) => {

    let timeAfter = parseInt(timestamp.replace(/,/g,''));
    let d = new Date( timeAfter * 1000);

    let yyyy = d.getFullYear() + '-';

    let MM = (d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1) + '-';

    let dd = d.getDate() + ' ';

    let HH = d.getHours() + ':';

    let mm = d.getMinutes() + ':';

    let ss = d.getSeconds();

    return yyyy + MM + dd + HH + mm + ss;
}

const toDate = (timestamp) => {
    let d = new Date( parseInt(timestamp.replace(/,/g,'')) * 1000);

    let yyyy = d.getFullYear() + '-';

    let MM = (d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1) + '-';

    let dd = d.getDate();

    return yyyy + MM + dd
}

export default{ formatResult, dateType, toDate }
