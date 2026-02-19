-- CreateTable
CREATE TABLE "CoffeeLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cafeName" TEXT,
    "coffeeType" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "notes" TEXT,
    "photoUrl" TEXT,
    "brewMethod" TEXT,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coffeeType" TEXT NOT NULL,
    "brewMethod" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "prepTimeMinutes" INTEGER NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "equipment" TEXT[],
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoffeeLog_userId_idx" ON "CoffeeLog"("userId");
