const image_path = "https://image.tmdb.org/t/p/original";

const handleImage = function(image) {

    if (image)
    {
        return `${image_path}${image}`;
    } else {
        return "images/placeholder.png";
    }

}

const sortActors = function(a,b) {

    if (a.roles.length < b.roles.length){
        return 1
    }

    if (a.roles.length > b.roles.length){
        return -1
    }

    return 0;
    
}

const printTable = function() {

    // handle an empty state
    let hasActors = false;

    let html = "";

    html += "<table>";
    html += "   <thead>";
    html += "       <tr class='header-row'>";
    html += "           <th>&nbsp;</th>";
    
    search.items.forEach(movie => {
        html += "           <th>";
        html += getMovieComponent(movie);
        html += "           </th>";
    });

    html += "       </tr>";
    html += "   </thead>";
    html += "   <tbody>";

    // sort the actors, most roles first
    results.actors.sort(sortActors);

    results.actors.forEach(actor => {

        // only show actors that match more than one movie
        if (actor.roles.length > 1)
        {
            html += "       <tr class='actor-row'>";
            html += "           <td>";
            html += getActorComponent(actor);
            html += "           </td>";

            search.items.forEach(movie => {

                html += "           <td>";

                let role = actor.roles.filter(function(e) { return e.movie_id === movie.id; });

                if (role.length > 0) {
                    html += getRoleComponent(role[0]);
                }

                html += "           </td>";

            })

            html += "       </tr>";

            hasActors = true;

        }
    });

    if (!hasActors) {
        // add empty row
        html += "       <tr>";
        html += `           <td colspan="${search.items.length + 1}" class="none-found">No matches found</td>`;
        html += "       </tr>";
    }

    html += "   </tbody>";
    html += "</table>";

    let el = document.querySelector("#results");
    el.innerHTML = html;

}

// Show an element
var show = function(elem) {
	elem.classList.add('is-visible');
};

// Hide an element
var hide = function(elem) {
	elem.classList.remove('is-visible');
};

// Toggle element visibility
var toggle = function(elem) {
	elem.classList.toggle('is-visible');
};
