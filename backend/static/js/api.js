const destinationsMock = {
    // --- EUROPE ---
    "Paris": [
        {name:"Eiffel Tower",location:"Champ de Mars",type:"Landmark",lat:48.8584,lon:2.2945},
        {name:"Louvre Museum",location:"Rue de Rivoli",type:"Museum",lat:48.8606,lon:2.3376},
        {name:"Notre-Dame Cathedral",location:"Île de la Cité",type:"Landmark",lat:48.8530,lon:2.3499},
        {name:"Montmartre",location:"18th arrondissement",type:"Landmark",lat:48.8867,lon:2.3431},
        {name:"Luxembourg Gardens",location:"6th arrondissement",type:"Park",lat:48.8462,lon:2.3372},
        {name:"Musée d'Orsay",location:"7th arrondissement",type:"Museum",lat:48.8600,lon:2.3266}
    ],
    "London": [
        {name:"British Museum",location:"Great Russell St",type:"Museum",lat:51.5194,lon:-0.1270},
        {name:"Tower Bridge",location:"River Thames",type:"Landmark",lat:51.5055,lon:-0.0754},
        {name:"Hyde Park",location:"Central London",type:"Park",lat:51.5074,lon:-0.1657},
        {name:"Buckingham Palace",location:"Westminster",type:"Landmark",lat:51.5014,lon:-0.1419},
        {name:"Tate Modern",location:"Bankside",type:"Museum",lat:51.5076,lon:-0.0994},
        {name:"Camden Market",location:"Camden Town",type:"Shopping",lat:51.5413,lon:-0.1421}
    ],
    "Rome": [
        {name:"Colosseum",location:"Piazza del Colosseo",type:"Landmark",lat:41.8902,lon:12.4922},
        {name:"Vatican Museums",location:"Vatican City",type:"Museum",lat:41.9065,lon:12.4536},
        {name:"Trevi Fountain",location:"Piazza di Trevi",type:"Landmark",lat:41.9009,lon:12.4833},
        {name:"Pantheon",location:"Piazza della Rotonda",type:"Landmark",lat:41.8986,lon:12.4768},
        {name:"Villa Borghese",location:"Rome",type:"Park",lat:41.9132,lon:12.4922}
    ],
    "Berlin": [
        {name:"Brandenburg Gate",location:"Pariser Platz",type:"Landmark",lat:52.5163,lon:13.3777},
        {name:"Pergamon Museum",location:"Museum Island",type:"Museum",lat:52.5211,lon:13.3969},
        {name:"Berlin Cathedral",location:"Museum Island",type:"Landmark",lat:52.5192,lon:13.4010},
        {name:"East Side Gallery",location:"Mühlenstraße",type:"Landmark",lat:52.5050,lon:13.4397},
        {name:"Tiergarten",location:"Berlin",type:"Park",lat:52.5145,lon:13.3501}
    ],
    "Barcelona": [
        {name:"Sagrada Familia",location:"Eixample",type:"Landmark",lat:41.4036,lon:2.1744},
        {name:"Park Güell",location:"Gràcia",type:"Park",lat:41.4145,lon:2.1527},
        {name:"Casa Batlló",location:"Passeig de Gràcia",type:"Landmark",lat:41.3917,lon:2.1649},
        {name:"Picasso Museum",location:"La Ribera",type:"Museum",lat:41.3853,lon:2.1800},
        {name:"La Rambla",location:"Ciutat Vella",type:"Street",lat:41.3809,lon:2.1734}
    ],

    // --- ASIA ---
    "Tokyo": [
        {name:"Tokyo Tower",location:"Minato",type:"Landmark",lat:35.6586,lon:139.7454},
        {name:"Shinjuku Gyoen",location:"Shinjuku",type:"Park",lat:35.6852,lon:139.7100},
        {name:"Meiji Shrine",location:"Shibuya",type:"Landmark",lat:35.6764,lon:139.6993},
        {name:"Akihabara",location:"Chiyoda",type:"District",lat:35.6984,lon:139.7730},
        {name:"Ueno Zoo",location:"Taito",type:"Attraction",lat:35.7157,lon:139.7722}
    ],
    "Bangkok": [
        {name:"Grand Palace",location:"Phra Nakhon",type:"Landmark",lat:13.7500,lon:100.4913},
        {name:"Wat Arun",location:"Thonburi",type:"Landmark",lat:13.7437,lon:100.4889},
        {name:"Chatuchak Market",location:"Chatuchak",type:"Market",lat:13.8007,lon:100.5525},
        {name:"Lumphini Park",location:"Pathum Wan",type:"Park",lat:13.7300,lon:100.5410},
        {name:"Jim Thompson House",location:"Pathum Wan",type:"Museum",lat:13.7514,lon:100.5284}
    ],
    "Singapore": [
        {name:"Marina Bay Sands",location:"Marina Bay",type:"Landmark",lat:1.2834,lon:103.8607},
        {name:"Gardens by the Bay",location:"Marina Bay",type:"Park",lat:1.2816,lon:103.8636},
        {name:"Sentosa Island",location:"Sentosa",type:"Landmark",lat:1.2494,lon:103.8303},
        {name:"Clarke Quay",location:"Singapore River",type:"Nightlife",lat:1.2893,lon:103.8464},
        {name:"Orchard Road",location:"Central",type:"Shopping",lat:1.3050,lon:103.8318}
    ],
    "Dubai": [
        {name:"Burj Khalifa",location:"Downtown",type:"Landmark",lat:25.1972,lon:55.2744},
        {name:"Palm Jumeirah",location:"Dubai",type:"Landmark",lat:25.1124,lon:55.1384},
        {name:"Dubai Mall",location:"Downtown",type:"Shopping",lat:25.1985,lon:55.2796},
        {name:"Jumeirah Beach",location:"Dubai",type:"Beach",lat:25.1410,lon:55.1850},
        {name:"Dubai Fountain",location:"Downtown",type:"Attraction",lat:25.1951,lon:55.2744}
    ],
    "Beijing": [
        {name:"Great Wall at Badaling",location:"Badaling",type:"Landmark",lat:40.3600,lon:116.0200},
        {name:"Forbidden City",location:"Dongcheng",type:"Landmark",lat:39.9163,lon:116.3972},
        {name:"Temple of Heaven",location:"Dongcheng",type:"Landmark",lat:39.8822,lon:116.4066},
        {name:"Tiananmen Square",location:"Dongcheng",type:"Landmark",lat:39.9050,lon:116.3914},
        {name:"Beihai Park",location:"Xicheng",type:"Park",lat:39.9255,lon:116.3895}
    ],
    "Istanbul": [
        {name:"Hagia Sophia",location:"Sultanahmet",type:"Landmark",lat:41.0086,lon:28.9802},
        {name:"Blue Mosque",location:"Sultanahmet",type:"Landmark",lat:41.0054,lon:28.9768},
        {name:"Topkapi Palace",location:"Sultanahmet",type:"Museum",lat:41.0115,lon:28.9837},
        {name:"Grand Bazaar",location:"Beyazit",type:"Market",lat:41.0106,lon:28.9680},
        {name:"Galata Tower",location:"Beyoglu",type:"Landmark",lat:41.0256,lon:28.9744},
        {name:"Istiklal Street",location:"Beyoglu",type:"Street",lat:41.0369,lon:28.9855}
    ],

    // --- AMERICAS ---
    "New York": [
        {name:"Statue of Liberty",location:"Liberty Island",type:"Landmark",lat:40.6892,lon:-74.0445},
        {name:"Central Park",location:"Manhattan",type:"Park",lat:40.7851,lon:-73.9683},
        {name:"Times Square",location:"Manhattan",type:"Landmark",lat:40.7580,lon:-73.9855},
        {name:"Metropolitan Museum of Art",location:"5th Ave",type:"Museum",lat:40.7794,lon:-73.9632},
        {name:"Brooklyn Bridge",location:"East River",type:"Landmark",lat:40.7061,lon:-73.9969}
    ],
    "Los Angeles": [
        {name:"Hollywood Sign",location:"Hollywood Hills",type:"Landmark",lat:34.1341,lon:-118.3217},
        {name:"Griffith Observatory",location:"Los Feliz",type:"Landmark",lat:34.1184,lon:-118.3004},
        {name:"Santa Monica Pier",location:"Santa Monica",type:"Landmark",lat:34.0094,lon:-118.4973},
        {name:"Getty Center",location:"Brentwood",type:"Museum",lat:34.0780,lon:-118.4741},
        {name:"Venice Beach",location:"Venice",type:"Beach",lat:33.9850,lon:-118.4695}
    ],
    "Toronto": [
        {name:"CN Tower",location:"Downtown",type:"Landmark",lat:43.6426,lon:-79.3871},
        {name:"High Park",location:"Toronto",type:"Park",lat:43.6465,lon:-79.4637},
        {name:"Royal Ontario Museum",location:"Downtown",type:"Museum",lat:43.6677,lon:-79.3948},
        {name:"Distillery District",location:"Toronto",type:"Landmark",lat:43.6503,lon:-79.3591},
        {name:"Toronto Islands",location:"Lake Ontario",type:"Park",lat:43.6205,lon:-79.3783}
    ],
    "Mexico City": [
        {name:"Zócalo",location:"Centro Histórico",type:"Landmark",lat:19.4326,lon:-99.1332},
        {name:"Chapultepec Park",location:"Miguel Hidalgo",type:"Park",lat:19.4204,lon:-99.1810},
        {name:"National Museum of Anthropology",location:"Chapultepec",type:"Museum",lat:19.4260,lon:-99.1860},
        {name:"Palacio de Bellas Artes",location:"Centro Histórico",type:"Landmark",lat:19.4352,lon:-99.1418},
        {name:"Frida Kahlo Museum",location:"Coyoacán",type:"Museum",lat:19.3558,lon:-99.1627}
    ],
    "Rio de Janeiro": [
        {name:"Christ the Redeemer",location:"Corcovado",type:"Landmark",lat:-22.9519,lon:-43.2105},
        {name:"Copacabana Beach",location:"Zona Sul",type:"Beach",lat:-22.9711,lon:-43.1822},
        {name:"Sugarloaf Mountain",location:"Urca",type:"Landmark",lat:-22.9486,lon:-43.1566},
        {name:"Ipanema Beach",location:"Rio de Janeiro",type:"Beach",lat:-22.9847,lon:-43.2048},
        {name:"Selarón Steps",location:"Santa Teresa",type:"Art",lat:-22.9162,lon:-43.1792}
    ],

    // --- AFRICA & OCEANIA ---
    "Cairo": [
        {name:"Pyramids of Giza",location:"Giza Plateau",type:"Landmark",lat:29.9792,lon:31.1342},
        {name:"Egyptian Museum",location:"Tahrir Square",type:"Museum",lat:30.0478,lon:31.2336},
        {name:"Khan el-Khalili Bazaar",location:"Cairo",type:"Market",lat:30.0477,lon:31.2622},
        {name:"Al-Azhar Park",location:"Cairo",type:"Park",lat:30.0439,lon:31.2670},
        {name:"Cairo Tower",location:"Zamalek",type:"Landmark",lat:30.0459,lon:31.2243}
    ],
    "Cape Town": [
        {name:"Table Mountain",location:"Cape Town",type:"Landmark",lat:-33.9628,lon:18.4098},
        {name:"V&A Waterfront",location:"Harbour",type:"Attraction",lat:-33.9070,lon:18.4204},
        {name:"Kirstenbosch Botanical Garden",location:"Newlands",type:"Park",lat:-33.9878,lon:18.4320},
        {name:"Boulders Beach",location:"Simon's Town",type:"Beach",lat:-34.1972,lon:18.4511},
        {name:"Cape Point",location:"Cape Peninsula",type:"Landmark",lat:-34.3573,lon:18.4977}
    ],
    "Sydney": [
        {name:"Sydney Opera House",location:"Bennelong Point",type:"Landmark",lat:-33.8568,lon:151.2153},
        {name:"Bondi Beach",location:"Bondi",type:"Beach",lat:-33.8915,lon:151.2767},
        {name:"Taronga Zoo",location:"Mosman",type:"Attraction",lat:-33.8431,lon:151.2410},
        {name:"Royal Botanic Garden",location:"Sydney",type:"Park",lat:-33.8642,lon:151.2166},
        {name:"Harbour Bridge",location:"Sydney Harbour",type:"Landmark",lat:-33.8523,lon:151.2108}
    ],
    "Moscow": [
        {name:"Red Square",location:"Central Moscow",type:"Landmark",lat:55.7539,lon:37.6208},
        {name:"Saint Basil's Cathedral",location:"Red Square",type:"Landmark",lat:55.7525,lon:37.6231},
        {name:"Bolshoi Theatre",location:"Teatralnaya Square",type:"Theatre",lat:55.7601,lon:37.6187},
        {name:"Gorky Park",location:"Krymsky Val",type:"Park",lat:55.7299,lon:37.6036},
        {name:"Kremlin",location:"Moscow",type:"Landmark",lat:55.7520,lon:37.6175}
    ]
};

