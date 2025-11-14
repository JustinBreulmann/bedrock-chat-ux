#we
execute at @e[type=snowball] run fill ~30 66 ~30 ~ 55 ~grass [] replace air
execute at @e[type=snowball] run fill ~30 66 ~30 ~ 55 ~grass [] replace tallgrass
execute at @e[type=snowball] run fill ~30 66 ~30 ~ 55 ~grass [] replace double_plant
execute at @e[type=snowball] run fill ~30 66 ~30 ~ 55 ~grass [] replace leaves
execute at @e[type=snowball] run fill ~30 66 ~30 ~ 55 ~grass [] replace vine

execute at @a[tag=drown] run fill ~15 ~15 ~15 ~-15 ~-15 ~-15 air [] replace sponge
execute at @a[tag=drown] run fill ~15 ~15 ~15 ~-15 ~-15 ~-15 sponge [] replace water
execute at @a run fill ~15 ~15 ~15 ~-15 ~-15 ~-15 air [] replace sponge
#kelp