// the purpose of this project is OOP and section 3 is on async/await, so I will return to accessing json dynamically in a later section
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

    // Create Dino Constructor
    class Animal {
        constructor(species, height, weight, diet, where, when, fact) {
            this.species = species,
            this.height = height,
            this.weight = weight,
            this.diet = diet,
            this.where = where,
            this.when = when,
            this.fact = fact        
        }
        getImg(species) {
            let lowerCaseSpecies = species.toLowerCase();
            return `images/${lowerCaseSpecies}.png`
        }
    }

    class Dinosaur extends Animal {
        constructor(species, height, weight, diet, where, when, fact) {
            super(species, height, weight, diet);
            this.where = where,
            this.when = when,
            this.fact = fact,
            this.img = super.getImg(species)
            //Source: https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/
        }
    }

    // Create Dino Objects
    const dinosArr = json["Dinos"].map(d => {
        return new Dinosaur(d.species, d.height, d.weight, d.diet, d.where, d.when, d.fact);
    });

    // Create Human Object
    class Human extends Animal {
        constructor(name, height, weight, diet, img) {
            super(height, weight, diet, img);
            this.name = name,
            this.img = super.getImg("human")
        }
    }

    const human = new Human();

    // Use IIFE to get human data from form
    // On button click, prepare and display infographic
    let button = document.getElementById("btn");
    button.addEventListener('click', (h => {
        const convertHeightToInches = (feet, inches) => {
            return feet * 12 + inches * 1
        }
        return () => {
            let feet = document.getElementById("feet").value;
            let inches = document.getElementById("inches").value;
            h.name = document.getElementById("name").value;
            h.height = convertHeightToInches(feet, inches);
            h.weight = document.getElementById("weight").value;
            h.diet = document.getElementById("diet").value;
            generateTiles();
        }
    })(human)); //source: https://knowledge.udacity.com/questions/298281

    //this function is immediately invoked, but since the click event listener is tied to the returned function, 
    //the data within the function is protected and not executed until the click happens.

    // Generate Tiles for each Dino in Array
    const generateTiles = () => {

        //helper method for picking a fact to show at random
        const randomFact = () => {
            let dinoKeys = Object.keys(dinosArr[0]);
            let factArray = dinoKeys.filter(a => a != "species" && a != "img");

            //source: learned Match.floor(Math.random(arr.length)) technique in Codecademy
            let factKey = factArray[Math.floor(Math.random()*factArray.length)]; 
            return factKey
        }

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

        //put human in the center.  
        //Source: https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
        dinosArr.splice(4, 0, human);

        //create html tiles
        //Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        //Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

        let gridElement = document.getElementById('grid');

        dinosArr.forEach(item => {

            let tileElement = document.createElement('div');
            tileElement.classList.add("grid-item");

            let nameElement = document.createElement('h3');
            //add name if human, species if dinosaur
            item.species ? nameElement.innerHTML = item.species : nameElement.innerHTML = item.name;
            tileElement.appendChild(nameElement);

            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', item.img);
            tileElement.appendChild(imgElement);

            //human will not have a fact, so only add a fact if the object is a dinosaur
            if (item instanceof Dinosaur) {
                let factKey = '';
                //make sure the Pigeon card displays the "All birds are dinosaurs" fact, else get random fact
                item.species === "Pigeon" ? factKey = 'fact' : factKey = randomFact(); 
                let factValue = '';
                //if the random fact matches a compare method, reroute to the compare method
                if (factKey === 'height') {
                    factValue = compareHeight(item.height);
                }
                else if (factKey === 'weight') {
                    factValue = compareWeight(item.weight);
                }
                else if (factKey === 'diet') {
                    factValue = compareDiet(item.diet);
                }
                //if not height, weight, or diet, return value of the fact from the object
                else {
                    factValue = item[factKey];
                }

                //capitalize the first letter of the factKey for display
                //source: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
                factKey = factKey.charAt(0).toUpperCase() + factKey.slice(1);

                let factElement = document.createElement('p');
                factElement.innerHTML = `${factKey}: ${factValue}`;
                tileElement.appendChild(factElement); 
            }

            // Add tiles to DOM
            return gridElement.appendChild(tileElement)
        });

        // Remove form from screen
        let form = document.getElementById('dino-compare');
        form.classList.add("hideForm");
    }