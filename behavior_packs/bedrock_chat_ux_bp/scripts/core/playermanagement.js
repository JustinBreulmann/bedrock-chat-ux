import {world,Player,ItemStack,system,ItemTypes} from "@minecraft/server"
import {ActionFormData,MessageFormData,ModalFormData,ActionFormResponse,MessageFormResponse,ModalFormResponse} from "@minecraft/server-ui";

import { Nametag } from "../core/chat";
import {ManageMoney} from "../gameplay/job/bank/ManageMoney"
import { Updatenightvision, vanish} from "../gameplay/worldedit/quicktools"
import { Admin } from "../gameplay/smartphone/menu/admin";

export function playerlist(player) {
    const players = world.getAllPlayers();
    let onlinePlayersCount = 0;
    let functions = [];

    let actionForm = new ActionFormData().title("Spielerliste Online");
    
    players.forEach(selectedplayer => {
        onlinePlayersCount++; 
        let message = "";
        const tags = selectedplayer.getTags();
        let ranks = tags.filter(tag => tag.startsWith('chatrank:')).map(tag => tag.replace('chatrank:', ''));
        let nickname = tags.filter(tag => tag.startsWith('nickname:')).map(tag => tag.replace('nickname:', ''));

        ranks = ranks.length ? ranks : ["§6Bürger"];
    
        if (nickname.length > 0) {
            message = `(${nickname})`;
        }

        actionForm.button(selectedplayer.name + message + `\n [${ranks}§r]`, "textures/ui/icon_deals.png");
        functions.push(r => playersetting(player, selectedplayer));
    });

    actionForm.body(`Hier ist eine Liste von allen Spielern, die derzeit online sind: §a${onlinePlayersCount}`); 

    actionForm.button("§c§lZurück")
    functions.push(r => {
        Admin(player)
    });

    actionForm.show(player).then(r => {
        if (r.canceled) return;
        functions[r.selection]();
    });
}



function playersetting(player, selectedplayer)  {
	let functions = []
    let actionForm = new ActionFormData()
    actionForm.title(`Wegpunkte`)
	actionForm.body("selectedplayer.information()")
		 {
	 	actionForm.button("§l§8Nachtsicht§r\nEffekt", "textures/ui/night_vision_effect.png")
	 	functions.push(r => {
	 		Updatenightvision(selectedplayer)
	 	})
	 }
	 {
	 	actionForm.button("§l§8Vanish§r\nEffekt", "textures/ui/invisibility_effect.png")
	 	functions.push(r => {
	 		vanish(selectedplayer)
	 	})
	 }
	 {
	 	actionForm.button("§l§8Nick§r\nSpielername", "textures/ui/icon_steve")
	 	functions.push(r => {
	 		Nametag(player, selectedplayer)
	 	})
	 }
	 {
	 	actionForm.button("§l§8Coins§r\nGeldstand anpassen", "textures/ui/MCoin")
	 	functions.push(r => {
	 		ManageMoney(player, selectedplayer)
	 	})
	 }	
	 {
		actionForm.button("§l§8Vanish§r\nEffekt", "textures/ui/invisibility_effect.png")
		functions.push(r => {
			setGamemode(player, selectedplayer)
		})
	}	
	actionForm.show(player).then(r => {
		if(r.canceled) return 
		functions[r.selection]()
	})
}