import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data to avoid duplicates on re-seed
  await prisma.recipeStep.deleteMany();
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

  // Seed timed brew steps for key recipes
  const allRecipes = await prisma.recipe.findMany();
  const recipeByName = (name: string) => allRecipes.find((r) => r.name === name);

  // Pour Over (V60) steps
  const pourOver = recipeByName("Pour Over (V60)");
  if (pourOver) {
    await prisma.recipeStep.createMany({
      data: [
        { recipeId: pourOver.id, order: 1, label: "Rinse Filter", description: "Place filter in V60 and rinse with hot water. Discard rinse water.", durationSec: 15 },
        { recipeId: pourOver.id, order: 2, label: "Add Grounds", description: "Add 15g of medium-fine grounds and create a small well in the center.", durationSec: 0 },
        { recipeId: pourOver.id, order: 3, label: "Bloom", description: "Pour 30g of water over the grounds in a circular motion.", durationSec: 10 },
        { recipeId: pourOver.id, order: 4, label: "Wait (Bloom)", description: "Let the coffee bloom and degas.", durationSec: 35 },
        { recipeId: pourOver.id, order: 5, label: "First Pour", description: "Slowly pour water in concentric circles up to 120g total.", durationSec: 30 },
        { recipeId: pourOver.id, order: 6, label: "Second Pour", description: "Continue pouring in circles up to 200g total.", durationSec: 30 },
        { recipeId: pourOver.id, order: 7, label: "Final Pour", description: "Pour remaining water up to 250g total.", durationSec: 20 },
        { recipeId: pourOver.id, order: 8, label: "Drawdown", description: "Wait for all water to drain through the grounds.", durationSec: 60 },
      ],
    });
  }

  // French Press steps
  const frenchPress = recipeByName("French Press");
  if (frenchPress) {
    await prisma.recipeStep.createMany({
      data: [
        { recipeId: frenchPress.id, order: 1, label: "Add Grounds", description: "Add 30g of coarsely ground coffee to the French press.", durationSec: 0 },
        { recipeId: frenchPress.id, order: 2, label: "Pour Water", description: "Pour 500ml of hot water over the grounds.", durationSec: 15 },
        { recipeId: frenchPress.id, order: 3, label: "Stir", description: "Give a gentle stir to ensure all grounds are wet.", durationSec: 5 },
        { recipeId: frenchPress.id, order: 4, label: "Steep", description: "Place lid on (don't press) and let it steep.", durationSec: 240 },
        { recipeId: frenchPress.id, order: 5, label: "Press & Pour", description: "Press the plunger down slowly and pour immediately.", durationSec: 0 },
      ],
    });
  }

  // Aeropress steps
  const aeropress = recipeByName("Aeropress Classic");
  if (aeropress) {
    await prisma.recipeStep.createMany({
      data: [
        { recipeId: aeropress.id, order: 1, label: "Prep Filter", description: "Place paper filter in cap and rinse with hot water.", durationSec: 10 },
        { recipeId: aeropress.id, order: 2, label: "Add Grounds", description: "Assemble Aeropress on your mug and add 15g of grounds.", durationSec: 0 },
        { recipeId: aeropress.id, order: 3, label: "Pour & Stir", description: "Pour 200g of water and stir 3 times.", durationSec: 10 },
        { recipeId: aeropress.id, order: 4, label: "Steep", description: "Insert plunger to create a seal and wait.", durationSec: 60 },
        { recipeId: aeropress.id, order: 5, label: "Press", description: "Press down slowly and steadily.", durationSec: 25 },
      ],
    });
  }

  // Cold Brew steps
  const coldBrew = recipeByName("Cold Brew Concentrate");
  if (coldBrew) {
    await prisma.recipeStep.createMany({
      data: [
        { recipeId: coldBrew.id, order: 1, label: "Combine", description: "Add 100g coarse grounds and 750ml cold water to a jar.", durationSec: 0 },
        { recipeId: coldBrew.id, order: 2, label: "Stir", description: "Stir to ensure all grounds are saturated.", durationSec: 15 },
        { recipeId: coldBrew.id, order: 3, label: "Refrigerate", description: "Cover and refrigerate for 12-24 hours. (Timer shows minimum time reminder.)", durationSec: 30 },
        { recipeId: coldBrew.id, order: 4, label: "Strain", description: "Strain through a fine mesh sieve or cheesecloth.", durationSec: 0 },
      ],
    });
  }

  // Classic Espresso steps
  const espresso = recipeByName("Classic Espresso");
  if (espresso) {
    await prisma.recipeStep.createMany({
      data: [
        { recipeId: espresso.id, order: 1, label: "Grind", description: "Grind 18g of beans to a fine consistency (like table salt).", durationSec: 0 },
        { recipeId: espresso.id, order: 2, label: "Distribute & Tamp", description: "Distribute grounds evenly and tamp with ~30 lbs of pressure.", durationSec: 0 },
        { recipeId: espresso.id, order: 3, label: "Extract", description: "Lock portafilter and start extraction.", durationSec: 28 },
      ],
    });
  }

  // Moka Pot steps
  const mokaPot = recipeByName("Moka Pot Espresso");
  if (mokaPot) {
    await prisma.recipeStep.createMany({
      data: [
        { recipeId: mokaPot.id, order: 1, label: "Fill Water", description: "Fill bottom chamber with hot water up to the safety valve.", durationSec: 0 },
        { recipeId: mokaPot.id, order: 2, label: "Add Grounds", description: "Fill the filter basket with grounds, level but don't tamp.", durationSec: 0 },
        { recipeId: mokaPot.id, order: 3, label: "Assemble & Heat", description: "Assemble and place on medium heat.", durationSec: 0 },
        { recipeId: mokaPot.id, order: 4, label: "Brew", description: "Wait for coffee to flow into the top chamber. Reduce heat when flowing.", durationSec: 180 },
        { recipeId: mokaPot.id, order: 5, label: "Remove & Serve", description: "Remove from heat when you hear hissing. Serve immediately.", durationSec: 0 },
      ],
    });
  }

  const stepCount = await prisma.recipeStep.count();
  console.log(`✅ Seeded ${stepCount} recipe steps successfully!`);
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
