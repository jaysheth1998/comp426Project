
  //import axios from 'axios';
// $(function () {
export async function generateDates(e) {
    e.preventDefault();
    
    
    let ticker = document.getElementById("enter").value;
    if(ticker!=undefined & ticker!=""){
    const key = '7PY7444P5U18HQZM';
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+key;
    const result = await axios({
        method: 'get',
        url: url,
        
      });
    
      //console.log(result.data["Weekly Time Series"]);

      //console.log(result.data["Time Series (Daily)"]["2020-07-02"]);
      var d = new Date("2020-07-01");
      //var x = new Date("2020-11-21");
      //x = x.toISOString();
      //console.log(x);
      //var s = d.toISOString().substring(0,10);
      //console.log(s);
      //d.setDate(d.getDate()+1);
      //s = d.toISOString().substring(0,10);
      //console.log(s);
      //s = "2020-07-02"
      //console.log(s);
      //console.log(result.data["Time Series (Daily)"][s]);

      let dateArr = [];
      let exportArr =[];
      
     
      for(let i = 0; i<100; i++){
         d = new Date(d);
         //console.log(d);
        d.setDate(d.getDate()+1);
        //let x = d;
        d = d.toISOString().substring(0,10);
        //console.log(d);
        if(result.data["Time Series (Daily)"][d]!=undefined){

        
        let openX = parseInt(result.data["Time Series (Daily)"][d]["1. open"]);
        let closeX = parseInt(result.data["Time Series (Daily)"][d]["4. close"]);
        //console.log(openX);
        let change = document.getElementById("determineChange").value;
        let changeX = change*0.01+1;
        let expected = openX*changeX;
        if(change>0){

        
        if(closeX>=expected){
            //console.log("yes");
            dateArr.push(d);
            //exportArr.push(x);
  
        }
    }
        if(change<0){
            if(closeX<=expected){
                dateArr.push(d);
                //exportArr.push(x);
            }
            

        }
    
    }
    
      }
      console.log(dateArr);
      //console.log(exportArr);
      dateButtons(dateArr);
    }

}


export function dateButtons(x){
    let dateButtonList  = `<div>`;

    for(let i =0; i <x.length; i++){
        
        let oneButton = x[i];
        dateButtonList+=`<button id = "${oneButton}">${oneButton}</button>`;

    }
    dateButtonList+=`</div>`;
    $('#listOfButtons').append(dateButtonList);

}


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
        update += `<option value = ${result.data["bestMatches"][i]["1. symbol"]}>${result.data["bestMatches"][i]["1. symbol"]}:  ${result.data["bestMatches"][i]["2. name"]}</option>`;
        }
    } 
    update +=`</select></div>`;
    $('#mo').replaceWith(update);
}
    }
}

export async function changeFucntion(event){
    $('#mo').replaceWith(`<div id = "mo"></div>`);
    $('#enter').val(event.target.value);
    

}
// export function getChange(event){
//     return event
// }

export const renderSite = function() {
    const $root = $('#root');
    //const $root = $('#root');
    //$root.append(`<h2>YOOOOOOOOOO</h2>`);

    
    $(document).on('click', '#findDate', generateDates);
    
    enter.addEventListener('input', updateValue);
    $(document).on('click', 'option',changeFucntion);
    
   
}




$(function(){
    renderSite(); 
});