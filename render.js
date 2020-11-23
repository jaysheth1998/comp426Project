//generates dates for all days that the requested stock saw a % price change equal to or greater than selected 
export async function generateDates(e) {
    e.preventDefault();

   $('#listOfDateButtons').replaceWith(`<div id = "listOfDateButtons"></div>`);
    

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
    
    let dateArr = [];
    var d = new Date();
    d = d.toISOString().substring(0,10);
      
     
    for(let i = 0; i<90; i++){
        d = new Date(d);
        d.setDate(d.getDate()-1);
        d = d.toISOString().substring(0,10);

        if(result.data["Time Series (Daily)"][d]!=undefined){

            let openX = parseInt(result.data["Time Series (Daily)"][d]["1. open"]);
            let closeX = parseInt(result.data["Time Series (Daily)"][d]["4. close"]);
            let change = document.getElementById("determineChange").value;
            let changeX = change*0.01+1;
            let expected = openX*changeX;

            if(change>0){
                if(closeX>=expected){
                dateArr.push(d);
                }
            }

            if(change<0){
                if(closeX<=expected){
                    dateArr.push(d);
                }
            }
        }
    }
    dateButtons(dateArr);
    }

}

//Creates date buttons for all dates generated in the generateDates()
export function dateButtons(x){
    let dateButtonList  = ``;

    for(let i =0; i <x.length; i++){
        
        let oneButton = x[i];
        dateButtonList+=`<button class ="button is-rounded thisButton" id = "${oneButton}">${oneButton}</button>`;

    }

    $('#listOfDateButtons').append(dateButtonList);

}


export async function updateValue(){

    let update = `<div id = "mo" class="select is-multiple"><select  multiple size="5">`;

    let progress = document.getElementById("ticker").value;

    if(progress !=''){
        //const myKey = '51WDB58OFO8P247S';
        // const key = 'JL0PP4ILC96MGPUX';
        const myKey = '7PY7444P5U18HQZM';
        const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+progress+"&apikey="+myKey;
        const result = await axios({
            method: 'get',
            url: url,     
        });

        if(result.data["bestMatches"]!=undefined){
            for(let i = 0; i<4; i++){
                if(result.data["bestMatches"][i]!=undefined){
                    update += `<option value = ${result.data["bestMatches"][i]["1. symbol"]}>${result.data["bestMatches"][i]["1. symbol"]}:  ${result.data["bestMatches"][i]["2. name"]}</option>`;
                }
            } 
        update +=`</select></div>`;
        $('#mo').replaceWith(update);
        }
    } else  {

        changeFucntion();
    }
}

export async function changeFucntion(event){

   
    $('#mo').replaceWith(`<div id = "mo"></div>`);
    $('#ticker').val(event.target.value);

}

// *** Below is the Generate Feed without ability to make a comment ***///////////////////////////////////////

// export async function generateFeed(e) {
    
//     e.preventDefault();
    
//     let buttonDate = e.target.id;
//     console.log(buttonDate);
//     let priorDate = new Date(buttonDate);
//     priorDate.setDate(priorDate.getDate()-2);
//     priorDate = priorDate.toISOString().substring(0,10);
//     console.log(priorDate)

//     const $root = $('#newsFeed')
//     $root.empty();

//     // LOCAL RUN
//     //const myKey = "480cae414ceb43cbab94d9ab001bd7ec"

//     // SERVER RUN
//     const myKey = "c97e329f04a9821fe41a8f8bde77b7e6"

//     let ticker = document.getElementById('ticker').value;
//     console.log(ticker)
//     let valuesForPHP = []
//     valuesForPHP.push(ticker);
//     valuesForPHP.push(buttonDate);


