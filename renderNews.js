export async function generateNewsFeed(e) {
    
    e.preventDefault();
    
    const $root = $('#newsFeed')
    $root.empty();

    // LOCAL RUN
    //const myKey = "480cae414ceb43cbab94d9ab001bd7ec"

    // SERVER RUN
    const myKey = "c97e329f04a9821fe41a8f8bde77b7e6"

    let ticker = document.getElementById('ticker').value;
    console.log(ticker)

    const feed = await axios({

        method: 'get',
        url: 'https://gnews.io/api/v4/search?q='+ticker+'&lang=en&country=us&in=title,description,content&from=2020-11-10T18:34:26Z&to=2020-11-11T18:34:26Z&sortBy=relevance&token='+myKey,
        // withCreditals: true
    });
    console.log(feed);
    let posts = `<div id=articles>`;
    if(feed.data.articles.length>0){
        for(let i = 0; i < feed.data.articles.length; i++) {
            if( feed.data.articles[i].title!=null && feed.data.articles[i].image!=null && feed.data.articles[i].description!= null && feed.data.articles[i].source != null) {
            // posts += `  <div class="box"> 
            //             <div class="column">
            //                 <h1 class="title"><a href="${feed.data.articles[i].url}" target="_blank">${feed.data.articles[i].title}</a></h1>
            //                 <div class="columns is-mobile">
            //                     <div class="column">
            //                         <figure class="image">
            //                             <img src="${feed.data.articles[i].image}">
            //                         </figure>
            //                         <br>
            //                     </div>
            //                     <div class="column">
            //                         <p>${feed.data.articles[i].description}</p>
            //                         <br>
            //                         <p>Author: ${feed.data.articles[i].source}</p>
            //                     </div>
            //                 </div>
            //                 <form method="get" name="form2" action="home.php"> 
            //                     <button name="save" type="submit"  value="${feed.data.articles[i].url}">Save Article <span class="icon is-medium"><i class="fa fa-heart"></i></span></button>
            //                 </form>
            //                 </div>
            //             </div>`;   
            posts += `
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
                    <a href="${feed.data.articles[i].source.url} target="_blank" class="card-footer-item">Source: ${feed.data.articles[i].source.name}</a>
                    <form method="get" name="form2" action="home.php"> 
                        <a class="card-footer-item"><button name="save" type="submit"  value="${feed.data.articles[i].url}">Save Article <span class="icon is-medium"><i class="fa fa-heart"></i></span></button></a>
                    </form>
                </footer>
            </div>
            `
                } 
        }
    } else {
        posts += `<h1 class="title">Sorry no news on this date :/</h1>`
    }
    posts += `</div>`;
    $root.append(posts);
}



export const renderSite = function() {
    const $root = $('#newsFeed');
    $(document).on('click', '#generate', generateNewsFeed);

}

$(function() {
    renderSite();
});