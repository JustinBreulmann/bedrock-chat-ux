tp @p[r=5,m=c,tag=Bürgermeister] -140 69 -36
tellraw @p[r=5,m=c,tag=Bürgermeister] {"rawtext":[{"text":"§bDu wurdest zur §3Innenstadt §bteleportiert"}]}
tellraw @p[tag=Bürgermeister,r=5,m=s] {"rawtext":[{"text":" §cDu kannst diesen Befehl nur im §4Baumodus §cnutzen"}]}
tellraw @p[tag=!Bürgermeister,r=5] {"rawtext":[{"text":" §cDu kannst diesen Befehl nur als §4Bürgermeister §cnutzen"}]}

