
  //import axios from 'axios';
// $(function () {
export async function generateDates(e) {
    e.preventDefault();
    
    let ticker = document.getElementById("enter").value;

    const key = '7PY7444P5U18HQZM';
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+key;
    const result = await axios({
        method: 'get',
        url: url,
        
      });
      //console.log(result.data["Weekly Time Series"]);

      //console.log(result.data["Time Series (Daily)"]["2020-07-02"]);
      var d = new Date("2020-07-01");
      //var s = d.toISOString().substring(0,10);
      //console.log(s);
      //d.setDate(d.getDate()+1);
      //s = d.toISOString().substring(0,10);
      //console.log(s);
      //s = "2020-07-02"
      //console.log(s);
      //console.log(result.data["Time Series (Daily)"][s]);

      let dateArr = [];
      
     
      for(let i = 0; i<10; i++){
         d = new Date(d);
         //console.log(d);
        d.setDate(d.getDate()+1);
        d = d.toISOString().substring(0,10);
        //console.log(d);
        if(result.data["Time Series (Daily)"][d]!=undefined){

        
        let openX = parseInt(result.data["Time Series (Daily)"][d]["1. open"]);
        let closeX = parseInt(result.data["Time Series (Daily)"][d]["4. close"]);
        //console.log(openX);
        let expected = openX*1.01;
        if(closeX>=expected){
            //console.log("yes");
            dateArr.push(d);
  
        }
        else{
            //console.log("no");
        }
        }
    
    }
    console.log(dateArr);
     

      //console.log(result.data["Time Series (Daily)"][]);

      


// let monthA = 1;
// let day = 3;
// let date = "2020-01-03";

// for(let i = 0;i<10; i++){
//      console.log(result.data["Weekly Time Series"]);

//  }
      

}





// axios.get(url)
// .then(res => {
//   console.log(res.data);
//   let stocks = _.flattenDeep( Array.from(res.data['Stock Quotes']).map((stock) => [{symbol: stock['1. symbol'], price: stock['2. price'], volume: stock['3. volume'], timestamp: stock['4. timestamp']}]) );
//   console.log(stocks);
  
  
// })
// .catch(error => console.log(error))



export async function updateValue(){
    let update = `<div class="select is-multiple"><select id = "mo" multiple size="5">`;

    
    let progress = document.getElementById("enter").value;
    if(progress !=''){

    
    const key = '7PY7444P5U18HQZM';
    const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+progress+"&apikey="+key;
    const result = await axios({
        method: 'get',
        url: url,
        
      });
     // console.log(result.data["bestMatches"][0]["1. symbol"]);
    if(result.data["bestMatches"]!=undefined){

    
    for(let i = 0; i<4; i++){
        if(result.data["bestMatches"][i]!=undefined){
        update += `<option id = "${result.data["bestMatches"][i]["1. symbol"]}" value = ${result.data["bestMatches"][i]["1. symbol"]}>${result.data["bestMatches"][i]["1. symbol"]}:  ${result.data["bestMatches"][i]["2. name"]}</option>`;
        }
    } 
    update +=`</select></div>`;
    $('#mo').replaceWith(update);
}
    }
}
export const renderSite = function() {
    const $root = $('#root');
    //const $root = $('#root');
    //$root.append(`<h2>YOOOOOOOOOO</h2>`);

    
    $(document).on('click', '#findDate', generateDates);
    
    enter.addEventListener('input', updateValue);
   
}


$(function(){
    renderSite(); 
});