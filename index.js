let inptEle = document.getElementById("searchInput");
let spinnerele = document.getElementById("spinner_ele");

function createSingleBook(imagelink, author) {
    let bookcard = document.createElement("div");
    bookcard.classList.add("col-6", "text-center", "mt-5");
    let imageEle = document.createElement("img");
    imageEle.src = imagelink;
    imageEle.classList.add("pl-1");
    bookcard.appendChild(imageEle);
    let paraele = document.createElement("p");
    paraele.textContent = author;
    paraele.classList.add("authorName");
    bookcard.appendChild(paraele);
    document.getElementById("searchResults").appendChild(bookcard);
}

function createAndAppendSearchResults(search_results) {
    spinnerele.classList.add("d-none");
    for (let each_searchResult of search_results) {
        createSingleBook(each_searchResult.imageLink, each_searchResult.author);
    }
    console.log(search_results.length);
    if (search_results.length === 0) {
        let noresultsFound = document.createElement('h1');
        noresultsFound.classList.add("m-auto", "noresultsFound");
        noresultsFound.textContent = "No Results Found";
        document.getElementById("searchResults").appendChild(noresultsFound);
    }
}

function bookTitle() {
    let options = {
        method: "Get"
    };
    let url = "https://apis.ccbp.in/book-store?title=";
    url += inptEle.value;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            let {
                search_results
            } = jsonData;
            createAndAppendSearchResults(search_results);
        });
}
inptEle.addEventListener("keydown", function() {
    if (event.key === "Enter") {
        spinnerele.classList.remove("d-none");
        document.getElementById("searchResults").textContent = "";
        bookTitle();
    }
});