import {world,Player,ItemStack,system,ItemTypes} from "@minecraft/server"
import {ActionFormData,MessageFormData,ModalFormData,ActionFormResponse,MessageFormResponse,ModalFormResponse} from "@minecraft/server-ui";
import { Farben } from "../extensions/config";
import { exception } from "../exceptions/error";
/**
 * @param {BeforeChatEvent} data 
 * @returns 
 */

export function chat(data) {
    let jobs = ["Feuerwehr", "Markler", "Polizei", "Stadtwerke", "Bänker"];

    const tags = data.sender.getTags();
    const players = world.getAllPlayers();
    if(data.message.startsWith(".")) {
        if(data.message.replace(".","") === "tags"){
            data.sender.sendMessage(`§g§lServer §e>> §r§7 ${data.sender.getTags()}`)
        }
    }

    let ranks = tags.filter(tag => tag.startsWith('chatrank:')).map(tag => tag.replace('chatrank:', ''));
    let namecolor = tags.filter(tag => tag.startsWith('namecolor:')).map(tag => tag.replace('namecolor:', ''));
    let nickname = tags.filter(tag => tag.startsWith('nickname:')).map(tag => tag.replace('nickname:', ''));
    ranks = ranks.length ? ranks : ["§6Bürger"];
    namecolor = namecolor.length ? namecolor : ["§7"];
    nickname = nickname.length ? nickname : [`${data.sender.nameTag}`];

    const text = `§l§f[§r${ranks}§r§l§f]§r ${namecolor}${nickname} §l§7>>§r §f${data.message}`;

    if (data.sender.hasTag("chat:default")) {
        world.sendMessage(String(text))
    }

    if (data.sender.hasTag("chat:job")) {
        const jobTags = tags.filter(tag => jobs.includes(tag));
        if (jobTags.length > 0) {
            const jobTag = jobTags[0];
            const players = world.getAllPlayers()

            players.forEach(player => {
                if(player.hasTag(jobTag)) {
                    player.sendMessage(`[${jobTag}] ${namecolor}${nickname} §l§7>>§r §f${data.message}`)
                }
            }
        )
        }
    }
      if (data.sender.hasTag("chat:group")) {
        const jobTags = tags.filter(tag => jobs.includes(tag));
        if (jobTags.length > 0) {
            const jobTag = jobTags[0];
            world.getAllPlayers()

            players.forEach(player => {
                if(player.hasTag(jobTag)) {
                    player.sendMessage(`[${jobTag}] ${namecolor}${nickname} §l§7>>§r §f${data.message}`)
                }
            }
        )}
    }

    data.cancel = true;
}


export function Nametag(player, selectedplayer) {

    let form = new ModalFormData();
    const tags = selectedplayer.getTags();

    let colorValues = Object.keys(Farben);
    let colorLabels = Object.values(Farben);

    let ranks = tags.find(tag => tag.startsWith('chatrank:'));
    let namecolor = tags.find(tag => tag.startsWith('namecolor:'));
    let nickname = tags.find(tag => tag.startsWith('nickname:'));

    form.title(`Verwaltung - Nick`);
    form.dropdown("Farbe", colorLabels);
    form.textField("Rank", "Schreibe hier");
    form.textField("Name", "Schreibe hier");

    form.show(player).then((response) => {
        if (response.canceled) {
            return;
        }

        if (!selectedplayer) {
            exception("playerNotFound", player, selectedplayer)
            return;
        }

        // Check if the tag arrays have values before attempting to remove
        if (ranks) {
            selectedplayer.removeTag(ranks);
        }
        if (namecolor) {
            selectedplayer.removeTag(namecolor);
        }
        if (nickname) {
            selectedplayer.removeTag(nickname);
        }

        selectedplayer.addTag(`chatrank:${response.formValues[1]}`);
        selectedplayer.addTag(`namecolor:${colorValues[response.formValues[0]]}`);
        selectedplayer.addTag(`nickname:${response.formValues[2]}`);

    });
}
