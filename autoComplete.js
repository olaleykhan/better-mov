const createWidget=({root,movieWrapper,renderLink})=>{
    const key = "9a612b0c";

    // function call to get movie data with serch term
    const getMovieData = async (term) => {
        const response = await axios.get("http://www.omdbapi.com", {
            params: {
                apikey: key,
                s: term
            }
        });
        return (response.data.Search)
    }

// creating container for our root
root.innerHTML = `
    <div class="">
    <div>
        <label><b> Please input a search term</b> </label>
        <input class="input">
    </div>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content target">
            </div>
        </div>
    </div>
`
// initializing dom node for the content rendered into the root inner element above
const input = root.querySelector('.input');
const dropdown = root.querySelector('.dropdown');
const wrapper = root.querySelector('.target');

async function runInput(e) {
    const input = e.target.value;
    // const target = document.querySelector('.target');
    try {
        if (input.length) {
            const results = await getMovieData(input);
            dropdown.classList.add('is-active');
            wrapper.innerHTML = null;
            for (let result of results) {
                // console.log(movie);
                // this function  creates the individual movie links in the dropdown
                createMovieLinks(result)

            }
        } else {
            dropdown.classList.remove('is-active');
        }
    } catch (error) {
        console.log(error);
        err = error;
    }
}

input.addEventListener('input', debounce(runInput, 700));
document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
        dropdown.classList.remove('is-active');
    }

})

const createMovieLinks = (movieSummary) => {
    const link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.innerHTML = renderLink(movieSummary);
     wrapper.appendChild(link);
     link.addEventListener('click', async ()=>{
        //  console.log(movie.imdbID);
        const movieData= await getFullMovieData(movieSummary.imdbID);
        console.log(movieData);
         dropdown.classList.remove("is-active");
         movieWrapper.innerHTML= generateSingleMovieUi(movieData);
     })
}


}
