const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
var rec;
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(rec){
        clearTimeout(rec);
    }
    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

});
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
const fetchPrice =async(ctype) => {
    const r = await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
    const price = r.data.ticker.price;
    const volume = r.data.ticker.volume;
    const change = r.data.ticker.change;
    const time = timeConverter(r.data.timestamp);
    const base = r.data.ticker.base;
    const target = r.data.ticker.target;
    res.innerHTML = `
    <tr>
    <td>Property</td>
    <td>Value</td>
</tr>
<tr>
    <td>${base}</td>
    <td id="test">${price} ${target}</td>
</tr>
<tr>
    <td>Volume</td>
    <td>${volume}</td>
</tr>
<tr>
    <td>Change</td>
    <td>${change}</td>
</tr>
<tr>
    <td>Last Update</td>
    <td>${time}</td>
</tr>`

    rec = setTimeout(()=>fetchPrice(ctype),10000);



}