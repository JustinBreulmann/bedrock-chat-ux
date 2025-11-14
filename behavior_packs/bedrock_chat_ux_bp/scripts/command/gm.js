import {
  system,
  world,
  CommandPermissionLevel,
  CustomCommandParamType,
  CustomCommandStatus,
  GameMode
} from "@minecraft/server";

system.beforeEvents.startup.subscribe((init) => {

  const gmCmd = {
    name: "system:gm",
    description: "faster way to change gamemode",
    permissionLevel: CommandPermissionLevel.Admin,
    cheatsRequired: true,
    mandatoryParameters: [
      {
        type: CustomCommandParamType.Integer,
        name: "mode"
      },
    ]
  };

  init.customCommandRegistry.registerCommand(gmCmd, gmHandler);
});

function gmHandler(origin, gamemode) {
    try {
        const player = origin.source;
        if (!player) {
            world.sendMessage("spieler nicht gefunden");
            return { status: CustomCommandStatus.Failed };
        }

        if (gamemode === null || gamemode === undefined) {
            world.sendMessage("Ungültiger Gamemode-Parameter");
            return { status: CustomCommandStatus.Failed };
        }

        let mode;
        switch (gamemode) {
            case 0:
                mode = GameMode.survival;
                break;
            case 1:
                mode = GameMode.creative;
                break;
            case 2:
                mode = GameMode.adventure;
                break;
            case 3:
                mode = GameMode.spectator;
                break;
            default:
                world.sendMessage("Ungültiger Gamemode (0-3 erlaubt)");
                return { status: CustomCommandStatus.Failed };
        }

        player.setGameMode(mode);
        return { status: CustomCommandStatus.Success };
        
    } catch (error) {
        console.warn("Gamemode change failed:", error);
        return { status: CustomCommandStatus.Failed };
    }
}