//     const feed = await axios({
//         method: 'get',                                                                                         
//         url: 'https://gnews.io/api/v4/search?q='+ticker+'&lang=en&country=us&in=title,description,content&from='+priorDate+'T22:34:26Z&to='+buttonDate+'T22:34:26Z&sortBy=relevance&token='+myKey,                                                                               
//     });  
//     console.log(feed);                                                                                                                  
//     console.log(feed);
//     let posts = `<div id=articles>`;
//     if(feed.data.articles.length>0){
//         for(let i = 0; i < feed.data.articles.length; i++) {
//             if( feed.data.articles[i].title!=null && feed.data.articles[i].image!=null && feed.data.articles[i].description!= null && feed.data.articles[i].source != null) {
//             valuesForPHP.push(feed.data.articles[i].url)
//             posts += `
//             <div class="box">
//             <div class="card">
//                 <header class="card-header">
//                     <h1 class="title"><a href="${feed.data.articles[i].url}" target="_blank">${feed.data.articles[i].title}</a></h1>
//                 </header>
//                 <div class="card-image">
//                     <figure class="image is-4by3">
//                         <img src="${feed.data.articles[i].image}">
//                     </figure>
//                 </div>
//                 <div class="card-content">
//                     <div class="content">
//                         ${feed.data.articles[i].description}
//                     </div>
//                 </div>
//                 <footer class="card-footer">
//                     <a href="${feed.data.articles[i].source.url} class="card-footer-item" target="_blank">Source: ${feed.data.articles[i].source.name}</a>
//                         <a class="card-footer-item"><button class="thatButton" name="save" type="submit"  value="${valuesForPHP}">Save Article <span class="icon is-medium"><i class="fa fa-heart"></i></span></button></a>
//                 </footer>
//             </div>
//             </div>
//             <br>
//             `
//                 } 
//         }
//     } else {
//         posts += `<h1 class="title">Sorry no news on this date :/</h1>`
//     }
//     posts += `</div>`;
//     $root.append(posts);
//     valuesForPHP.pop();
// }

//Generates a News feed of articles once a "date" button is clicked
//Articles contian a keyword(stock ticker) and were published between the date specified and 2 days prior
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
    const myKey = "58066874211fc9b8944837531d09d4c5"

    let ticker = document.getElementById('ticker').value;
    console.log(ticker)
    let valuesForPHP = []
    valuesForPHP.push(ticker);
    valuesForPHP.push(buttonDate);


    const feed = await axios({
        method: 'get',                                                                                         
        url: 'https://gnews.io/api/v4/search?q='+ticker+'&lang=en&country=us&in=title,description,content&from='+priorDate+'T22:34:26Z&to='+buttonDate+'T22:34:26Z&sortBy=relevance&token='+myKey,                                                                               
    });  

    let posts = `<div id=articles>`;

    if(feed.data.articles.length>0){
        for(let i = 0; i < feed.data.articles.length; i++) {
            if( feed.data.articles[i].title!=null && feed.data.articles[i].image!=null && feed.data.articles[i].description!= null && feed.data.articles[i].source != null) {
            valuesForPHP.push(feed.data.articles[i].url)
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
                    <a href="${feed.data.articles[i].source.url} class="card-footer-item" target="_blank">Source: ${feed.data.articles[i].source.name}</a>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item"><button class="saveButton1" name="save" type="submit"  value="${valuesForPHP}" >Save Article <span class="icon is-medium"><i class="fa fa-heart"></i></span></button></a>
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
    valuesForPHP.pop();

}

/////////Varun this is where the form is/////////
export async function openForm(e) {

    let valuesForPHP = e.target.value;
    let form =``;
    form += `
    <div class="modal">
        <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add a reason for saving this article!</p>
                </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <form>
        <div class="box">
            <div class="control">
                <input id="comment" class="input" type="text" placeholder="Type your insights here">
            </div>
            <br>
            <button id="alsoCloseForm" class="button is-success" name="save" type="submit" value="${valuesForPHP}">Save Article</button>
            <button id="closeForm" class="button">Cancel</button>
        </div>
      </form>
    </section>
    </div>
    </div>
    `
    $(`#newsFeed`).append(form);
    $(".modal").addClass("is-active");
}


//////form values stored here///////
export async function closeForm(e) {
    console.log(e.target.value);//for testing ticker date url
    let userNote = document.getElementById('comment').value;
    console.log(userNote);//for testing users comment
    //both console.logs print the correct values needed for backend
    $('.modal').removeClass('is-active');
    $('.modal').empty();
}



export const renderSite = function() {

    $(document).on('click', '#findDate', generateDates);
    $(document).on('input','#ticker', updateValue);
    $(document).on('click', 'option',changeFucntion);
    $(document).on('click','.thisButton', generateFeed);
    $(document).on('click','.saveButton1', openForm);
    $(document).on('click','#closeForm', closeForm);
    $(document).on('click','#alsoCloseForm', closeForm);
    let value = document.getElementById('ticker').value;
  
}

$(function(){
    renderSite(); 
});