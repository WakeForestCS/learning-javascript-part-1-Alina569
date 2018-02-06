particlesJS.load('particles-js', './particles.json');

function append(parent, element) {
    return parent.appendChild(element);
};

// server call

fetch('http://localhost:8082/tutorials')
    .then((res) => res.json())            // cb
    .then(function(data) {                // cb
        
        let tutorials = data.tutorials;
        const card_colums = document.getElementById("cards");

        return tutorials.map(function(tutorial){
            
            let card = document.createElement("div");
            card.className = "card border-" + tutorial.type + " mb-3";
            
            let card_header = document.createElement("div");
            card_header.className = "card-header";
            card_header.innerHTML = tutorial.category;

            let card_body = document.createElement("div");
            card_body.className = "card-body";

            let card_title = document.createElement("h5");
            card_title.innerHTML = tutorial.title;

            let card_description = document.createElement("p");
            card_description.className = "card-text";
            card_description.innerHTML = tutorial.description; 

            let btn_div = document.createElement("div");
            btn_div.style = "text-align: center;";

            let link = document.createElement("a");
            link.href = tutorial.link;
            link.className = "btn btn-" + tutorial.type;
            link.innerHTML = tutorial.btn_name;


            append(btn_div, link);

            append(card_body, card_title);
            append(card_body, card_description);
            append(card_body, btn_div);

            append(card, card_header);
            append(card, card_body);

            append(card_colums, card);

        });
    });
