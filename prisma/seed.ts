import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing recipes to avoid duplicates on re-seed
  await prisma.recipe.deleteMany();

  await prisma.recipe.createMany({
    data: [
      {
        name: "Classic Espresso",
        description:
          "A rich, concentrated coffee shot; the foundation of most cafe drinks.",
        coffeeType: "Espresso",
        brewMethod: "Espresso Machine",
        difficulty: "Medium",
        prepTimeMinutes: 5,
        ingredients: ["18g finely ground coffee beans", "36g water (200°F)"],
        instructions: [
          "Grind beans to a fine consistency (like table salt)",
          "Distribute grounds evenly in the portafilter",
          "Tamp evenly with about 30 lbs of pressure",
          "Lock portafilter into the machine",
          "Extract for 25-30 seconds until you get about 36g of liquid",
        ],
        equipment: ["Espresso machine", "Burr grinder", "Tamper", "Scale"],
      },
      {
        name: "Cortado",
        description:
          "Equal parts espresso and steamed milk; smooth, balanced, and not too milky.",
        coffeeType: "Cortado",
        brewMethod: "Espresso Machine",
        difficulty: "Medium",
        prepTimeMinutes: 7,
        ingredients: [
          "18g finely ground coffee beans",
          "60ml whole milk (or oat milk)",
        ],
        instructions: [
          "Pull a double espresso shot (25-30 seconds, ~36g output)",
          "Steam milk to about 140°F with minimal foam",
          "Pour equal parts steamed milk over the espresso",
          "Serve in a small 4oz glass",
        ],
        equipment: [
          "Espresso machine with steam wand",
          "Burr grinder",
          "Small glass or cup (4oz)",
        ],
      },
      {
        name: "Oat Milk Latte",
        description:
          "A creamy, slightly sweet latte using oat milk; cafe favorite made at home.",
        coffeeType: "Latte",
        brewMethod: "Espresso Machine",
        difficulty: "Medium",
        prepTimeMinutes: 8,
        ingredients: [
          "18g finely ground coffee beans",
          "180ml oat milk (barista edition works best)",
        ],
        instructions: [
          "Pull a double espresso shot",
          "Steam oat milk to 140-150°F (oat milk scorches easily, don't overheat)",
          "Pour steamed milk over espresso, holding back foam with a spoon",
          "Finish by spooning a thin layer of microfoam on top",
        ],
        equipment: [
          "Espresso machine with steam wand",
          "Burr grinder",
          "12oz cup",
        ],
      },
      {
        name: "Pour Over (V60)",
        description:
          "Clean, bright, and nuanced; the pour over highlights a coffee's unique flavors.",
        coffeeType: "Pour Over",
        brewMethod: "Pour Over",
        difficulty: "Medium",
        prepTimeMinutes: 6,
        ingredients: [
          "15g medium-fine ground coffee",
          "250g water (200-205°F)",
          "V60 paper filter",
        ],
        instructions: [
          "Place filter in V60 and rinse with hot water (discard rinse water)",
          "Add grounds and create a small well in the center",
          "Bloom: pour 30g of water, wait 30-45 seconds",
          "Pour remaining water in slow, concentric circles over 2-3 minutes",
          "Total brew time should be around 3:00-3:30",
        ],
        equipment: [
          "Hario V60 dripper",
          "V60 paper filters",
          "Gooseneck kettle",
          "Burr grinder",
          "Scale",
          "Timer",
        ],
      },
      {
        name: "French Press",
        description:
          "Full-bodied and rich; the easiest way to make great coffee at home.",
        coffeeType: "French Press",
        brewMethod: "French Press",
        difficulty: "Easy",
        prepTimeMinutes: 8,
        ingredients: [
          "30g coarsely ground coffee",
          "500ml water (200°F)",
        ],
        instructions: [
          "Add coarse grounds to the French press",
          "Pour hot water over grounds and stir gently",
          "Place the lid on (don't press yet) and steep for 4 minutes",
          "Press the plunger down slowly and steadily",
          "Pour immediately to avoid over-extraction",
        ],
        equipment: ["French press", "Burr grinder", "Kettle", "Timer"],
      },
      {
        name: "Cold Brew Concentrate",
        description:
          "Smooth, low-acid, and refreshing; make a batch that lasts all week.",
        coffeeType: "Cold Brew",
        brewMethod: "Cold Brew",
        difficulty: "Easy",
        prepTimeMinutes: 5,
        ingredients: [
          "100g coarsely ground coffee",
          "750ml cold filtered water",
        ],
        instructions: [
          "Combine coarse grounds and cold water in a jar or pitcher",
          "Stir to ensure all grounds are wet",
          "Cover and refrigerate for 12-24 hours",
          "Strain through a fine mesh sieve or cheesecloth",
          "Dilute concentrate 1:1 with water or milk when serving",
          "Keeps in the fridge for up to 2 weeks",
        ],
        equipment: [
          "Large jar or pitcher",
          "Fine mesh sieve or cheesecloth",
          "Burr grinder",
        ],
      },
      {
        name: "Aeropress Classic",
        description:
          "Versatile and forgiving; makes a clean, espresso-like cup anywhere.",
        coffeeType: "Aeropress",
        brewMethod: "Aeropress",
        difficulty: "Easy",
        prepTimeMinutes: 5,
        ingredients: [
          "15g medium-fine ground coffee",
          "200g water (185°F)",
          "Aeropress paper filter",
        ],
        instructions: [
          "Place paper filter in cap and rinse with hot water",
          "Assemble Aeropress on your mug in standard position",
          "Add grounds and pour water, stir 3 times",
          "Insert plunger and wait 1 minute",
          "Press down slowly for 20-30 seconds",
        ],
        equipment: [
          "Aeropress",
          "Aeropress filters",
          "Burr grinder",
          "Kettle",
          "Scale",
        ],
      },
      {
        name: "Cappuccino",
        description:
          "Equal thirds of espresso, steamed milk, and foam; classic Italian morning drink.",
        coffeeType: "Cappuccino",
        brewMethod: "Espresso Machine",
        difficulty: "Medium",
        prepTimeMinutes: 7,
        ingredients: [
          "18g finely ground coffee beans",
          "120ml whole milk",
        ],
        instructions: [
          "Pull a double espresso shot into a 6oz cup",
          "Steam milk to 140-150°F with plenty of thick, velvety foam",
          "Pour steamed milk, aiming for 1/3 espresso, 1/3 milk, 1/3 foam",
          "Optionally dust with cocoa powder",
        ],
        equipment: [
          "Espresso machine with steam wand",
          "Burr grinder",
          "6oz cappuccino cup",
        ],
      },
      {
        name: "Iced Americano",
        description:
          "Bold espresso diluted with cold water and ice; crisp and refreshing.",
        coffeeType: "Americano",
        brewMethod: "Espresso Machine",
        difficulty: "Easy",
        prepTimeMinutes: 5,
        ingredients: [
          "18g finely ground coffee beans",
          "150ml cold water",
          "Ice cubes",
        ],
        instructions: [
          "Fill a tall glass with ice",
          "Pull a double espresso shot",
          "Pour cold water over the ice",
          "Pour espresso over the iced water",
          "Stir and enjoy",
        ],
        equipment: ["Espresso machine", "Burr grinder", "Tall glass"],
      },
      {
        name: "Moka Pot Espresso",
        description:
          "Strong, stovetop espresso-style coffee; no machine needed.",
        coffeeType: "Espresso",
        brewMethod: "Moka Pot",
        difficulty: "Easy",
        prepTimeMinutes: 8,
        ingredients: [
          "20g medium-fine ground coffee",
          "Water (fill to the valve in the bottom chamber)",
        ],
        instructions: [
          "Fill the bottom chamber with hot water up to the safety valve",
          "Fill the filter basket with grounds, level but don't tamp",
          "Assemble the Moka pot and place on medium heat",
          "When coffee starts flowing into the top, reduce heat",
          "Remove from heat when you hear a hissing/bubbling sound",
          "Serve immediately",
        ],
        equipment: ["Moka pot", "Burr grinder", "Stovetop"],
      },
    ],
  });

  const count = await prisma.recipe.count();
  console.log(`✅ Seeded ${count} recipes successfully!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
