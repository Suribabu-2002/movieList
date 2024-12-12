let movies = [];

function fetchData(){
    fetch("https://masai-ea2bc-default-rtdb.firebaseio.com/movies.json").then((res)=> res.json()).then((data) =>{
        movies = Object.entries(data)
        // console.log(movies)
        displayCards(movies)
    })

}

function displayCards(moviesData){
    document.querySelector(".container").innerHTML = "";
    moviesData.forEach(ele => {
        let movieId = ele[0];
        let {
            title,genre,release_date,rating,thumbnail_url
        } = ele[1];
        document.querySelector(".container").innerHTML += `
        <div class="card">
            <img src="${thumbnail_url}" alt="">
            <p>Title:${title}</p>
            <p>Genre:${genre}</p>
            <p>Release date:${release_date}</p>
            <p>Rating:${rating}</p>
        </div>
        `;
        // document.querySelectorAll(".card").addEventListener('click',changePage)
    });




}
document.querySelector("#ratingSort").addEventListener('change',ratingSort)
document.querySelector("#genre").addEventListener('change',genreFilter)
fetchData()

function ratingSort(){
    let sortOrder = document.querySelector("#ratingSort").value;
    console.log(sortOrder)
    let sortedMovies = [...movies]
    if(sortOrder === "asc"){
        sortedMovies.sort((a,b)=> a[1].rating - b[1].rating);
        console.log(sortedMovies)
        displayCards(sortedMovies)
    }
    else if(sortedMovies === "desc"){
        sortedMovies.sort((a,b)=> b[1].rating - a[1].rating);
        console.log(sortedMovies)
        displayCards(sortedMovies)
    }
    else{
        displayCards(movies)
    }

}
function genreFilter(){
    let genreValue = document.querySelector("#genre").value;
    console.log(genreValue)
    let FilteredMovies = [...movies]
    if(genreValue === 'all'){
        displayCards(movies)
    }
    else{
        // console.log(FilteredMovies)
        FilteredMovies = FilteredMovies.filter(ele =>
            {
                return (genreValue === ele[1].genre);
    });
        console.log(FilteredMovies)
        ratingSort(FilteredMovies)
        displayCards(FilteredMovies)
    }

}

function searchByTitle(){
    let searchText = document.querySelector(".searchTitle").value.toLowerCase();
    let movieResult = [...movies];
    movieResult= movieResult.filter(ele => ele[1].title.toLowerCase().includes(searchText))
    displayCards(movieResult)
}

function changePage(){
    window.location.href="details.html"
}