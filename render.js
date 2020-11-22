
  //import axios from 'axios';
// $(function () {
export async function generateDates(e) {
    e.preventDefault();
   // $('#listOfButtons').empty();
   $('#listOfButtons').replaceWith(`<div id = "listOfButtons"></div>`);
    
    let ticker = document.getElementById("ticker").value;
    if(ticker!=undefined & ticker!=""){
    //const key = '7PY7444P5U18HQZM';
    //const key = 'JL0PP4ILC96MGPUX';
    const myKey = '51WDB58OFO8P247S';
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+myKey;
    const result = await axios({
        method: 'get',
        url: url,
        
      });
      console.log(result);
    
      let dateArr = [];
      let exportArr =[];
      var d = new Date();
      d = d.toISOString().substring(0,10);
      
     
      for(let i = 0; i<100; i++){
         d = new Date(d);
        d.setDate(d.getDate()-1);
        //let x = d;
        d = d.toISOString().substring(0,10);
        console.log(d);
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
    let dateButtonList  = ``;

    for(let i =0; i <x.length; i++){
        
        let oneButton = x[i];
        dateButtonList+=`<button class ="button is-rounded thisButton" id = "${oneButton}">${oneButton}</button>`;

    }
    //dateButtonList+=`</div>`;
    $('#listOfButtons').append(dateButtonList);

}


export async function updateValue(){
    let update = `<div class="select is-multiple"><select id = "mo" multiple size="5">`;

    
    let progress = document.getElementById("ticker").value;
    if(progress !=''){
        console.log("hi");
        //const myKey = '51WDB58OFO8P247S';
    // const key = 'JL0PP4ILC96MGPUX';
        const myKey = '7PY7444P5U18HQZM';
        const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+progress+"&apikey="+myKey;
        const result = await axios({
            method: 'get',
            url: url,
        
      });
      console.log(result);
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
    $('#ticker').val(event.target.value);
    

}
// export function getChange(event){
//     return event
// }

export async function generateFeed(e) {
    
    e.preventDefault();
    
    let buttonDate = e.target.id;
    console.log(buttonDate);
    let priorDate = new Date(buttonDate);
    priorDate.setDate(priorDate.getDate()-2);
    priorDate = priorDate.toISOString().substring(0,10);
    console.log(priorDate)

    const $root = $('#newsFeed')
    $root.empty();

    // LOCAL RUN
    //const myKey = "480cae414ceb43cbab94d9ab001bd7ec"

    // SERVER RUN
    const myKey = "c97e329f04a9821fe41a8f8bde77b7e6"

    let ticker = document.getElementById('ticker').value;
    console.log(ticker)
    let valuesArr = []
    valuesArr.push(ticker);
    valuesArr.push(buttonDate);


    const feed = await axios({
        method: 'get',                                                                                         
        url: 'https://gnews.io/api/v4/search?q='+ticker+'&lang=en&country=us&in=title,description,content&from='+priorDate+'T22:34:26Z&to='+buttonDate+'T22:34:26Z&sortBy=relevance&token='+myKey,
        // withCreditals: true                                                                                 
    });                                                                                                                     
    console.log(feed);
    let posts = `<div id=articles>`;
    if(feed.data.articles.length>0){
        for(let i = 0; i < feed.data.articles.length; i++) {
            if( feed.data.articles[i].title!=null && feed.data.articles[i].image!=null && feed.data.articles[i].description!= null && feed.data.articles[i].source != null) {
            valuesArr.push(feed.data.articles[i].url)
            posts += `
            <div class="box">
            <div class="card">
                <header class="card-header">
                    <h1 class="title"><a href="${feed.data.articles[i].url}" target="_blank">${feed.data.articles[i].title}</a></h1>
                </header>
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="${feed.data.articles[i].image}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        ${feed.data.articles[i].description}
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="${feed.data.articles[i].source.url} class="card-footer-item" target="_blank">Source: ${feed.data.articles[i].source.name}</a>
                        <a class="card-footer-item"><button class="thatButton" name="save" type="submit"  value="${valuesArr}">Save Article <span class="icon is-medium"><i class="fa fa-heart"></i></span></button></a>
                </footer>
            </div>
            </div>
            <br>
            `
                } 
        }
    } else {
        posts += `<h1 class="title">Sorry no news on this date :/</h1>`
    }
    posts += `</div>`;
    $root.append(posts);
    valuesArr.pop();
}

export const printValue = function(e) {
    console.log(e.target.value);
}

// export const clearPage = function() {
//     $('#listOfButtons').empty();
//     $('#newsFeed').empty();
// }

export const renderSite = function() {
    //const $root = $('#root');
    //const $root = $('#root');
    //$root.append(`<h2>YOOOOOOOOOO</h2>`);

    
    $(document).on('click', '#findDate', generateDates);
    $(document).on('input','#ticker', updateValue);
    //ticker.addEventListener('input', updateValue);
    $(document).on('click', 'option',changeFucntion);
    $(document).on('click','.thisButton', generateFeed);
    $(document).on('click','.thatButton', printValue);
    //$(document).on('click','#clearNews', clearPage);
    
   
}




$(function(){
    renderSite(); 
});