const weatherMock = {
    "Paris": {city:"Paris",temperature:21,description:"Sunny",icon:"☀️"},
    "London": {city:"London",temperature:18,description:"Cloudy",icon:"☁️"},
    "Rome": {city:"Rome",temperature:25,description:"Sunny",icon:"☀️"},
    "Berlin": {city:"Berlin",temperature:20,description:"Rainy",icon:"🌧️"},
    "Barcelona": {city:"Barcelona",temperature:23,description:"Sunny",icon:"☀️"},
    "Tokyo": {city:"Tokyo",temperature:22,description:"Sunny",icon:"☀️"},
    "Bangkok": {city:"Bangkok",temperature:30,description:"Hot & Sunny",icon:"🌞"},
    "Singapore": {city:"Singapore",temperature:31,description:"Tropical Sun",icon:"🌴"},
    "Dubai": {city:"Dubai",temperature:35,description:"Scorching",icon:"🔥"},
    "Beijing": {city:"Beijing",temperature:18,description:"Cloudy",icon:"☁️"},
    "New York": {city:"New York",temperature:20,description:"Rainy",icon:"🌧️"},
    "Los Angeles": {city:"Los Angeles",temperature:25,description:"Sunny",icon:"☀️"},
    "Toronto": {city:"Toronto",temperature:19,description:"Cloudy",icon:"☁️"},
    "Mexico City": {city:"Mexico City",temperature:22,description:"Sunny",icon:"☀️"},
    "Sydney": {city:"Sydney",temperature:23,description:"Sunny",icon:"☀️"},
    "Rio de Janeiro": {city:"Rio de Janeiro",temperature:29,description:"Tropical sunshine",icon:"☀️"},
    "Cairo": {city:"Cairo",temperature:34,description:"Hot desert wind",icon:"🔥"},
    "Cape Town": {city:"Cape Town",temperature:19,description:"Windy with clear skies",icon:"🌧️"},
    "Moscow": {city:"Moscow",temperature:11,description:"Cold and cloudy",icon:"🌧️"}
};

export async function fetchDestinations(city) {
    return { destinations: destinationsMock[city] || [] };
}

export async function fetchWeather(city) {
    return weatherMock[city] || {error:"Weather data not available"};
}
