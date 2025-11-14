import {world, system } from "@minecraft/server";

import { getScore } from "../extensions/module/getScore";

export function setNameTag() {
    const players = world.getAllPlayers();
    players.forEach(player => {
        const health = player.getComponent("health");

        const tags = player.getTags();
        let ranks = tags.filter(tag => tag.startsWith('chatrank:')).map(tag => tag.replace('chatrank:', ''));
        let nickname = tags.filter(tag => tag.startsWith('nickname:')).map(tag => tag.replace('nickname:', ''));

        ranks = ranks.length ? ranks : ["§6Bürger"];
        nickname = nickname.length ? nickname : player.addTag("nickname:" + player.nameTag);

        const nametagPrefix = ranks.join(', ');

        // Clear existing name tag content before updating
        player.nameTag = '';
        const { days, hours, minutes, seconds } = getTotaltime(player, "totaltime");

        if (nametagPrefix.length > 0) {
            player.nameTag = `[${nametagPrefix}§f] §7§l${nickname}\n§r§o§pSpielzeit: §7${days}d ${hours}h ${minutes}m ${seconds}s\n§m${Math.round(health.currentValue)}`;
        } else {
            player.nameTag = `${nickname}\n§pSpielzeit: §7${days}d ${hours}h ${minutes}m ${seconds}s\n§c${Math.round(health.currentValue)}`;
        }
    }
)}        


export function getTotaltime(player, scoreboard) {
    const onlinetime = getScore(player, scoreboard);

    let days = 0, hours = 0, minutes = 0, seconds = 0;

    if (onlinetime >= 60) {
        seconds = Math.floor(onlinetime % 60);
        minutes = Math.floor(onlinetime / 60);

        if (minutes >= 60) {
            hours = Math.floor(minutes / 60);
            if (hours >= 24) {
                days = Math.floor(hours / 24);
                hours = hours % 24; // Update hours after calculating days
            }
            minutes = minutes % 60; // Update minutes after calculating hours
        }
    }
    return { days, hours, minutes, seconds };
}

