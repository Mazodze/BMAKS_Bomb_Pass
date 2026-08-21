const QUESTIONS = [
{
  q: "What is the capital of France?",
  a: ["Madrid", "Rome", "Berlin", "Paris"],
  c: 3
},
{
  q: "Which planet is known as the Red Planet?",
  a: ["Jupiter", "Venus", "Mercury", "Mars"],
  c: 3
},
{
  q: "What is the largest ocean on Earth?",
  a: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
  c: 1
},
{
  q: "How many sides does a pentagon have?",
  a: ["4", "7", "6", "5"],
  c: 3
},
{
  q: "Which animal is the fastest land animal?",
  a: ["Horse", "Cheetah", "Lion", "Leopard"],
  c: 1
},
{
  q: "Who painted the Mona Lisa?",
  a: ["Vincent van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"],
  c: 1
},
{
  q: "What is the chemical symbol for gold?",
  a: ["Au", "Cu", "Fe", "Ag"],
  c: 0
},
{
  q: "Which country is home to the pyramids of Giza?",
  a: ["Greece", "Egypt", "Mexico", "Peru"],
  c: 1
},
{
  q: "How many players are on a soccer team on the field?",
  a: ["10", "9", "12", "11"],
  c: 3
},
{
  q: "What is the largest mammal in the world?",
  a: ["Giraffe", "Hippopotamus", "African Elephant", "Blue Whale"],
  c: 3
},
{
  q: "What is the capital of Japan?",
  a: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
  c: 1
},
{
  q: "Which gas do humans need to breathe?",
  a: ["Helium", "Carbon dioxide", "Oxygen", "Hydrogen"],
  c: 2
},
{
  q: "How many continents are there?",
  a: ["6", "8", "7", "5"],
  c: 2
},
{
  q: "What is the largest planet in our solar system?",
  a: ["Jupiter", "Earth", "Saturn", "Neptune"],
  c: 0
},
{
  q: "Who wrote Romeo and Juliet?",
  a: ["Mark Twain", "Charles Dickens", "Jane Austen", "William Shakespeare"],
  c: 3
},
{
  q: "What is the capital of South Africa?",
  a: ["Johannesburg", "Pretoria", "Durban", "Cape Town"],
  c: 1
},
{
  q: "Which animal is known as the King of the Jungle?",
  a: ["Leopard", "Elephant", "Lion", "Tiger"],
  c: 2
},
{
  q: "What is 12 × 8?",
  a: ["86", "96", "88", "108"],
  c: 1
},
{
  q: "Which ocean is the smallest?",
  a: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"],
  c: 3
},
{
  q: "How many days are in a leap year?",
  a: ["366", "364", "365", "367"],
  c: 0
},
{
  q: "Which country is famous for the Eiffel Tower?",
  a: ["Spain", "France", "Italy", "Germany"],
  c: 1
},
{
  q: "What is the chemical formula for water?",
  a: ["CO2", "O2", "H2O", "NaCl"],
  c: 2
},
{
  q: "Which sport uses a bat, ball and wickets?",
  a: ["Cricket", "Tennis", "Hockey", "Baseball"],
  c: 0
},
{
  q: "What is the square root of 81?",
  a: ["10", "7", "9", "8"],
  c: 2
},
{
  q: "Which planet is closest to the Sun?",
  a: ["Venus", "Earth", "Mercury", "Mars"],
  c: 2
},
{
  q: "What is the largest country by land area?",
  a: ["Canada", "United States", "Russia", "China"],
  c: 2
},
{
  q: "Which organ pumps blood around the body?",
  a: ["Brain", "Heart", "Lung", "Kidney"],
  c: 1
},
{
  q: "What is the currency of Japan?",
  a: ["Yuan", "Won", "Ringgit", "Yen"],
  c: 3
},
{
  q: "Which bird is unable to fly?",
  a: ["Eagle", "Hawk", "Falcon", "Penguin"],
  c: 3
},
{
  q: "How many sides does a hexagon have?",
  a: ["8", "5", "6", "7"],
  c: 2
},
{
  q: "Who was the first person to walk on the Moon?",
  a: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
  c: 0
},
{
  q: "Which country invented pizza?",
  a: ["Italy", "France", "Spain", "Greece"],
  c: 0
},
{
  q: "What is the capital of Zimbabwe?",
  a: ["Gweru", "Harare", "Bulawayo", "Mutare"],
  c: 1
},
{
  q: "Which is the largest desert in the world?",
  a: ["Gobi", "Antarctic Desert", "Kalahari", "Sahara"],
  c: 1
},
{
  q: "What is the main gas in Earth's atmosphere?",
  a: ["Hydrogen", "Carbon dioxide", "Nitrogen", "Oxygen"],
  c: 2
},
{
  q: "Which instrument has black and white keys?",
  a: ["Violin", "Guitar", "Drums", "Piano"],
  c: 3
},
{
  q: "How many players are on a basketball team on the court?",
  a: ["4", "6", "7", "5"],
  c: 3
},
{
  q: "What is the capital of Australia?",
  a: ["Melbourne", "Canberra", "Perth", "Sydney"],
  c: 1
},
{
  q: "Which animal has a long trunk?",
  a: ["Hippo", "Rhino", "Elephant", "Giraffe"],
  c: 2
},
{
  q: "What is the freezing point of water in Celsius?",
  a: ["32°C", "100°C", "0°C", "10°C"],
  c: 2
},
{
  q: "Who discovered penicillin?",
  a: ["Alexander Fleming", "Albert Einstein", "Louis Pasteur", "Isaac Newton"],
  c: 0
},
{
  q: "Which planet is famous for its rings?",
  a: ["Mars", "Mercury", "Venus", "Saturn"],
  c: 3
},
{
  q: "What is the capital of Kenya?",
  a: ["Nairobi", "Mombasa", "Nakuru", "Kisumu"],
  c: 0
},
{
  q: "Which animal is known for changing its color?",
  a: ["Chameleon", "Zebra", "Gorilla", "Crocodile"],
  c: 0
},
{
  q: "What is 15 + 27?",
  a: ["44", "46", "40", "42"],
  c: 3
},
{
  q: "Which country has the Great Wall?",
  a: ["China", "India", "Japan", "Mongolia"],
  c: 0
},
{
  q: "What is the largest organ of the human body?",
  a: ["Liver", "Lungs", "Skin", "Heart"],
  c: 2
},
{
  q: "Which sea creature has eight arms?",
  a: ["Octopus", "Starfish", "Squid", "Crab"],
  c: 0
},
{
  q: "What is the capital of Brazil?",
  a: ["São Paulo", "Brasília", "Salvador", "Rio de Janeiro"],
  c: 1
},
{
  q: "Which metal is liquid at room temperature?",
  a: ["Silver", "Mercury", "Iron", "Copper"],
  c: 1
},
{
  q: "How many hours are in a day?",
  a: ["18", "36", "24", "12"],
  c: 2
},
{
  q: "Which country is shaped like a boot?",
  a: ["Spain", "Italy", "Greece", "Portugal"],
  c: 1
},
{
  q: "What is the tallest animal in the world?",
  a: ["Horse", "Camel", "Elephant", "Giraffe"],
  c: 3
},
{
  q: "Which vitamin is produced by sunlight exposure?",
  a: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin B"],
  c: 1
},
{
  q: "What is the capital of Canada?",
  a: ["Vancouver", "Montreal", "Ottawa", "Toronto"],
  c: 2
},
{
  q: "Which sport is played at Wimbledon?",
  a: ["Tennis", "Rugby", "Cricket", "Golf"],
  c: 0
},
{
  q: "What is 100 divided by 4?",
  a: ["30", "25", "40", "20"],
  c: 1
},
{
  q: "Which animal produces honey?",
  a: ["Butterfly", "Bee", "Spider", "Ant"],
  c: 1
},
{
  q: "Who wrote The Hobbit?",
  a: ["Ernest Hemingway", "George Orwell", "J.R.R. Tolkien", "C.S. Lewis"],
  c: 2
},
{
  q: "What is the capital of India?",
  a: ["New Delhi", "Kolkata", "Mumbai", "Chennai"],
  c: 0
},
{
  q: "Which planet is known as Earth's twin?",
  a: ["Mercury", "Venus", "Neptune", "Mars"],
  c: 1
},
{
  q: "How many bones are in an average adult human body?",
  a: ["186", "206", "246", "226"],
  c: 1
},
{
  q: "Which country is home to Mount Everest?",
  a: ["Nepal", "China", "Both Nepal and China", "India"],
  c: 2
},
{
  q: "What is the largest continent?",
  a: ["Asia", "North America", "Africa", "Europe"],
  c: 0
},
{
  q: "Which animal is known for its black and white stripes?",
  a: ["Tiger", "Panda", "Skunk", "Zebra"],
  c: 3
},
{
  q: "What is 7 × 9?",
  a: ["72", "81", "54", "63"],
  c: 3
},
{
  q: "Which country is famous for the Taj Mahal?",
  a: ["Nepal", "India", "Bangladesh", "Pakistan"],
  c: 1
},
{
  q: "Who developed the theory of relativity?",
  a: ["Galileo Galilei", "Nikola Tesla", "Albert Einstein", "Isaac Newton"],
  c: 2
},
{
  q: "What is the largest land animal?",
  a: ["Hippo", "African Elephant", "Rhino", "Giraffe"],
  c: 1
},
{
  q: "Which ocean lies between Africa and Australia?",
  a: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"],
  c: 1
},
{
  q: "What is the capital of Nigeria?",
  a: ["Kano", "Abuja", "Ibadan", "Lagos"],
  c: 1
},
{
  q: "Which animal is known as man's best friend?",
  a: ["Horse", "Cat", "Dog", "Wolf"],
  c: 2
},
{
  q: "What is 50% of 80?",
  a: ["30", "40", "50", "20"],
  c: 1
},
{
  q: "Which famous ship sank in 1912?",
  a: ["Titanic", "Mayflower", "Britannic", "Santa Maria"],
  c: 0
},
{
  q: "What is the capital of Germany?",
  a: ["Hamburg", "Frankfurt", "Munich", "Berlin"],
  c: 3
},
{
  q: "Which blood cells fight infections?",
  a: ["Plasma", "White blood cells", "Red blood cells", "Platelets"],
  c: 1
},
{
  q: "What is the largest island in the world?",
  a: ["Greenland", "Borneo", "Madagascar", "New Guinea"],
  c: 0
},
{
  q: "Which sport uses a puck?",
  a: ["Cricket", "Basketball", "Ice Hockey", "Tennis"],
  c: 2
},
{
  q: "What is the capital of Italy?",
  a: ["Naples", "Rome", "Venice", "Milan"],
  c: 1
},
{
  q: "Which animal can fly and is a mammal?",
  a: ["Penguin", "Eagle", "Ostrich", "Bat"],
  c: 3
},
{
  q: "What is the boiling point of water at sea level?",
  a: ["100°C", "50°C", "75°C", "120°C"],
  c: 0
},
{
  q: "Which country is known as the Land of the Rising Sun?",
  a: ["Thailand", "South Korea", "China", "Japan"],
  c: 3
},
{
  q: "What is the capital of Ghana?",
  a: ["Kumasi", "Accra", "Tamale", "Cape Coast"],
  c: 1
},
{
  q: "Which organ is responsible for thinking?",
  a: ["Heart", "Kidney", "Liver", "Brain"],
  c: 3
},
{
  q: "How many colors are in a rainbow?",
  a: ["8", "6", "5", "7"],
  c: 3
},
{
  q: "Which famous scientist developed the laws of motion?",
  a: ["Albert Einstein", "Galileo", "Charles Darwin", "Isaac Newton"],
  c: 3
},
{
  q: "What is the capital of Spain?",
  a: ["Madrid", "Barcelona", "Valencia", "Seville"],
  c: 0
},
{
  q: "Which animal is the largest living bird?",
  a: ["Penguin", "Swan", "Eagle", "Ostrich"],
  c: 3
},
{
  q: "What is 144 divided by 12?",
  a: ["11", "14", "12", "10"],
  c: 2
},
{
  q: "Which country is famous for the Colosseum?",
  a: ["France", "Turkey", "Greece", "Italy"],
  c: 3
},
{
  q: "What is the chemical symbol for oxygen?",
  a: ["C", "N", "O", "Ox"],
  c: 2
},
{
  q: "Which planet is farthest from the Sun?",
  a: ["Saturn", "Uranus", "Neptune", "Pluto"],
  c: 2
},
{
  q: "What is the capital of Mexico?",
  a: ["Guadalajara", "Mexico City", "Monterrey", "Cancún"],
  c: 1
},
{
  q: "Which animal has a pouch for carrying its young?",
  a: ["Gorilla", "Elephant", "Kangaroo", "Tiger"],
  c: 2
},
{
  q: "How many degrees are in a right angle?",
  a: ["180", "90", "45", "360"],
  c: 1
},
{
  q: "Which country is home to the Amazon rainforest?",
  a: ["Argentina", "Peru", "Chile", "Brazil"],
  c: 3
},
{
  q: "Who wrote Harry Potter?",
  a: ["J.K. Rowling", "J.R.R. Tolkien", "Stephen King", "George R.R. Martin"],
  c: 0
},
{
  q: "What is the capital of Portugal?",
  a: ["Braga", "Porto", "Lisbon", "Faro"],
  c: 2
},
{
  q: "Which animal is famous for its humps?",
  a: ["Horse", "Camel", "Zebra", "Buffalo"],
  c: 1
},
{
  q: "What is the smallest prime number?",
  a: ["2", "3", "1", "0"],
  c: 0
},
{
  q: "Which country hosted the 2010 FIFA World Cup?",
  a: ["Brazil", "Germany", "South Africa", "France"],
  c: 2
},
{
  q: "What is the capital of China?",
  a: ["Guangzhou", "Beijing", "Hong Kong", "Shanghai"],
  c: 1
},
{
  q: "Which sea separates Africa and Europe?",
  a: ["Black Sea", "Arabian Sea", "Mediterranean Sea", "Red Sea"],
  c: 2
},
{
  q: "What is the largest bone in the human body?",
  a: ["Tibia", "Humerus", "Radius", "Femur"],
  c: 3
},
{
  q: "Which animal is famous for its slow movement?",
  a: ["Cheetah", "Gazelle", "Sloth", "Horse"],
  c: 2
},
{
  q: "What is 11 × 11?",
  a: ["121", "141", "111", "131"],
  c: 0
},
{
  q: "Which country is famous for sushi?",
  a: ["Vietnam", "China", "Japan", "Thailand"],
  c: 2
},
{
  q: "Who painted Starry Night?",
  a: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"],
  c: 1
},
{
  q: "What is the capital of Russia?",
  a: ["Sochi", "Kazan", "Moscow", "St Petersburg"],
  c: 2
},
{
  q: "Which animal has eight legs?",
  a: ["Butterfly", "Ant", "Spider", "Beetle"],
  c: 2
},
{
  q: "What is 20% of 100?",
  a: ["10", "20", "40", "30"],
  c: 1
},
{
  q: "Which country is famous for the Great Barrier Reef?",
  a: ["Australia", "New Zealand", "Indonesia", "Fiji"],
  c: 0
},
{
  q: "What is the capital of Greece?",
  a: ["Thessaloniki", "Athens", "Sparta", "Patras"],
  c: 1
},
{
  q: "Which organ helps humans breathe?",
  a: ["Heart", "Kidneys", "Stomach", "Lungs"],
  c: 3
},
{
  q: "What is the largest planet after Jupiter?",
  a: ["Earth", "Saturn", "Neptune", "Uranus"],
  c: 1
},
{
  q: "Which animal is known for its long neck?",
  a: ["Giraffe", "Horse", "Zebra", "Camel"],
  c: 0
},
{
  q: "What is 9 × 9?",
  a: ["90", "72", "99", "81"],
  c: 3
},
{
  q: "Which country is famous for the Statue of Liberty?",
  a: ["France", "Canada", "United States", "United Kingdom"],
  c: 2
},
{
  q: "What is the capital of the United States?",
  a: ["Los Angeles", "Chicago", "Washington, D.C.", "New York"],
  c: 2
},
{
  q: "Which animal is known for its black-and-white coat and bamboo diet?",
  a: ["Lemur", "Giant Panda", "Koala", "Zebra"],
  c: 1
},
{
  q: "What is the chemical symbol for iron?",
  a: ["Fe", "I", "Ir", "In"],
  c: 0
},
{
  q: "Which country is home to the Serengeti?",
  a: ["Ethiopia", "Uganda", "Kenya", "Tanzania"],
  c: 3
},
{
  q: "Who was Nelson Mandela?",
  a: ["British king", "French scientist", "American president", "South African leader"],
  c: 3
},
{
  q: "What is the capital of Egypt?",
  a: ["Alexandria", "Cairo", "Luxor", "Giza"],
  c: 1
},
{
  q: "Which animal is known for building dams?",
  a: ["Fox", "Beaver", "Badger", "Otter"],
  c: 1
},
{
  q: "What is 25 × 4?",
  a: ["75", "100", "125", "50"],
  c: 1
},
{
  q: "Which country is home to Machu Picchu?",
  a: ["Bolivia", "Brazil", "Peru", "Chile"],
  c: 2
},
{
  q: "What is the capital of Argentina?",
  a: ["Mendoza", "Buenos Aires", "Rosario", "Cordoba"],
  c: 1
},
{
  q: "Which animal is known for its powerful bite and lives in rivers?",
  a: ["Giraffe", "Crocodile", "Horse", "Rabbit"],
  c: 1
},
{
  q: "What is the human body's largest internal organ?",
  a: ["Lung", "Heart", "Liver", "Kidney"],
  c: 2
},
{
  q: "Which sport is known as the beautiful game?",
  a: ["Soccer", "Tennis", "Basketball", "Cricket"],
  c: 0
},
{
  q: "What is the capital of New Zealand?",
  a: ["Hamilton", "Christchurch", "Auckland", "Wellington"],
  c: 3
},
{
  q: "Which animal is known for its ability to regenerate lost arms?",
  a: ["Shark", "Seal", "Starfish", "Dolphin"],
  c: 2
},
{
  q: "What is 64 divided by 8?",
  a: ["7", "9", "6", "8"],
  c: 3
},
{
  q: "Which country is known for the Acropolis?",
  a: ["Greece", "Turkey", "Egypt", "Italy"],
  c: 0
},
{
  q: "What is the capital of Thailand?",
  a: ["Chiang Mai", "Phuket", "Bangkok", "Pattaya"],
  c: 2
},
{
  q: "Which animal is known as the ship of the desert?",
  a: ["Elephant", "Horse", "Donkey", "Camel"],
  c: 3
},
{
  q: "What is the largest ocean?",
  a: ["Atlantic Ocean", "Southern Ocean", "Pacific Ocean", "Indian Ocean"],
  c: 2
},
{
  q: "Which country has the city of Dubai?",
  a: ["Qatar", "Oman", "United Arab Emirates", "Saudi Arabia"],
  c: 2
},
{
  q: "Who invented the telephone?",
  a: ["Alexander Graham Bell", "Thomas Edison", "James Watt", "Nikola Tesla"],
  c: 0
},
{
  q: "What is the capital of Norway?",
  a: ["Stockholm", "Helsinki", "Bergen", "Oslo"],
  c: 3
},
{
  q: "Which animal is known for its mane?",
  a: ["Leopard", "Tiger", "Wolf", "Lion"],
  c: 3
},
{
  q: "What is 100 - 37?",
  a: ["83", "53", "63", "73"],
  c: 2
},
{
  q: "Which country is famous for the Leaning Tower of Pisa?",
  a: ["France", "Greece", "Spain", "Italy"],
  c: 3
},
{
  q: "What is the capital of South Korea?",
  a: ["Incheon", "Seoul", "Busan", "Daegu"],
  c: 1
},
{
  q: "Which animal is the largest reptile?",
  a: ["Green Anaconda", "Alligator", "Saltwater Crocodile", "Komodo Dragon"],
  c: 2
},
{
  q: "What is 5 squared?",
  a: ["30", "20", "25", "10"],
  c: 2
},
{
  q: "Which country is famous for the Taj Mahal?",
  a: ["Sri Lanka", "India", "Nepal", "Pakistan"],
  c: 1
},
{
  q: "What is the capital of Turkey?",
  a: ["Istanbul", "Ankara", "Bursa", "Izmir"],
  c: 1
},
{
  q: "Which animal is known for its ability to mimic human speech?",
  a: ["Eagle", "Penguin", "Parrot", "Swan"],
  c: 2
},
{
  q: "What is the chemical symbol for silver?",
  a: ["Au", "Sl", "Si", "Ag"],
  c: 3
},
{
  q: "Which country is home to Mount Kilimanjaro?",
  a: ["Tanzania", "Rwanda", "Uganda", "Kenya"],
  c: 0
},
{
  q: "Who discovered gravity according to the famous apple story?",
  a: ["Galileo", "Albert Einstein", "Isaac Newton", "Stephen Hawking"],
  c: 2
},
{
  q: "What is the capital of Switzerland?",
  a: ["Bern", "Zurich", "Basel", "Geneva"],
  c: 0
},
{
  q: "Which animal is known for carrying its baby in a pouch?",
  a: ["Gorilla", "Elephant", "Kangaroo", "Panda"],
  c: 2
},
{
  q: "What is 6 × 7?",
  a: ["48", "36", "54", "42"],
  c: 3
},
{
  q: "Which country is famous for flamenco dancing?",
  a: ["Portugal", "Spain", "Brazil", "Italy"],
  c: 1
},
{
  q: "What is the capital of Ireland?",
  a: ["Cork", "Galway", "Dublin", "Limerick"],
  c: 2
},
{
  q: "Which animal is known for producing silk?",
  a: ["Spider", "Bee", "Ant", "Silkworm"],
  c: 3
},
{
  q: "What is the main source of energy for Earth?",
  a: ["Ocean", "Sun", "Wind", "Moon"],
  c: 1
},
{
  q: "Which country is home to the city of Rio de Janeiro?",
  a: ["Chile", "Brazil", "Argentina", "Colombia"],
  c: 1
},
{
  q: "What is the capital of Sweden?",
  a: ["Oslo", "Stockholm", "Gothenburg", "Helsinki"],
  c: 1
},
{
  q: "Which animal is known for its excellent memory?",
  a: ["Rabbit", "Frog", "Mouse", "Elephant"],
  c: 3
},
{
  q: "What is 18 + 24?",
  a: ["42", "46", "40", "44"],
  c: 0
},
{
  q: "Which country is famous for Oktoberfest?",
  a: ["Austria", "Belgium", "Switzerland", "Germany"],
  c: 3
},
{
  q: "What is the capital of Belgium?",
  a: ["Antwerp", "Ghent", "Bruges", "Brussels"],
  c: 3
},
{
  q: "Which animal is known for its black and white stripes?",
  a: ["Panda", "Lemur", "Zebra", "Tiger"],
  c: 2
},
{
  q: "What is the chemical symbol for sodium?",
  a: ["Na", "Sd", "So", "S"],
  c: 0
},
{
  q: "Which country is home to the Grand Canyon?",
  a: ["United States", "Canada", "Mexico", "Brazil"],
  c: 0
},
{
  q: "Who wrote The Odyssey?",
  a: ["Socrates", "Homer", "Aristotle", "Plato"],
  c: 1
},
{
  q: "What is the capital of Austria?",
  a: ["Salzburg", "Vienna", "Linz", "Graz"],
  c: 1
},
{
  q: "Which animal is famous for its ability to sleep standing up?",
  a: ["Rabbit", "Horse", "Dog", "Cat"],
  c: 1
},
{
  q: "What is 15 × 3?",
  a: ["45", "35", "50", "40"],
  c: 0
},
{
  q: "Which country is famous for the Statue of Liberty?",
  a: ["France", "United States", "Mexico", "Canada"],
  c: 1
},
{
  q: "What is the capital of Denmark?",
  a: ["Aarhus", "Aalborg", "Copenhagen", "Odense"],
  c: 2
},
{
  q: "Which animal is known for its long tongue and eats ants?",
  a: ["Anteater", "Lion", "Bear", "Fox"],
  c: 0
},
{
  q: "What is the chemical symbol for carbon?",
  a: ["C", "Cr", "Co", "Ca"],
  c: 0
},
{
  q: "Which country is home to the Sahara Desert?",
  a: ["Brazil", "Australia", "India", "Africa"],
  c: 3
},
{
  q: "Who was the first president of South Africa after apartheid?",
  a: ["Thabo Mbeki", "Nelson Mandela", "Jacob Zuma", "F.W. de Klerk"],
  c: 1
},
{
  q: "What is the capital of Finland?",
  a: ["Tampere", "Oslo", "Turku", "Helsinki"],
  c: 3
},
{
  q: "Which animal is known for its powerful trunk?",
  a: ["Gorilla", "Hippo", "Rhino", "Elephant"],
  c: 3
},
{
  q: "What is 200 ÷ 10?",
  a: ["20", "40", "30", "10"],
  c: 0
},
{
  q: "Which country is famous for the Louvre Museum?",
  a: ["Italy", "Spain", "France", "Germany"],
  c: 2
},
{
  q: "What is the capital of Poland?",
  a: ["Krakow", "Gdansk", "Wroclaw", "Warsaw"],
  c: 3
},
{
  q: "Which animal is known for living in a hive?",
  a: ["Bee", "Butterfly", "Grasshopper", "Dragonfly"],
  c: 0
},
{
  q: "What is the chemical symbol for helium?",
  a: ["H", "He", "Hm", "Hl"],
  c: 1
},
{
  q: "Which country is home to the Andes Mountains?",
  a: ["Asia", "Europe", "Africa", "South America"],
  c: 3
},
{
  q: "Who wrote Pride and Prejudice?",
  a: ["Virginia Woolf", "Emily Brontë", "Jane Austen", "Agatha Christie"],
  c: 2
},
{
  q: "What is the capital of Iceland?",
  a: ["Dublin", "Reykjavik", "Helsinki", "Oslo"],
  c: 1
},
{
  q: "Which animal is known for its distinctive black mask?",
  a: ["Tiger", "Wolf", "Raccoon", "Fox"],
  c: 2
},
{
  q: "What is 13 × 4?",
  a: ["48", "56", "52", "60"],
  c: 2
},
{
  q: "Which country is famous for the ancient city of Athens?",
  a: ["Italy", "Egypt", "Turkey", "Greece"],
  c: 3
},
{
  q: "What is the capital of Hungary?",
  a: ["Prague", "Budapest", "Vienna", "Warsaw"],
  c: 1
},
{
  q: "Which animal is known for its spots and speed?",
  a: ["Cheetah", "Zebra", "Lion", "Elephant"],
  c: 0
},
{
  q: "What is the chemical symbol for potassium?",
  a: ["P", "Po", "K", "Pt"],
  c: 2
},
{
  q: "Which country is home to the Galápagos Islands?",
  a: ["Peru", "Chile", "Colombia", "Ecuador"],
  c: 3
},
{
  q: "Who is known as the King of Pop?",
  a: ["Bruno Mars", "Michael Jackson", "Elvis Presley", "Prince"],
  c: 1
},
{
  q: "What is the capital of Czechia?",
  a: ["Prague", "Budapest", "Brno", "Vienna"],
  c: 0
},
{
  q: "Which animal is known for its black and white fur and lives in Antarctica?",
  a: ["Skunk", "Panda", "Penguin", "Polar Bear"],
  c: 2
},
{
  q: "What is 8 × 8?",
  a: ["72", "80", "56", "64"],
  c: 3
},
{
  q: "Which country is famous for the ancient pyramids?",
  a: ["Italy", "Turkey", "Egypt", "Greece"],
  c: 2
},
{
  q: "What is the capital of Romania?",
  a: ["Bucharest", "Belgrade", "Budapest", "Sofia"],
  c: 0
},
{
  q: "Which animal is known for its ability to spray a strong-smelling liquid?",
  a: ["Badger", "Skunk", "Fox", "Raccoon"],
  c: 1
},
{
  q: "What is the chemical symbol for calcium?",
  a: ["C", "Cl", "Cm", "Ca"],
  c: 3
},
{
  q: "Which country is home to the Serengeti National Park?",
  a: ["Rwanda", "Kenya", "Uganda", "Tanzania"],
  c: 3
},
{
  q: "Who painted The Last Supper?",
  a: ["Michelangelo", "Van Gogh", "Raphael", "Leonardo da Vinci"],
  c: 3
},
{
  q: "What is the capital of Bulgaria?",
  a: ["Plovdiv", "Varna", "Burgas", "Sofia"],
  c: 3
},
{
  q: "Which animal is known for its large ears and lives in Africa?",
  a: ["African Elephant", "Lion", "Giraffe", "Zebra"],
  c: 0
},
{
  q: "What is 90 ÷ 9?",
  a: ["11", "9", "10", "12"],
  c: 2
},
{
  q: "Which country is famous for the Acropolis of Athens?",
  a: ["Greece", "Egypt", "Italy", "Spain"],
  c: 0
},
{
  q: "What is the capital of Croatia?",
  a: ["Rijeka", "Zagreb", "Split", "Dubrovnik"],
  c: 1
},
{
  q: "Which animal is known for having a very long lifespan?",
  a: ["Mouse", "Hamster", "Rabbit", "Tortoise"],
  c: 3
},
{
  q: "What is the chemical symbol for copper?",
  a: ["Cp", "Cr", "Co", "Cu"],
  c: 3
},
{
  q: "Which country is home to the Amazon River?",
  a: ["Brazil", "Argentina", "Uruguay", "Chile"],
  c: 0
},
{
  q: "Who wrote A Christmas Carol?",
  a: ["Charles Dickens", "Mark Twain", "Oscar Wilde", "William Shakespeare"],
  c: 0
},
{
  q: "What is the capital of Serbia?",
  a: ["Sofia", "Sarajevo", "Belgrade", "Zagreb"],
  c: 2
},
{
  q: "Which animal is known for eating eucalyptus leaves?",
  a: ["Kangaroo", "Sloth", "Koala", "Panda"],
  c: 2
},
{
  q: "What is 16 × 5?",
  a: ["80", "90", "60", "70"],
  c: 0
},
{
  q: "Which country is famous for the city of Venice?",
  a: ["Greece", "France", "Italy", "Spain"],
  c: 2
},
{
  q: "What is the capital of Slovakia?",
  a: ["Prague", "Budapest", "Vienna", "Bratislava"],
  c: 3
},
{
  q: "Which animal is known for having a pouch?",
  a: ["Kangaroo", "Tiger", "Giraffe", "Lion"],
  c: 0
},
{
  q: "What is the chemical symbol for nitrogen?",
  a: ["N", "Na", "Ne", "Ni"],
  c: 0
},
{
  q: "Which country is home to Victoria Falls?",
  a: ["Kenya and Tanzania", "Zimbabwe and Zambia", "Namibia and Botswana", "South Africa and Lesotho"],
  c: 1
},
{
  q: "Who was William Shakespeare?",
  a: ["A playwright and poet", "A scientist", "A painter", "A musician"],
  c: 0
},
{
  q: "What is the capital of Slovenia?",
  a: ["Ljubljana", "Bratislava", "Zagreb", "Vienna"],
  c: 0
},
{
  q: "Which animal is known for its thick mane?",
  a: ["Horse", "Lion", "Bear", "Tiger"],
  c: 1
},
{
  q: "What is 72 ÷ 8?",
  a: ["9", "8", "7", "10"],
  c: 0
},
{
  q: "Which country is famous for Mount Fuji?",
  a: ["China", "Thailand", "South Korea", "Japan"],
  c: 3
},
{
  q: "What is the capital of Lithuania?",
  a: ["Vilnius", "Riga", "Tallinn", "Warsaw"],
  c: 0
},
{
  q: "Which animal is known for its long ears?",
  a: ["Giraffe", "Horse", "Elephant", "Rabbit"],
  c: 3
},
{
  q: "What is the chemical symbol for hydrogen?",
  a: ["H", "Hg", "Hy", "He"],
  c: 0
},
{
  q: "Which country is home to the Alps?",
  a: ["Only Italy", "Only France", "Only Germany", "Several European countries"],
  c: 3
},
{
  q: "Who composed many famous classical symphonies including Symphony No. 5?",
  a: ["Mozart", "Beethoven", "Chopin", "Bach"],
  c: 1
},
{
  q: "What is the capital of Estonia?",
  a: ["Vilnius", "Tallinn", "Helsinki", "Riga"],
  c: 1
},
{
  q: "Which animal is known for storing food in its cheeks?",
  a: ["Elephant", "Horse", "Hamster", "Lion"],
  c: 2
},
{
  q: "What is 14 × 4?",
  a: ["56", "48", "52", "60"],
  c: 0
},
{
  q: "Which country is famous for Big Ben?",
  a: ["Ireland", "France", "United Kingdom", "Germany"],
  c: 2
},
{
  q: "What is the capital of Latvia?",
  a: ["Warsaw", "Tallinn", "Riga", "Vilnius"],
  c: 2
},
{
  q: "Which animal is known for its black-and-white tail rings?",
  a: ["Skunk", "Raccoon", "Panda", "Lemur"],
  c: 1
},
{
  q: "What is the chemical symbol for chlorine?",
  a: ["Cl", "Ch", "C", "Cr"],
  c: 0
},
{
  q: "Which country is home to the Dead Sea?",
  a: ["Turkey and Greece", "Jordan and Israel", "India and Pakistan", "Egypt and Libya"],
  c: 1
},
{
  q: "Who was Cleopatra?",
  a: ["Greek philosopher", "Roman emperor", "French queen", "Queen of ancient Egypt"],
  c: 3
},
{
  q: "What is the capital of Ukraine?",
  a: ["Lviv", "Odesa", "Kharkiv", "Kyiv"],
  c: 3
},
{
  q: "Which animal is known for its ability to roll into a ball?",
  a: ["Horse", "Armadillo", "Lion", "Giraffe"],
  c: 1
},
{
  q: "What is 17 + 25?",
  a: ["42", "40", "44", "46"],
  c: 0
},
{
  q: "Which country is famous for the Kremlin?",
  a: ["Russia", "Belarus", "Poland", "Ukraine"],
  c: 0
},
{
  q: "What is the capital of Portugal?",
  a: ["Faro", "Braga", "Lisbon", "Porto"],
  c: 2
},
{
  q: "Which animal is known for its distinctive black-and-white face?",
  a: ["Zebra", "Giant Panda", "Skunk", "Penguin"],
  c: 1
},
{
  q: "What is the chemical symbol for carbon dioxide?",
  a: ["CaO", "CO2", "CO", "C2O"],
  c: 1
},
{
  q: "Which country is home to the Colosseum?",
  a: ["Spain", "France", "Italy", "Greece"],
  c: 2
},
{
  q: "Who was Albert Einstein?",
  a: ["A politician", "A physicist", "A painter", "A musician"],
  c: 1
},
{
  q: "What is the capital of Iceland?",
  a: ["Oslo", "Reykjavik", "Helsinki", "Akureyri"],
  c: 1
},
{
  q: "Which animal is known for its ability to swim long distances?",
  a: ["Chicken", "Giraffe", "Rabbit", "Dolphin"],
  c: 3
},
{
  q: "What is 19 × 3?",
  a: ["57", "54", "47", "63"],
  c: 0
},
{
  q: "Which country is famous for the Sydney Opera House?",
  a: ["Canada", "New Zealand", "Australia", "South Africa"],
  c: 2
},
{
  q: "What is the capital of the Netherlands?",
  a: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  c: 0
},
{
  q: "Which animal is known for producing milk for its young?",
  a: ["Reptiles", "Fish", "Mammals", "Birds"],
  c: 2
},
{
  q: "What is the chemical symbol for helium?",
  a: ["He", "Hg", "Ho", "H"],
  c: 0
},
{
  q: "Which country is home to the Great Barrier Reef?",
  a: ["India", "Australia", "South Africa", "Brazil"],
  c: 1
},
{
  q: "Who wrote The Adventures of Tom Sawyer?",
  a: ["Mark Twain", "Charles Dickens", "George Orwell", "Ernest Hemingway"],
  c: 0
},
{
  q: "What is the capital of Belgium?",
  a: ["Ghent", "Brussels", "Bruges", "Antwerp"],
  c: 1
},
{
  q: "Which animal is known for its ability to change colors?",
  a: ["Zebra", "Elephant", "Chameleon", "Lion"],
  c: 2
},
{
  q: "What is 21 × 3?",
  a: ["66", "60", "69", "63"],
  c: 3
},
{
  q: "Which country is famous for the pyramids of Giza?",
  a: ["Peru", "Mexico", "Greece", "Egypt"],
  c: 3
},
{
  q: "What is the capital of Morocco?",
  a: ["Rabat", "Marrakesh", "Casablanca", "Fez"],
  c: 0
},
{
  q: "Which animal is known for its powerful roar?",
  a: ["Lion", "Koala", "Rabbit", "Penguin"],
  c: 0
},
{
  q: "What is the chemical symbol for oxygen?",
  a: ["O", "Ox", "Og", "Om"],
  c: 0
},
{
  q: "Which country is home to the Nile River?",
  a: ["Morocco", "Egypt", "South Africa", "Nigeria"],
  c: 1
},
{
  q: "Who was the first person to reach the South Pole?",
  a: ["Roald Amundsen", "Ernest Shackleton", "Robert Scott", "James Cook"],
  c: 0
},
{
  q: "What is the capital of Tunisia?",
  a: ["Sfax", "Bizerte", "Sousse", "Tunis"],
  c: 3
},
{
  q: "Which animal is known for its large tusks?",
  a: ["Giraffe", "Zebra", "Lion", "Elephant"],
  c: 3
},
{
  q: "What is 22 × 4?",
  a: ["88", "96", "92", "84"],
  c: 0
},
{
  q: "Which country is famous for the Burj Khalifa?",
  a: ["Kuwait", "Saudi Arabia", "United Arab Emirates", "Qatar"],
  c: 2
},
{
  q: "What is the capital of Kenya?",
  a: ["Kisumu", "Nakuru", "Nairobi", "Mombasa"],
  c: 2
},
{
  q: "Which animal is known for its ability to climb trees?",
  a: ["Penguin", "Shark", "Monkey", "Whale"],
  c: 2
},
{
  q: "What is the chemical symbol for silver?",
  a: ["Si", "Ag", "Sr", "Au"],
  c: 1
},
{
  q: "Which country is home to the Okavango Delta?",
  a: ["Zimbabwe", "Botswana", "Namibia", "Zambia"],
  c: 1
},
{
  q: "Who wrote 1984?",
  a: ["Mark Twain", "Charles Dickens", "Aldous Huxley", "George Orwell"],
  c: 3
},
{
  q: "What is the capital of Botswana?",
  a: ["Gaborone", "Maun", "Francistown", "Kasane"],
  c: 0
},
{
  q: "Which animal is known for its long ears and hopping?",
  a: ["Fox", "Kangaroo", "Rabbit", "Deer"],
  c: 2
},
{
  q: "What is 23 + 19?",
  a: ["40", "46", "44", "42"],
  c: 3
},
{
  q: "Which country is famous for the Sahara Desert?",
  a: ["Australia", "Mexico", "India", "Africa"],
  c: 3
},
{
  q: "What is the capital of Namibia?",
  a: ["Walvis Bay", "Windhoek", "Swakopmund", "Rundu"],
  c: 1
},
{
  q: "Which animal is known for its thick fur and love of bamboo?",
  a: ["Tiger", "Wolf", "Panda", "Lion"],
  c: 2
},
{
  q: "What is the chemical symbol for calcium?",
  a: ["Ca", "Cl", "C", "Cm"],
  c: 0
},
{
  q: "Which country is home to the Zambezi River?",
  a: ["Only Morocco", "Only Egypt", "Several southern African countries", "Only Kenya"],
  c: 2
},
{
  q: "Who invented the light bulb commercially associated with him?",
  a: ["Albert Einstein", "Thomas Edison", "Isaac Newton", "Alexander Fleming"],
  c: 1
},
{
  q: "What is the capital of Zambia?",
  a: ["Ndola", "Livingstone", "Kitwe", "Lusaka"],
  c: 3
},
{
  q: "Which animal is known for its distinctive black-and-white stripes?",
  a: ["Tiger", "Skunk", "Zebra", "Panda"],
  c: 2
},
{
  q: "What is 24 × 4?",
  a: ["92", "96", "104", "100"],
  c: 1
},
{
  q: "Which country is famous for the Victoria Falls?",
  a: ["South Africa and Lesotho", "Zimbabwe and Zambia", "Botswana and Namibia", "Kenya and Tanzania"],
  c: 1
},
{
  q: "What is the capital of Mozambique?",
  a: ["Nampula", "Beira", "Maputo", "Tete"],
  c: 2
},
{
  q: "Which animal is known for its ability to live without drinking much water?",
  a: ["Cow", "Dolphin", "Camel", "Penguin"],
  c: 2
},
{
  q: "What is the chemical symbol for iron?",
  a: ["In", "Fe", "Ir", "I"],
  c: 1
},
{
  q: "Which country is home to Table Mountain?",
  a: ["Zimbabwe", "Namibia", "Botswana", "South Africa"],
  c: 3
},
{
  q: "Who was known as the Maid of Orléans?",
  a: ["Queen Victoria", "Cleopatra", "Joan of Arc", "Marie Curie"],
  c: 2
},
{
  q: "What is the capital of Malawi?",
  a: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"],
  c: 0
},
{
  q: "Which animal is known for its long neck and spots?",
  a: ["Cheetah", "Giraffe", "Zebra", "Leopard"],
  c: 1
},
{
  q: "What is 25 × 4?",
  a: ["90", "105", "100", "95"],
  c: 2
},
{
  q: "Which country is famous for the Eiffel Tower?",
  a: ["Belgium", "France", "Spain", "Italy"],
  c: 1
},
{
  q: "What is the capital of Uganda?",
  a: ["Jinja", "Kampala", "Gulu", "Entebbe"],
  c: 1
},
{
  q: "Which animal is known for its strong memory?",
  a: ["Cat", "Elephant", "Rabbit", "Mouse"],
  c: 1
},
{
  q: "What is the chemical symbol for potassium?",
  a: ["P", "K", "Po", "Pt"],
  c: 1
},
{
  q: "Which country is home to the Serengeti?",
  a: ["Rwanda", "Uganda", "Tanzania", "Kenya"],
  c: 2
},
{
  q: "Who painted the ceiling of the Sistine Chapel?",
  a: ["Raphael", "Leonardo da Vinci", "Donatello", "Michelangelo"],
  c: 3
},
{
  q: "What is the capital of Rwanda?",
  a: ["Musanze", "Kigali", "Butare", "Gisenyi"],
  c: 1
},
{
  q: "Which animal is known for its ability to camouflage?",
  a: ["Chameleon", "Horse", "Elephant", "Giraffe"],
  c: 0
},
{
  q: "What is 26 × 3?",
  a: ["88", "72", "78", "84"],
  c: 2
},
{
  q: "Which country is famous for the Great Pyramid of Giza?",
  a: ["Sudan", "Egypt", "Libya", "Morocco"],
  c: 1
},
{
  q: "What is the capital of Tanzania?",
  a: ["Dar es Salaam", "Mwanza", "Dodoma", "Arusha"],
  c: 2
},
{
  q: "Which animal is known for its sharp quills?",
  a: ["Rabbit", "Hedgehog", "Porcupine", "Badger"],
  c: 2
},
{
  q: "What is the chemical symbol for sodium?",
  a: ["So", "S", "Na", "Sd"],
  c: 2
},
{
  q: "Which country is home to the Sahara Desert?",
  a: ["Australia", "Europe", "Africa", "Asia"],
  c: 2
},
{
  q: "Who was the famous civil rights leader who gave the 'I Have a Dream' speech?",
  a: ["Malcolm X", "Nelson Mandela", "Barack Obama", "Martin Luther King Jr."],
  c: 3
},
{
  q: "What is the capital of Ethiopia?",
  a: ["Mekelle", "Gondar", "Dire Dawa", "Addis Ababa"],
  c: 3
},
{
  q: "Which animal is known for its ability to run very fast?",
  a: ["Koala", "Cheetah", "Sloth", "Turtle"],
  c: 1
},
{
  q: "What is 27 × 3?",
  a: ["84", "87", "78", "81"],
  c: 3
},
{
  q: "Which country is famous for the Acropolis?",
  a: ["Greece", "France", "Italy", "Egypt"],
  c: 0
},
{
  q: "What is the capital of Sudan?",
  a: ["Khartoum", "Port Sudan", "Omdurman", "Juba"],
  c: 0
},
{
  q: "Which animal is known for its black-and-white coloring and bamboo diet?",
  a: ["Zebra", "Skunk", "Giant Panda", "Penguin"],
  c: 2
},
{
  q: "What is the chemical symbol for mercury?",
  a: ["Me", "Mr", "Hg", "Mc"],
  c: 2
},
{
  q: "Which country is home to the Alps?",
  a: ["Only Switzerland", "Only Germany", "Only France", "Several European countries"],
  c: 3
},
{
  q: "Who wrote The Great Gatsby?",
  a: ["F. Scott Fitzgerald", "Mark Twain", "George Orwell", "Ernest Hemingway"],
  c: 0
},
{
  q: "What is the capital of Ghana?",
  a: ["Takoradi", "Kumasi", "Tamale", "Accra"],
  c: 3
},
{
  q: "Which animal is known for its ability to fly at night using echolocation?",
  a: ["Owl", "Bat", "Hawk", "Eagle"],
  c: 1
},
{
  q: "What is 28 × 3?",
  a: ["87", "81", "84", "90"],
  c: 2
},
{
  q: "Which country is famous for the Parthenon?",
  a: ["Greece", "Turkey", "Egypt", "Italy"],
  c: 0
},
{
  q: "What is the capital of Senegal?",
  a: ["Thiès", "Saint-Louis", "Touba", "Dakar"],
  c: 3
},
{
  q: "Which animal is known for its very long tongue?",
  a: ["Elephant", "Lion", "Anteater", "Horse"],
  c: 2
},
{
  q: "What is the chemical symbol for aluminium?",
  a: ["Al", "Au", "An", "Am"],
  c: 0
},
{
  q: "Which country is home to the Congo River?",
  a: ["Kenya only", "Egypt only", "Morocco only", "Democratic Republic of the Congo and surrounding countries"],
  c: 3
},
{
  q: "Who developed the theory of evolution?",
  a: ["Albert Einstein", "Galileo", "Isaac Newton", "Charles Darwin"],
  c: 3
},
{
  q: "What is the capital of Cameroon?",
  a: ["Garoua", "Yaoundé", "Douala", "Bamenda"],
  c: 1
},
{
  q: "Which animal is known for having a shell?",
  a: ["Monkey", "Lion", "Turtle", "Horse"],
  c: 2
},
{
  q: "What is 29 × 3?",
  a: ["93", "87", "90", "84"],
  c: 1
},
{
  q: "Which country is famous for the Leaning Tower of Pisa?",
  a: ["Portugal", "France", "Italy", "Spain"],
  c: 2
},
{
  q: "What is the capital of Gabon?",
  a: ["Oyem", "Libreville", "Port-Gentil", "Franceville"],
  c: 1
},
{
  q: "Which animal is known for its huge ears?",
  a: ["African Elephant", "Rabbit", "Bat", "Fox"],
  c: 0
},
{
  q: "What is the chemical symbol for magnesium?",
  a: ["Ms", "Mg", "Ma", "Mn"],
  c: 1
},
{
  q: "Which country is home to the Atlas Mountains?",
  a: ["Kenya", "Nigeria", "Morocco and North Africa", "South Africa"],
  c: 2
},
{
  q: "Who was the first woman to win a Nobel Prize?",
  a: ["Florence Nightingale", "Jane Goodall", "Rosa Parks", "Marie Curie"],
  c: 3
},
{
  q: "What is the capital of Mali?",
  a: ["Sikasso", "Timbuktu", "Bamako", "Mopti"],
  c: 2
},
{
  q: "Which animal is known for living in groups called prides?",
  a: ["Zebra", "Lion", "Wolf", "Elephant"],
  c: 1
},
{
  q: "What is 30 × 3?",
  a: ["100", "110", "80", "90"],
  c: 3
},
{
  q: "Which country is famous for the Forbidden City?",
  a: ["Thailand", "Korea", "Japan", "China"],
  c: 3
},
{
  q: "What is the capital of Niger?",
  a: ["Zinder", "Agadez", "Maradi", "Niamey"],
  c: 3
},
{
  q: "Which animal is known for its tusks and trunk?",
  a: ["Rhino", "Hippo", "Elephant", "Walrus"],
  c: 2
},
{
  q: "What is the chemical symbol for zinc?",
  a: ["Zc", "Zi", "Zn", "Z"],
  c: 2
},
{
  q: "Which country is home to the Andes?",
  a: ["Africa", "Asia", "Europe", "South America"],
  c: 3
},
{
  q: "Who was known as the King of Rock and Roll?",
  a: ["Michael Jackson", "Elvis Presley", "Bob Dylan", "Frank Sinatra"],
  c: 1
},
{
  q: "What is the capital of Burkina Faso?",
  a: ["Bamako", "Bobo-Dioulasso", "Niamey", "Ouagadougou"],
  c: 3
},
{
  q: "Which animal is known for its stripes and powerful jaws?",
  a: ["Horse", "Giraffe", "Tiger", "Zebra"],
  c: 2
},
{
  q: "What is 31 × 3?",
  a: ["90", "99", "96", "93"],
  c: 3
},
{
  q: "Which country is famous for the Kremlin?",
  a: ["Germany", "Russia", "Poland", "Ukraine"],
  c: 1
},
{
  q: "What is the capital of Niger?",
  a: ["Maradi", "Agadez", "Zinder", "Niamey"],
  c: 3
},
{
  q: "Which animal is known for its ability to live both on land and in water?",
  a: ["Frog", "Horse", "Eagle", "Lion"],
  c: 0
},
{
  q: "What is the chemical symbol for tin?",
  a: ["T", "Tn", "Ti", "Sn"],
  c: 3
},
{
  q: "Which country is home to the Amazon rainforest?",
  a: ["Brazil", "Uruguay", "Chile", "Argentina"],
  c: 0
},
{
  q: "Who wrote The Lord of the Rings?",
  a: ["C.S. Lewis", "J.K. Rowling", "J.R.R. Tolkien", "George R.R. Martin"],
  c: 2
},
{
  q: "What is the capital of Chad?",
  a: ["Moundou", "Sarh", "Abéché", "N'Djamena"],
  c: 3
},
{
  q: "Which animal is known for its ability to climb almost anything?",
  a: ["Goat", "Cow", "Horse", "Elephant"],
  c: 0
},
{
  q: "What is 32 × 3?",
  a: ["102", "108", "96", "90"],
  c: 2
},
{
  q: "Which country is famous for the Kremlin and Red Square?",
  a: ["Belarus", "Russia", "Poland", "Ukraine"],
  c: 1
},
{
  q: "What is the capital of Somalia?",
  a: ["Mogadishu", "Hargeisa", "Berbera", "Kismayo"],
  c: 0
},
{
  q: "Which animal is known for its thick wool?",
  a: ["Sheep", "Horse", "Zebra", "Lion"],
  c: 0
},
{
  q: "What is the chemical symbol for lead?",
  a: ["Le", "Ld", "Pb", "P"],
  c: 2
},
{
  q: "Which country is home to the Himalayas?",
  a: ["Only Nepal", "Several Asian countries", "Only India", "Only China"],
  c: 1
},
{
  q: "Who was the famous nurse known as the Lady with the Lamp?",
  a: ["Jane Austen", "Marie Curie", "Amelia Earhart", "Florence Nightingale"],
  c: 3
},
{
  q: "What is the capital of Eritrea?",
  a: ["Massawa", "Asmara", "Assab", "Keren"],
  c: 1
},
{
  q: "Which animal is known for its distinctive spots?",
  a: ["Lion", "Elephant", "Zebra", "Leopard"],
  c: 3
},
{
  q: "What is 33 × 3?",
  a: ["105", "102", "99", "96"],
  c: 2
},
{
  q: "Which country is famous for the Alhambra?",
  a: ["Portugal", "France", "Spain", "Italy"],
  c: 2
},
{
  q: "What is the capital of Djibouti?",
  a: ["Ali Sabieh", "Obock", "Djibouti City", "Tadjoura"],
  c: 2
},
{
  q: "Which animal is known for its distinctive black mask and ringed tail?",
  a: ["Badger", "Fox", "Wolf", "Raccoon"],
  c: 3
},
{
  q: "What is the chemical symbol for nickel?",
  a: ["Nk", "N", "Ni", "Nc"],
  c: 2
},
{
  q: "Which country is home to the Danube River?",
  a: ["Only Germany", "Only Hungary", "Only Austria", "Several European countries"],
  c: 3
},
{
  q: "Who was the famous Egyptian queen associated with Julius Caesar?",
  a: ["Hatshepsut", "Nefertiti", "Nefertari", "Cleopatra"],
  c: 3
},
{
  q: "What is the capital of Madagascar?",
  a: ["Antsirabe", "Antananarivo", "Toamasina", "Mahajanga"],
  c: 1
},
{
  q: "Which animal is known for its black and white face?",
  a: ["Skunk", "Zebra", "Panda", "Penguin"],
  c: 2
},
{
  q: "What is 34 × 3?",
  a: ["108", "99", "102", "105"],
  c: 2
},
{
  q: "Which country is famous for the Panama Canal?",
  a: ["Brazil", "Mexico", "Panama", "Colombia"],
  c: 2
},
{
  q: "What is the capital of Libya?",
  a: ["Benghazi", "Tripoli", "Misrata", "Sabha"],
  c: 1
},
{
  q: "Which animal is known for its ability to jump very high?",
  a: ["Kangaroo", "Hippo", "Elephant", "Rhino"],
  c: 0
},
{
  q: "What is the chemical symbol for uranium?",
  a: ["Ur", "Ua", "U", "Un"],
  c: 2
},
{
  q: "Which country is home to the Dead Sea?",
  a: ["India and Pakistan", "Egypt and Sudan", "Turkey and Greece", "Jordan and Israel"],
  c: 3
},
{
  q: "Who was the first person to fly solo across the Atlantic Ocean?",
  a: ["Neil Armstrong", "Charles Lindbergh", "Amelia Earhart", "Wright Brothers"],
  c: 1
},
{
  q: "What is the capital of Algeria?",
  a: ["Oran", "Annaba", "Algiers", "Constantine"],
  c: 2
},
{
  q: "Which animal is known for its ability to live in very cold environments?",
  a: ["Giraffe", "Camel", "Lion", "Polar Bear"],
  c: 3
},
{
  q: "What is 35 × 3?",
  a: ["105", "110", "115", "100"],
  c: 0
},
{
  q: "Which country is famous for the Blue Mosque?",
  a: ["Turkey", "Egypt", "Morocco", "Iran"],
  c: 0
},
{
  q: "What is the capital of Tunisia?",
  a: ["Tunis", "Sfax", "Gabès", "Sousse"],
  c: 0
},
{
  q: "Which animal is known for its thick layer of blubber?",
  a: ["Whale", "Horse", "Giraffe", "Lion"],
  c: 0
},
{
  q: "What is the chemical symbol for gold?",
  a: ["Go", "Au", "Ag", "Gd"],
  c: 1
},
{
  q: "Which country is home to the Atacama Desert?",
  a: ["Chile", "Peru", "Brazil", "Argentina"],
  c: 0
},
{
  q: "Who was the first woman to fly solo across the Atlantic?",
  a: ["Amelia Earhart", "Marie Curie", "Florence Nightingale", "Rosa Parks"],
  c: 0
},
{
  q: "What is the capital of Mauritania?",
  a: ["Nouakchott", "Rosso", "Atar", "Nouadhibou"],
  c: 0
},
{
  q: "Which animal is known for its long tail and ability to swing through trees?",
  a: ["Monkey", "Elephant", "Penguin", "Lion"],
  c: 0
},
{
  q: "What is 36 × 3?",
  a: ["102", "120", "108", "114"],
  c: 2
},
{
  q: "Which country is famous for the ancient city of Petra?",
  a: ["Jordan", "Egypt", "Greece", "Turkey"],
  c: 0
},
{
  q: "What is the capital of Liberia?",
  a: ["Kakata", "Gbarnga", "Monrovia", "Buchanan"],
  c: 2
},
{
  q: "Which animal is known for its ability to regenerate parts of its body?",
  a: ["Starfish", "Elephant", "Horse", "Lion"],
  c: 0
},
{
  q: "What is the chemical symbol for silver?",
  a: ["Sr", "Ag", "Si", "Au"],
  c: 1
},
{
  q: "Which country is home to Lake Victoria?",
  a: ["Only Tanzania", "Only Uganda", "Only Kenya", "Several East African countries"],
  c: 3
},
{
  q: "Who was the famous physicist who developed the laws of motion?",
  a: ["Albert Einstein", "Niels Bohr", "Isaac Newton", "Stephen Hawking"],
  c: 2
},
{
  q: "What is the capital of Sierra Leone?",
  a: ["Freetown", "Makeni", "Bo", "Kenema"],
  c: 0
},
{
  q: "Which animal is known for its distinctive laugh-like call?",
  a: ["Hyena", "Lion", "Fox", "Monkey"],
  c: 0
},
{
  q: "What is 37 × 3?",
  a: ["111", "114", "108", "117"],
  c: 0
},
{
  q: "Which country is famous for the ancient city of Troy?",
  a: ["Egypt", "Greece", "Turkey", "Italy"],
  c: 2
},
{
  q: "What is the capital of Guinea?",
  a: ["Labé", "Kindia", "Kankan", "Conakry"],
  c: 3
},
{
  q: "Which animal is known for its strong social bonds?",
  a: ["Elephant", "Shark", "Lizard", "Snake"],
  c: 0
},
{
  q: "What is the chemical symbol for nitrogen?",
  a: ["N", "Na", "Ne", "Ni"],
  c: 0
},
{
  q: "Which country is home to the Congo Basin rainforest?",
  a: ["Southern Europe", "South America", "Australia", "Central Africa"],
  c: 3
},
{
  q: "Who was the first person to orbit Earth?",
  a: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"],
  c: 0
},
{
  q: "What is the capital of Gambia?",
  a: ["Brikama", "Serekunda", "Banjul", "Bakau"],
  c: 2
},
{
  q: "Which animal is known for its distinctive black-and-white tail?",
  a: ["Tiger", "Lemur", "Elephant", "Lion"],
  c: 1
},
{
  q: "What is 38 × 3?",
  a: ["108", "126", "120", "114"],
  c: 3
},
{
  q: "Which country is famous for the Terracotta Army?",
  a: ["India", "China", "Japan", "Mongolia"],
  c: 1
},
{
  q: "What is the capital of Guinea-Bissau?",
  a: ["Cacheu", "Bissau", "Bafatá", "Gabú"],
  c: 1
},
{
  q: "Which animal is known for its excellent sense of smell?",
  a: ["Dog", "Elephant", "Rabbit", "Horse"],
  c: 0
},
{
  q: "What is the chemical symbol for hydrogen?",
  a: ["Hy", "H", "Hg", "He"],
  c: 1
},
{
  q: "Which country is home to the Serengeti National Park?",
  a: ["Tanzania", "Uganda", "Kenya", "Rwanda"],
  c: 0
},
{
  q: "Who was the first emperor of Rome?",
  a: ["Julius Caesar", "Augustus", "Constantine", "Nero"],
  c: 1
},
{
  q: "What is the capital of Togo?",
  a: ["Sokodé", "Atakpamé", "Lomé", "Kara"],
  c: 2
},
{
  q: "Which animal is known for its ability to see in almost complete darkness?",
  a: ["Cat", "Rabbit", "Horse", "Cow"],
  c: 0
},
{
  q: "What is 39 × 3?",
  a: ["123", "114", "120", "117"],
  c: 3
},
{
  q: "Which country is famous for the ancient city of Pompeii?",
  a: ["Greece", "Italy", "France", "Spain"],
  c: 1
},
{
  q: "What is the capital of Benin?",
  a: ["Porto-Novo", "Cotonou", "Parakou", "Abomey"],
  c: 0
},
{
  q: "Which animal is known for its ability to hold its breath underwater for a long time?",
  a: ["Rabbit", "Giraffe", "Chicken", "Whale"],
  c: 3
},
{
  q: "What is the chemical symbol for chlorine?",
  a: ["Cl", "Cr", "Ch", "C"],
  c: 0
},
{
  q: "Which country is home to the Galápagos Islands?",
  a: ["Peru", "Chile", "Ecuador", "Colombia"],
  c: 2
},
{
  q: "Who wrote The Divine Comedy?",
  a: ["Virgil", "Homer", "Shakespeare", "Dante Alighieri"],
  c: 3
},
{
  q: "What is the capital of Côte d'Ivoire?",
  a: ["Bouaké", "Korhogo", "Abidjan", "Yamoussoukro"],
  c: 3
},
{
  q: "Which animal is known for its ability to survive without food for long periods?",
  a: ["Chicken", "Horse", "Camel", "Rabbit"],
  c: 2
},
{
  q: "What is 40 × 3?",
  a: ["130", "120", "110", "100"],
  c: 1
},
{
  q: "Which country is famous for the Christ the Redeemer statue?",
  a: ["Chile", "Peru", "Argentina", "Brazil"],
  c: 3
},
{
  q: "What is the capital of Burkina Faso?",
  a: ["Accra", "Niamey", "Ouagadougou", "Bamako"],
  c: 2
},
{
  q: "Which animal is known for its ability to swim and climb trees?",
  a: ["Otter", "Lion", "Giraffe", "Horse"],
  c: 0
},
{
  q: "What is the chemical symbol for carbon?",
  a: ["Cr", "Ca", "C", "Co"],
  c: 2
},
{
  q: "Which country is home to the Amazon River?",
  a: ["Chile", "Argentina", "Brazil", "Uruguay"],
  c: 2
},
{
  q: "Who composed the famous opera The Magic Flute?",
  a: ["Mozart", "Bach", "Beethoven", "Chopin"],
  c: 0
},
{
  q: "What is the capital of Equatorial Guinea?",
  a: ["Bata", "Mongomo", "Ebebiyin", "Malabo"],
  c: 3
},
{
  q: "Which animal is known for its distinctive spiral horns?",
  a: ["Antelope", "Zebra", "Elephant", "Lion"],
  c: 0
},
{
  q: "What is 41 × 3?",
  a: ["126", "129", "120", "123"],
  c: 3
},
{
  q: "Which country is famous for the Temple of Angkor Wat?",
  a: ["Laos", "Cambodia", "Thailand", "Vietnam"],
  c: 1
},
{
  q: "What is the capital of the Republic of the Congo?",
  a: ["Brazzaville", "Kinshasa", "Pointe-Noire", "Dolisie"],
  c: 0
},
{
  q: "Which animal is known for having a pouch and hopping?",
  a: ["Zebra", "Elephant", "Kangaroo", "Tiger"],
  c: 2
},
{
  q: "What is the chemical symbol for phosphorus?",
  a: ["P", "Ph", "Po", "Ps"],
  c: 0
},
{
  q: "Which country is home to the Taj Mahal?",
  a: ["India", "Nepal", "Bhutan", "Pakistan"],
  c: 0
},
{
  q: "Who wrote Don Quixote?",
  a: ["Homer", "Dante", "Shakespeare", "Miguel de Cervantes"],
  c: 3
},
{
  q: "What is the capital of the Democratic Republic of the Congo?",
  a: ["Lubumbashi", "Goma", "Kinshasa", "Brazzaville"],
  c: 2
},
{
  q: "Which animal is known for its ability to change its skin color?",
  a: ["Chameleon", "Elephant", "Horse", "Lion"],
  c: 0
},
{
  q: "What is 42 × 3?",
  a: ["138", "126", "120", "132"],
  c: 1
},
{
  q: "Which country is famous for the Blue Mosque?",
  a: ["Iran", "Egypt", "Morocco", "Turkey"],
  c: 3
},
{
  q: "What is the capital of Angola?",
  a: ["Lobito", "Luanda", "Huambo", "Benguela"],
  c: 1
},
{
  q: "Which animal is known for its powerful jaws?",
  a: ["Horse", "Crocodile", "Koala", "Rabbit"],
  c: 1
},
{
  q: "What is the chemical symbol for oxygen?",
  a: ["On", "Og", "Ox", "O"],
  c: 3
},
{
  q: "Which country is home to Mount Kilimanjaro?",
  a: ["Tanzania", "Kenya", "Ethiopia", "Uganda"],
  c: 0
},
{
  q: "Who wrote The Catcher in the Rye?",
  a: ["J.D. Salinger", "Ernest Hemingway", "F. Scott Fitzgerald", "George Orwell"],
  c: 0
},
{
  q: "What is the capital of Eswatini?",
  a: ["Siteki", "Manzini", "Mbabane", "Lobamba"],
  c: 2
},
{
  q: "Which animal is known for its thick wool coat?",
  a: ["Sheep", "Horse", "Zebra", "Lion"],
  c: 0
},
{
  q: "What is 43 × 3?",
  a: ["126", "129", "135", "132"],
  c: 1
},
{
  q: "Which country is famous for the Hagia Sophia?",
  a: ["Turkey", "Italy", "Greece", "Egypt"],
  c: 0
},
{
  q: "What is the capital of Lesotho?",
  a: ["Qacha's Nek", "Maseru", "Hlotse", "Mafeteng"],
  c: 1
},
{
  q: "Which animal is known for its long neck?",
  a: ["Zebra", "Giraffe", "Elephant", "Camel"],
  c: 1
},
{
  q: "What is the chemical symbol for calcium?",
  a: ["C", "Ca", "Cl", "Cm"],
  c: 1
},
{
  q: "Which country is home to the Kalahari Desert?",
  a: ["Southern Africa", "South America", "North Africa", "Australia"],
  c: 0
},
{
  q: "Who wrote The Picture of Dorian Gray?",
  a: ["Mark Twain", "Charles Dickens", "Oscar Wilde", "Jane Austen"],
  c: 2
},
{
  q: "What is the capital of Eswatini?",
  a: ["Mbabane", "Nhlangano", "Manzini", "Lobamba"],
  c: 0
},
{
  q: "Which animal is known for its distinctive spots?",
  a: ["Leopard", "Elephant", "Zebra", "Lion"],
  c: 0
},
{
  q: "What is 44 × 3?",
  a: ["128", "140", "132", "136"],
  c: 2
},
{
  q: "Which country is famous for the Moai statues?",
  a: ["Chile", "Peru", "Ecuador", "Brazil"],
  c: 0
},
{
  q: "What is the capital of Madagascar?",
  a: ["Toliara", "Toamasina", "Antananarivo", "Mahajanga"],
  c: 2
},
{
  q: "Which animal is known for its ability to glide through the air?",
  a: ["Lion", "Flying squirrel", "Elephant", "Rhino"],
  c: 1
},
{
  q: "What is the chemical symbol for helium?",
  a: ["He", "Hg", "H", "Ho"],
  c: 0
},
{
  q: "Which country is home to the Drakensberg Mountains?",
  a: ["Egypt and Sudan", "Morocco and Algeria", "South Africa and Lesotho", "Kenya and Uganda"],
  c: 2
},
{
  q: "Who was the famous Greek philosopher who taught Alexander the Great?",
  a: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
  c: 2
},
{
  q: "What is the capital of Mauritius?",
  a: ["Curepipe", "Vacoas", "Port Louis", "Quatre Bornes"],
  c: 2
},
{
  q: "Which animal is known for its distinctive shell and slow movement?",
  a: ["Rabbit", "Deer", "Fox", "Tortoise"],
  c: 3
},
{
  q: "What is 45 × 3?",
  a: ["125", "135", "140", "130"],
  c: 1
},
{
  q: "Which country is famous for the Acropolis of Athens?",
  a: ["France", "Italy", "Greece", "Turkey"],
  c: 2
},
{
  q: "What is the capital of Seychelles?",
  a: ["Nairobi", "Port Louis", "Moroni", "Victoria"],
  c: 3
},
{
  q: "Which animal is known for its black-and-white stripes?",
  a: ["Skunk", "Panda", "Tiger", "Zebra"],
  c: 3
},
{
  q: "What is the chemical symbol for copper?",
  a: ["Cu", "Co", "Cp", "Cr"],
  c: 0
},
{
  q: "Which country is home to the Great Zimbabwe ruins?",
  a: ["Zimbabwe", "Mozambique", "Zambia", "Botswana"],
  c: 0
},
{
  q: "Who was the famous scientist associated with the theory of natural selection?",
  a: ["Charles Darwin", "Albert Einstein", "Marie Curie", "Isaac Newton"],
  c: 0
},
{
  q: "What is the capital of Comoros?",
  a: ["Fomboni", "Mamoudzou", "Moroni", "Mutsamudu"],
  c: 2
},
{
  q: "Which animal is known for its strong sense of smell?",
  a: ["Elephant", "Horse", "Cat", "Dog"],
  c: 3
},
{
  q: "What is 46 × 3?",
  a: ["132", "138", "150", "144"],
  c: 1
},
{
  q: "Which country is famous for the Pyramids of Teotihuacan?",
  a: ["Brazil", "Peru", "Mexico", "Guatemala"],
  c: 2
},
{
  q: "What is the capital of Seychelles?",
  a: ["Maputo", "Port Louis", "Moroni", "Victoria"],
  c: 3
},
{
  q: "Which animal is known for its large tusks and flippers?",
  a: ["Seal", "Hippo", "Elephant", "Walrus"],
  c: 3
},
{
  q: "What is the chemical symbol for silver?",
  a: ["Au", "Si", "Sr", "Ag"],
  c: 3
},
{
  q: "Which country is home to the Victoria Falls?",
  a: ["Botswana and Namibia", "Zimbabwe and Zambia", "Kenya and Tanzania", "South Africa and Lesotho"],
  c: 1
},
{
  q: "Who wrote The Hobbit?",
  a: ["George Orwell", "J.K. Rowling", "C.S. Lewis", "J.R.R. Tolkien"],
  c: 3
},
{
  q: "What is the capital of Mauritius?",
  a: ["Victoria", "Maputo", "Port Louis", "Moroni"],
  c: 2
},
{
  q: "Which animal is known for its ability to mimic sounds?",
  a: ["Parrot", "Horse", "Elephant", "Giraffe"],
  c: 0
},
{
  q: "What is 47 × 3?",
  a: ["147", "141", "144", "138"],
  c: 1
},
{
  q: "Which country is famous for the Eiffel Tower?",
  a: ["Italy", "Belgium", "France", "Spain"],
  c: 2
},
{
  q: "What is the capital of Cabo Verde?",
  a: ["Espargos", "Praia", "Santa Maria", "Mindelo"],
  c: 1
},
{
  q: "Which animal is known for its distinctive mane?",
  a: ["Lion", "Bear", "Horse", "Tiger"],
  c: 0
},
{
  q: "What is the chemical symbol for iron?",
  a: ["Ir", "Fe", "I", "In"],
  c: 1
},
{
  q: "Which country is home to the Nile Delta?",
  a: ["Ethiopia", "Sudan", "Kenya", "Egypt"],
  c: 3
},
{
  q: "Who was the first person to reach the summit of Mount Everest?",
  a: ["Edmund Hillary and Tenzing Norgay", "Neil Armstrong", "Roald Amundsen", "Yuri Gagarin"],
  c: 0
},
{
  q: "What is the capital of Sao Tome and Principe?",
  a: ["Neves", "Santo António", "Trindade", "São Tomé"],
  c: 3
},
{
  q: "Which animal is known for its ability to survive in deserts?",
  a: ["Camel", "Seal", "Penguin", "Dolphin"],
  c: 0
},
{
  q: "What is 48 × 3?",
  a: ["138", "156", "150", "144"],
  c: 3
},
{
  q: "Which country is famous for the ancient city of Machu Picchu?",
  a: ["Ecuador", "Chile", "Bolivia", "Peru"],
  c: 3
},
{
  q: "What is the capital of Namibia?",
  a: ["Rundu", "Swakopmund", "Walvis Bay", "Windhoek"],
  c: 3
},
{
  q: "Which animal is known for its ability to run across water for short distances?",
  a: ["Turtle", "Crocodile", "Basilisk lizard", "Frog"],
  c: 2
},
{
  q: "What is the chemical symbol for potassium?",
  a: ["Pt", "Po", "K", "P"],
  c: 2
},
{
  q: "Which country is home to Lake Malawi?",
  a: ["Zimbabwe", "Zambia", "Malawi", "Mozambique"],
  c: 2
},
{
  q: "Who was the famous physicist who developed the uncertainty principle?",
  a: ["Werner Heisenberg", "Isaac Newton", "Albert Einstein", "Galileo"],
  c: 0
},
{
  q: "What is the capital of Zimbabwe?",
  a: ["Harare", "Masvingo", "Bulawayo", "Mutare"],
  c: 0
},
{
  q: "Which animal is known for its ability to echolocate?",
  a: ["Giraffe", "Lion", "Rabbit", "Bat"],
  c: 3
},
{
  q: "What is 49 × 3?",
  a: ["147", "153", "150", "156"],
  c: 0
},
{
  q: "Which country is famous for the Forbidden City?",
  a: ["China", "Japan", "Vietnam", "South Korea"],
  c: 0
},
{
  q: "What is the capital of Zambia?",
  a: ["Lusaka", "Livingstone", "Kitwe", "Ndola"],
  c: 0
},
{
  q: "Which animal is known for its distinctive spots and powerful build?",
  a: ["Jaguar", "Giraffe", "Lion", "Zebra"],
  c: 0
},
{
  q: "What is the chemical symbol for uranium?",
  a: ["U", "Un", "Ua", "Ur"],
  c: 0
},
{
  q: "Which country is home to the Okavango Delta?",
  a: ["Zambia", "Zimbabwe", "Namibia", "Botswana"],
  c: 3
},
{
  q: "Who was the famous explorer who sailed around the Cape of Good Hope?",
  a: ["Bartolomeu Dias", "Marco Polo", "Christopher Columbus", "Ferdinand Magellan"],
  c: 0
},
{
  q: "What is the capital of Botswana?",
  a: ["Francistown", "Gaborone", "Kasane", "Maun"],
  c: 1
},
{
  q: "Which animal is known for its distinctive black and white stripes?",
  a: ["Panda", "Tiger", "Zebra", "Skunk"],
  c: 2
},
{
  q: "What is 50 × 3?",
  a: ["120", "150", "180", "200"],
  c: 1
},
{
  q: "Which country is famous for the Great Wall?",
  a: ["Mongolia", "China", "Japan", "India"],
  c: 1
},
{
  q: "What is the capital of South Africa?",
  a: ["Cape Town", "Pretoria", "Durban", "Johannesburg"],
  c: 1
},
{
  q: "Which animal is known as the largest land mammal?",
  a: ["African Elephant", "Rhino", "Hippo", "Giraffe"],
  c: 0
},
{
  q: "What is the chemical symbol for hydrogen?",
  a: ["He", "H", "Hy", "Hg"],
  c: 1
},
{
  q: "Which country is home to Table Mountain?",
  a: ["Botswana", "South Africa", "Zimbabwe", "Namibia"],
  c: 1
},
{
  q: "Who was Nelson Mandela?",
  a: ["American astronaut", "French scientist", "British monarch", "South African political leader"],
  c: 3
},
{
  q: "What is the capital of Malawi?",
  a: ["Zomba", "Mzuzu", "Lilongwe", "Blantyre"],
  c: 2
},
{
  q: "Which animal is known for its ability to store water in its body?",
  a: ["Camel", "Horse", "Lion", "Elephant"],
  c: 0
},
{
  q: "What is 51 × 2?",
  a: ["102", "103", "101", "104"],
  c: 0
},
{
  q: "Which country is famous for the Sydney Opera House?",
  a: ["Australia", "Canada", "South Africa", "New Zealand"],
  c: 0
},
{
  q: "What is the capital of Kenya?",
  a: ["Mombasa", "Kisumu", "Nakuru", "Nairobi"],
  c: 3
},
{
  q: "Which animal is known for its long neck?",
  a: ["Elephant", "Camel", "Giraffe", "Horse"],
  c: 2
},
{
  q: "What is the chemical symbol for oxygen?",
  a: ["Ox", "Og", "On", "O"],
  c: 3
},
{
  q: "Which country is home to Mount Kilimanjaro?",
  a: ["Kenya", "Rwanda", "Uganda", "Tanzania"],
  c: 3
},
{
  q: "Who wrote Romeo and Juliet?",
  a: ["Charles Dickens", "Oscar Wilde", "William Shakespeare", "Mark Twain"],
  c: 2
},
{
  q: "What is the capital of Uganda?",
  a: ["Entebbe", "Gulu", "Jinja", "Kampala"],
  c: 3
},
{
  q: "Which animal is known for its ability to climb trees?",
  a: ["Hippo", "Penguin", "Elephant", "Monkey"],
  c: 3
},
{
  q: "What is 52 × 2?",
  a: ["108", "104", "106", "102"],
  c: 1
},
{
  q: "Which country is famous for the Taj Mahal?",
  a: ["Nepal", "Bangladesh", "India", "Pakistan"],
  c: 2
},
{
  q: "What is the capital of Rwanda?",
  a: ["Gisenyi", "Kigali", "Butare", "Musanze"],
  c: 1
},
{
  q: "Which animal is known for its powerful roar?",
  a: ["Wolf", "Lion", "Bear", "Tiger"],
  c: 1
},
{
  q: "What is the chemical symbol for carbon dioxide?",
  a: ["CaO", "C2O", "CO", "CO2"],
  c: 3
},
{
  q: "Which country is home to Victoria Falls?",
  a: ["South Africa and Lesotho", "Zimbabwe and Zambia", "Kenya and Uganda", "Botswana and Namibia"],
  c: 1
},
{
  q: "Who discovered penicillin?",
  a: ["Isaac Newton", "Albert Einstein", "Marie Curie", "Alexander Fleming"],
  c: 3
},
{
  q: "What is the capital of Tanzania?",
  a: ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza"],
  c: 1
},
{
  q: "Which animal is known for producing honey?",
  a: ["Ant", "Wasp", "Butterfly", "Bee"],
  c: 3
},
{
  q: "What is 53 × 2?",
  a: ["110", "108", "106", "104"],
  c: 2
},
{
  q: "Which country is famous for the Eiffel Tower?",
  a: ["Italy", "Spain", "Portugal", "France"],
  c: 3
},
{
  q: "What is the capital of Ethiopia?",
  a: ["Dire Dawa", "Mekelle", "Gondar", "Addis Ababa"],
  c: 3
},
{
  q: "Which animal is known for its ability to change color?",
  a: ["Lion", "Chameleon", "Zebra", "Elephant"],
  c: 1
},
{
  q: "What is the chemical symbol for gold?",
  a: ["Ag", "Au", "Fe", "Cu"],
  c: 1
},
{
  q: "Which country is home to the Serengeti?",
  a: ["Rwanda", "Tanzania", "Uganda", "Kenya"],
  c: 1
},
{
  q: "Who painted the Mona Lisa?",
  a: ["Raphael", "Van Gogh", "Leonardo da Vinci", "Michelangelo"],
  c: 2
},
{
  q: "What is the capital of Egypt?",
  a: ["Giza", "Luxor", "Alexandria", "Cairo"],
  c: 3
},
{
  q: "Which animal is known for its black-and-white stripes?",
  a: ["Skunk", "Panda", "Tiger", "Zebra"],
  c: 3
},
{
  q: "What is 54 × 2?",
  a: ["108", "110", "106", "112"],
  c: 0
},
{
  q: "Which country is famous for the Colosseum?",
  a: ["Spain", "Italy", "Greece", "France"],
  c: 1
},
{
  q: "What is the capital of Morocco?",
  a: ["Rabat", "Marrakesh", "Fez", "Casablanca"],
  c: 0
},
{
  q: "Which animal is known for its long trunk?",
  a: ["Elephant", "Rhino", "Giraffe", "Hippo"],
  c: 0
},
{
  q: "What is the chemical symbol for silver?",
  a: ["Au", "Si", "Fe", "Ag"],
  c: 3
},
{
  q: "Which country is home to the Sahara Desert?",
  a: ["Asia", "Africa", "Australia", "South America"],
  c: 1
},
{
  q: "Who developed the theory of relativity?",
  a: ["Albert Einstein", "Isaac Newton", "Charles Darwin", "Galileo"],
  c: 0
},
{
  q: "What is the capital of Nigeria?",
  a: ["Abuja", "Lagos", "Kano", "Ibadan"],
  c: 0
},
{
  q: "Which animal is known for its ability to fly?",
  a: ["Elephant", "Bird", "Lion", "Horse"],
  c: 1
},
{
  q: "What is 55 × 2?",
  a: ["105", "120", "115", "110"],
  c: 3
},
{
  q: "Which country is famous for the Leaning Tower of Pisa?",
  a: ["France", "Greece", "Italy", "Spain"],
  c: 2
},
{
  q: "What is the capital of Ghana?",
  a: ["Cape Coast", "Tamale", "Accra", "Kumasi"],
  c: 2
},
{
  q: "Which animal is known for its ability to swim?",
  a: ["Dolphin", "Horse", "Giraffe", "Lion"],
  c: 0
},
{
  q: "What is the chemical symbol for iron?",
  a: ["In", "Ir", "I", "Fe"],
  c: 3
},
{
  q: "Which country is home to the Great Barrier Reef?",
  a: ["South Africa", "Brazil", "Australia", "India"],
  c: 2
},
{
  q: "Who wrote Harry Potter?",
  a: ["Stephen King", "J.K. Rowling", "George Orwell", "J.R.R. Tolkien"],
  c: 1
},
{
  q: "What is the capital of Australia?",
  a: ["Sydney", "Perth", "Melbourne", "Canberra"],
  c: 3
},
{
  q: "Which animal is known for its ability to hop?",
  a: ["Elephant", "Lion", "Giraffe", "Kangaroo"],
  c: 3
},
{
  q: "What is 56 × 2?",
  a: ["112", "116", "114", "110"],
  c: 0
},
{
  q: "Which country is famous for Mount Fuji?",
  a: ["China", "South Korea", "Thailand", "Japan"],
  c: 3
},
{
  q: "What is the capital of Japan?",
  a: ["Nagoya", "Osaka", "Tokyo", "Kyoto"],
  c: 2
},
{
  q: "Which animal is known for its distinctive spots?",
  a: ["Zebra", "Leopard", "Elephant", "Lion"],
  c: 1
},
{
  q: "What is the chemical symbol for nitrogen?",
  a: ["Ni", "N", "Na", "Ne"],
  c: 1
},
{
  q: "Which country is home to Mount Everest?",
  a: ["Nepal and China", "Pakistan only", "India only", "Bhutan only"],
  c: 0
},
{
  q: "Who wrote The Hobbit?",
  a: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "George Orwell"],
  c: 0
},
{
  q: "What is the capital of Brazil?",
  a: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
  c: 2
},
{
  q: "Which animal is known for its ability to camouflage?",
  a: ["Chameleon", "Lion", "Horse", "Elephant"],
  c: 0
},
{
  q: "What is 57 × 2?",
  a: ["112", "114", "118", "116"],
  c: 1
},
{
  q: "Which country is famous for the Statue of Liberty?",
  a: ["United States", "France", "Canada", "United Kingdom"],
  c: 0
},
{
  q: "What is the capital of Canada?",
  a: ["Ottawa", "Montreal", "Vancouver", "Toronto"],
  c: 0
},
{
  q: "Which animal is known as the King of the Jungle?",
  a: ["Lion", "Tiger", "Leopard", "Elephant"],
  c: 0
},
{
  q: "What is the chemical symbol for calcium?",
  a: ["Cm", "C", "Ca", "Cl"],
  c: 2
},
{
  q: "Which country is home to the Amazon rainforest?",
  a: ["Bolivia", "Colombia", "Peru", "Brazil"],
  c: 3
},
{
  q: "Who was the first person to walk on the Moon?",
  a: ["Buzz Aldrin", "John Glenn", "Yuri Gagarin", "Neil Armstrong"],
  c: 3
},
{
  q: "What is the capital of India?",
  a: ["Kolkata", "Chennai", "Mumbai", "New Delhi"],
  c: 3
},
{
  q: "Which animal is known for its long neck?",
  a: ["Giraffe", "Elephant", "Horse", "Camel"],
  c: 0
},
{
  q: "What is 58 × 2?",
  a: ["114", "118", "116", "120"],
  c: 2
},
{
  q: "Which country is famous for the Taj Mahal?",
  a: ["Bangladesh", "Pakistan", "Nepal", "India"],
  c: 3
},
{
  q: "What is the capital of Spain?",
  a: ["Madrid", "Valencia", "Seville", "Barcelona"],
  c: 0
},
{
  q: "Which animal is known for its black-and-white fur?",
  a: ["Zebra", "Skunk", "Panda", "Tiger"],
  c: 2
},
{
  q: "What is the chemical symbol for copper?",
  a: ["Cp", "Cr", "Cu", "Co"],
  c: 2
},
{
  q: "Which country is home to the Andes Mountains?",
  a: ["Europe", "Africa", "Asia", "South America"],
  c: 3
},
{
  q: "Who wrote Romeo and Juliet?",
  a: ["William Shakespeare", "Jane Austen", "Mark Twain", "Charles Dickens"],
  c: 0
},
{
  q: "What is the capital of Germany?",
  a: ["Frankfurt", "Berlin", "Hamburg", "Munich"],
  c: 1
},
{
  q: "Which animal is known for producing honey?",
  a: ["Spider", "Ant", "Bee", "Butterfly"],
  c: 2
},
{
  q: "What is 59 × 2?",
  a: ["122", "120", "118", "116"],
  c: 2
},
{
  q: "Which country is famous for the Great Wall?",
  a: ["India", "China", "Mongolia", "Japan"],
  c: 1
},
{
  q: "What is the capital of China?",
  a: ["Guangzhou", "Beijing", "Shenzhen", "Shanghai"],
  c: 1
},
{
  q: "Which animal is known for its powerful jaws?",
  a: ["Horse", "Crocodile", "Rabbit", "Koala"],
  c: 1
},
{
  q: "What is the chemical symbol for potassium?",
  a: ["Po", "K", "P", "Pt"],
  c: 1
},
{
  q: "Which country is home to the Nile River?",
  a: ["Morocco", "Kenya", "Nigeria", "Egypt"],
  c: 3
},
{
  q: "Who painted Starry Night?",
  a: ["Claude Monet", "Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"],
  c: 2
},
{
  q: "What is the capital of France?",
  a: ["Madrid", "Paris", "Berlin", "Rome"],
  c: 1
},
{
  q: "Which animal is known for being the fastest land animal?",
  a: ["Lion", "Horse", "Leopard", "Cheetah"],
  c: 3
},
{
  q: "What is 60 × 2?",
  a: ["120", "110", "130", "100"],
  c: 0
}

];

module.exports = QUESTIONS;