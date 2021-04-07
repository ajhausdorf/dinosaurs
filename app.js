let json = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbivore",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbivore",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are dinosaurs."
        }
    ]
};

    // Helper Functions

    const convertHeightToInches = (feet, inches) => {
        return feet * 12 + inches * 1
    }

    const getImg = species => {
        let lowerCaseSpecies = species.toLowerCase();
        return `images/${lowerCaseSpecies}.png`
    }

    const randomFact = () => {
        let dinoKeys = Object.keys(dinosArr[1]);
        let factArray = dinoKeys.filter(function(a) {
            return a != "species" && a != "img";
        });
        //source: learned Match.floor(Math.random(arr.length)) technique in Codecademy
        let factKey = factArray[Math.floor(Math.random()*factArray.length)]; 
        return factKey
    }

    //source: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
    const capitalize = s => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    // Create Dino Constructor

    class Animal {
        constructor(species, height, weight, diet, where, when, fact, img) {
            this.species = species,
            this.height = height,
            this.weight = weight,
            this.diet = diet,
            this.where = where,
            this.when = when,
            this.fact = fact,
            this.img = img
        }
    }

    class Dinosaur extends Animal {
        constructor(species, height, weight, diet, where, when, fact, img) {
            super(species, height, weight, diet, img);
            this.where = where,
            this.when = when,
            this.fact = fact,
            this.img = getImg(species)
        }
    }

    // Create Dino Objects

    const dinosArr = json["Dinos"].map(d => {
        let species = d.species;
        let height = d.height;
        let weight = d.weight;
        let diet = d.diet;
        let where = d.where;
        let when = d.when;
        let fact = d.fact;
        let img = d.image;
        return new Dinosaur(species, height, weight, diet, where, when, fact, img);
    });

    // Create Human Object
    
    class Human extends Animal {
        constructor(name, height, weight, diet, img) {
            super(height, weight, diet, img);
            this.name = name,
            this.img = getImg("human")
        }
    }
    const human = new Human();

    // Use IIFE to get human data from form
    // On button click, prepare and display infographic
    let button = document.getElementById("btn");
    button.addEventListener('click', (function(h) {
        return function() {
            let feet = document.getElementById("feet").value;
            let inches = document.getElementById("inches").value;
            h.name = document.getElementById("name").value;
            h.height = convertHeightToInches(feet, inches);;
            h.weight = document.getElementById("weight").value;
            h.diet = document.getElementById("diet").value;
            generateTiles();
        }
    })(human)); //source: https://knowledge.udacity.com/questions/298281

    //this function is immediately invoked, but since the click event listener is tied to the returned function, 
    //the data within the function is protected and not executed until the click happens.

    // Create Dino Compare Height Method
    const compareHeight = dinoHeight => {
        const humanHeight = human.height;
        let statement = '';
        if (dinoHeight > humanHeight) {
            statement = `This dinosaur is ${dinoHeight - humanHeight} inches taller than you at ${dinoHeight}in`;
        } else if (dinoHeight < humanHeight) {
            statement = `This dinosaur is ${humanHeight - dinoHeight} inches shorter than you at ${dinoHeight}in`;
        } else if (dinoHeight === humanHeight) {
            statement = `You and this dinosaur are the same height!`;
        }
        return statement
    };

    // Create Dino Compare Weight Method 
    const compareWeight = dinoWeight => {
        const humanWeight = human.weight;
        let statement = '';
        if (dinoWeight > humanWeight) {
            statement = `This dinosaur is ${dinoWeight - humanWeight} pounds heavier than you at ${dinoWeight}lbs`;
        } else if (dinoWeight < humanWeight) {
            statement = `This dinosaur is ${humanWeight - dinoWeight} pounds lighter than you at ${dinoWeight}lbs`;
        } else if (dinoWeight === humanWeight) {
            statement = `You and this dinosaur are the same weight!`;
        }
        return statement
    };

    
    // Create Dino Compare Diet Method
    const compareDiet = dinoDiet => {
        const humanDiet = human.diet.toLowerCase();
        let statement = '';
        if (humanDiet === dinoDiet) {
            statement = `You and this dinosaur have the same diet! You ${human.diet}s you, peas in a pod`;
        } else {
            statement = `This dinosaur is a ${dinoDiet}.  Bet you're glad you don't have to eat like that!`;
        }
        return statement
    };

    // Generate Tiles for each Dino in Array

    const generateTiles = () => {
        let tilesArr = dinosArr.map(d => {
            let factKey = '';
            //make sure the Pigeon card displays the "All birds are dinosaurs" fact, else get random fact
            d.species === "Pigeon" ? factKey = 'fact' : factKey = randomFact(); 
            let factValue = '';
            //if the random fact matches a compare method, reroute to the compare method
            if (factKey === 'height') {
                factValue = compareHeight(d.height);
            }
            else if (factKey === 'weight') {
                factValue = compareWeight(d.weight);
            }
            else if (factKey === 'diet') {
                factValue = compareDiet(d.diet);
            }
            //if not height, weight, or diet, return value of the fact from the object
            else {
                factValue = d[factKey];
            }
            //capitalize the first letter of the factKey for display
            factKey = capitalize(factKey);
            return {
                species: d.species,
                img: d.img,
                factKey: factKey,
                factValue: factValue
            }
        });
        //create the human tile
        let humanTile = {
            species: human.name,
            img: human.img
        }
        //put human in the center.  
        //Source: https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
        tilesArr.splice(4, 0, humanTile);

        //create html tiles
        //Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        //Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

        let grid = document.getElementById('grid');

        tilesArr.forEach(item => {

            let tile = document.createElement('div');
            tile.classList.add("grid-item");

            let species = document.createElement('h3');
            species.innerHTML = item.species;
            tile.appendChild(species);

            let img = document.createElement('img');
            img.setAttribute('src', item.img);
            tile.appendChild(img);

            //human will not have a fact, so only add the fact to the card if factKey exists on the item objects
            if (item.factKey) {
                let fact = document.createElement('p');
                fact.innerHTML = `${item.factKey}: ${item.factValue}`;
                tile.appendChild(fact); 
            }

            // Add tiles to DOM
            return grid.appendChild(tile)
        });

        // Remove form from screen
        let form = document.getElementById('dino-compare');
        form.classList.add("hideForm");
    }