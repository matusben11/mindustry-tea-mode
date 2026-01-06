// Tea Mod - Ultra rýchle stavanie
// Verzia 2.0

// ========== ITEMS ==========
const teaOre = extend(Item, "tea-ore", {});
teaOre.color = Color.valueOf("6b8e23");
teaOre.hardness = 1;
teaOre.cost = 0.5;

const teaLeaves = extend(Item, "tea-leaves", {});
teaLeaves.color = Color.valueOf("90ee90");
teaLeaves.cost = 1.0;

const pressedTea = extend(Item, "pressed-tea", {});
pressedTea.color = Color.valueOf("556b2f");
pressedTea.cost = 1.5;

// ========== LIQUIDS ==========
const liquidTea = extend(Liquid, "liquid-tea", {});
liquidTea.color = Color.valueOf("daa520");
liquidTea.effect = StatusEffects.overclock;

const liquidBlackTea = extend(Liquid, "liquid-black-tea", {});
liquidBlackTea.color = Color.valueOf("8b4513");
liquidBlackTea.effect = StatusEffects.overdrive;

// ========== BLOCKS ==========
const teaOreBlock = extend(OreBlock, "tea-ore-block", {});
teaOreBlock.itemDrop = teaOre;

const teaPress = extend(GenericCrafter, "tea-press", {});
teaPress.size = 2;
teaPress.requirements = ItemStack.with(Items.copper, 50, Items.lead, 40, Items.graphite, 30);
teaPress.consumes.power(1.0);
teaPress.consumes.item(teaOre, 2);
teaPress.outputItem = new ItemStack(teaLeaves, 1);
teaPress.category = Category.crafting;

const teaSprayer = extend(LiquidBlock, "tea-sprayer", {
  update(tile) {
    this.super$update(tile);
    const entity = tile.ent();
    if(entity.liquids.total() < 0.001) return;
    const liquid = entity.liquids.current();
    
    Groups.player.each(player => {
      if(player.team() == tile.team && player.dst(tile) <= 80) {
        const unit = player.unit();
        if(liquid == liquidTea) {
          unit.buildSpeedMultiplier = 5.0;
        } else if(liquid == liquidBlackTea) {
          unit.buildSpeedMultiplier = 15.0;
        }
      }
    });
  }
});
teaSprayer.size = 2;
teaSprayer.requirements = ItemStack.with(Items.copper, 70, Items.titanium, 60);
teaSprayer.category = Category.effect;
