
import {world, system } from "@minecraft/server";
import {setup} from "../core/setup"
import {jobs1} from "../extensions/config"
import {mechanic, sell} from "./car/mechanic"
import {dispatch} from "../gameplay/job/dispatch/setting"
//leaving Server

world.beforeEvents.playerLeave.subscribe((leave) => {
    const player = leave.player;
    const players = world.getAllPlayers();
    const jobsToExcludeFromOffduty = ["Feuerwehr", "Stadtwerke", "Polizei", "Markler", "Bänker"];

    jobsToExcludeFromOffduty.forEach((job) => {
        if (player.hasTag(job) && players.filter(p => p.hasTag(job)).length < 1) {
            system.run(() => {
                const offDutyMessage = `${job} §a befindet sich nun nicht mehr im Dienst`;
                world.sendMessage(offDutyMessage);
            });
        }
    });
});

//joining Server

world.afterEvents.playerSpawn.subscribe((join) => {
    const player = join.player;
    const players = world.getAllPlayers()
    const jobTags = player.getTags();

    player.sendMessage("player.status.message")

    const matchingJobTags = jobTags.filter(tag => Object.keys(jobs1).includes(tag));
    if (matchingJobTags.length > 0 && players.name !== join.player.name) {
        const jobTag = matchingJobTags[0];
        const jobColor = jobs1[jobTag];
        const jobTitle = jobTag.charAt(0).toUpperCase() + jobTag.slice(1);

    }
//setup for first join
    if (!player.hasTag("setup")) {
        player.addTag("chat:default")
        player.sendMessage("tutorial.message")
        setup(player)
    }
//Moderator is a unique job, resets after leaving the server
    if (player.hasTag("Moderator")) {
        const moderators = world.getPlayers().filter(p => p.hasTag("Moderator"));
        if (moderators.length > 1) {
            player.removeTag("Moderator");
            player.sendMessage(`§l§4Channel§74 §8>> §r§7Dein Moderatorstatus wurde aufgrund zuvieler Moderatoren widerrufen`);
        }
    }

    const jobs = player.getTags();
    const activeJobs = jobs.filter(tag => tag !== "Moderator" && !tag.startsWith("offduty:"));
    const jobsToExcludeFromOffduty = ["Feuerwehr", "Stadtwerke", "Polizei", "Markler", "Bänker"];
//tests wheather the player has more than one active job
    if (activeJobs.length > 1) {
        activeJobs.forEach(tag => {
            if (jobsToExcludeFromOffduty.includes(tag)) {
                    player.removeTag(tag);
                    player.addTag(`offduty:${tag}`);
                    player.sendMessage("§f§cJob§fcenter §8>> §7Du hast das Spiel verlassen und wurdest damit von den Jobs abgemeldet.");
            }
            //tests the chat, players used to communicate
            const chatTagsToRemove = player.getTags().filter(tag => tag.startsWith("chat:"));
            chatTagsToRemove.forEach(tag => {
                player.removeTag(tag);
                player.addTag("chat:default")
            });
        });
    }
    const prefixesToRemove = ["x:", "y:", "z:", "pos1,", "pos2","nightvison","vanish", "drown"];
    prefixesToRemove.forEach(prefix => {
        const tags = player.getTags().filter(tag => tag.startsWith(prefix));
        tags.forEach(tag => {
            player.removeTag(tag);
        });
    });
});
//translation for tags
const tagActions = {
    mechanic: mechanic,
    sell: sell,
};

system.runInterval(processPlayers, 20);

function processPlayers() {
    for (let player of world.getPlayers()) {
        for (let tag in tagActions) {
            if (player.hasTag(tag)) {
                tagActions[tag](player);
                removeTag(player, tag);
            }
        }
    }
}

function removeTag(player, tag) {
    player.removeTag(tag);
}
