const products = [
  // Basketball
  {
    id: 1,
    category: "basketball",
    image: require("../assets/product/product/basket1.png"),
    name: "Nike Lebron XXI",
    description:
      "The Nike LeBron XXI is a premium basketball shoe designed for power and precision. It features a lightweight, breathable upper, Zoom Air cushioning for impact absorption, and a durable outsole for superior grip. Built for dynamic play, it enhances speed and control.",
    price: 225,
  },
  {
    id: 2,
    category: "basketball",
    image: require("../assets/product/product/basket2.png"),
    name: "Nike Kyrie 5 Low",
    description:
      "The Nike Kyrie 5 Low is a lightweight basketball shoe with breathable materials, Zoom Air cushioning for impact protection, and a durable rubber outsole for superior traction. Designed for agility and speed, it ensures quick cuts and smooth movements on the court.",
    price: 130,
  },
  {
    id: 3,
    category: "basketball",
    image: require("../assets/product/product/basket3.png"),
    name: "Nike KD 17",
    description:
      "The Nike KD 17 is the latest basketball shoe from Kevin Durant’s signature line, designed to deliver top-tier performance on the court. Combining advanced technology with a sleek design, this shoe ensures maximum comfort, responsiveness, and stability for players.",
    price: 180,
  },
  {
    id: 4,
    category: "basketball",
    image: require("../assets/product/product/basket4.png"),
    name: "Nike Gianis Immortality 3",
    description:
      "The Nike Giannis Immortality 3 is a high-performance basketball shoe designed for players who demand speed, agility, and comfort on the court. Inspired by Giannis Antetokounmpo's relentless energy and dynamic playing style, this sneaker delivers exceptional responsiveness and support.",
    price: 90,
  },

  // sneakers
  {
    id: 5,
    category: "sneakers",
    image: require("../assets/product/product/id 5.png"),
    name: "Nike Air Monacrh IV",
    description:
      "The Nike Air Monarch IV is a classic training shoe featuring a durable leather upper for support, full-length Air cushioning for comfort, and a solid rubber outsole for traction. Designed for all-day wear, it provides stability and reliability for various activities.",
    price: 75,
  },
  {
    id: 6,
    category: "sneakers",
    image: require("../assets/product/product/id 6.png"),
    name: "Nike Air Barrage",
    description:
      "The Nike Air Barrage is a bold, retro-style sneaker featuring a durable leather and mesh upper, full-length Air cushioning for comfort, and a distinctive chunky outsole with aggressive traction. Its iconic 'AIR' branding and secure fit make it perfect for both sports and streetwear.",
    price: 160,
  },
  {
    id: 7,
    category: "sneakers",
    image: require("../assets/product/product/id 7.png"),
    name: "Nike Air Jordan IV",
    description:
      "The Nike Air Jordan IV is a legendary basketball shoe featuring a premium leather and mesh upper for durability and breathability. It includes visible Air cushioning for comfort, a supportive midsole, and a herringbone outsole for traction. Its timeless design blends performance with street style.",
    price: 225,
  },
  {
    id: 8,
    category: "sneakers",
    image: require("../assets/product/product/id 8.png"),
    name: "Nike Air Flight 89",
    description:
      "The Nike Air Flight 89 is a classic basketball sneaker featuring a premium leather upper for durability, Air cushioning for superior comfort, and a sturdy rubber outsole for traction. With its retro design and supportive fit, it blends performance with timeless street style.",
    price: 140,
  },

  // running
  {
    id: 9,
    category: "running",
    image: require("../assets/product/product/running1.png"),
    name: "Nike Air Zoom Pegasus 40",
    description:
      "The Nike Air Zoom Pegasus 40 is a versatile running shoe designed for comfort and speed. It features responsive Zoom Air cushioning, a breathable mesh upper, and a durable rubber outsole for traction. Perfect for daily runs, it offers a smooth and stable ride.",
    price: 150,
  },
  {
    id: 10,
    category: "running",
    image: require("../assets/product/product/running2.png"),
    name: "Adidas Terrex",
    description:
      "The Adidas Terrex is a high-performance outdoor shoe designed for trail running, hiking, and rugged adventures. Featuring a durable, breathable upper, responsive cushioning, and a grippy Continental™ Rubber outsole, it provides excellent traction, stability, and comfort on any terrain.",
    price: 200,
  },
  {
    id: 11,
    category: "running",
    image: require("../assets/product/product/running3.png"),
    name: "Adidas Adizero Adios Pro",
    description:
      "The Adidas Adizero Adios Pro 3 is an elite racing shoe designed for speed and endurance. It features EnergyRods for propulsion, Lightstrike Pro cushioning for responsiveness, and a lightweight mesh upper for breathability. Built for marathon runners, it delivers maximum efficiency and performance.",
    price: 250,
  },
  {
    id: 12,
    category: "running",
    image: require("../assets/product/product/running4.png"),
    name: "Nike Air VaporMax Plus ",
    description:
      "The Nike Air VaporMax Plus combines futuristic design with superior comfort. Featuring a lightweight neoprene upper, Tuned Air-inspired overlays, and full-length VaporMax cushioning, it delivers a smooth, bouncy ride. Its durable rubber outsole ensures traction, making it perfect for style and performance.",
    price: 225,
  },

  // Casual
  {
    id: 13,
    category: "casual",
    image: require("../assets/product/product/casual3.png"),
    name: "Converse Run Star",
    description:
      "The Converse Run Star is a bold, modern take on the classic Converse silhouette. Featuring a chunky platform sole, durable canvas upper, and jagged rubber outsole for traction, it blends street style with comfort, making it a standout choice for everyday wear.",
    price: 110,
  },
  {
    id: 14,
    category: "casual",
    image: require("../assets/product/product/casual2.png"),
    name: "Nike Dunk Low Retro SE",
    description:
      "The Nike Dunk Low Retro SE is a stylish sneaker with a classic low-top design. It features a premium leather upper for durability, soft cushioning for comfort, and a rubber outsole with a pivot-circle pattern for traction. Perfect for both casual wear and street style.",
    price: 130,
  },
  {
    id: 15,
    category: "casual",
    image: require("../assets/product/product/casual1.png"),
    name: "Adidas Samba",
    description:
      "The Adidas Samba is a timeless sneaker with a premium leather upper, suede overlays, and a durable gum rubber outsole for excellent grip. Originally designed for indoor soccer, its sleek, low-profile design and comfort make it a staple in street style and casual wear.",
    price: 100,
  },
  {
    id: 16,
    category: "casual",
    image: require("../assets/product/product/casual4.png"),
    name: "Vans Sk8 Hi",
    description:
      "The Vans Sk8-Hi is a classic high-top sneaker featuring a durable canvas and suede upper, padded ankle support, and the signature waffle outsole for superior grip. Originally designed for skateboarding, its timeless style and comfort make it perfect for everyday wear.",
    price: 85,
  },
];

export default products;
