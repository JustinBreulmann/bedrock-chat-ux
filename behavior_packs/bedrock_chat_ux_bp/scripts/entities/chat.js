import {world, system } from "@minecraft/server";

import {chat} from "../core/chat"
import { exception } from "../exceptions/error";
	//sends updateted Message
	function sendMessageWithTag(player, tag, message) {
		player.sendMessage(`§b§l${tag} §8>> §r§7${message}`);
	}
	//handels chat
	world.beforeEvents.chatSend.subscribe((data) => {
		data.cancel = true;
		let player = data.sender;
	
		if (player.hasTag('mute')) {
			exception("PlayerMuted", player, "")
		} else {
			const tagList = [
				{ startValue: "@Feuerwehr", tag: "Feuerwehr" },
				{ startValue: "@Polizei", tag: "Polizei" },
				{ startValue: "@team", tag: "Team" },
				{ startValue: "@news", tag: "" },
				{ startValue: "@Server", tag: "" }
			];
	
			let messageHandled = false;
			for (const item of tagList) {
				if (data.message.startsWith(item.startValue)) {
					const tag = item.tag !== "" ? `${item.tag}` : "";
					const message = data.message.replace(item.startValue, ""); 
					
					for (const player of world.getAllPlayers()) {
						if (player.hasTag(item.tag)) {
							sendMessageWithTag(player, tag, message);
						}
					}
	
					if (tag === "") {
						for (const player of world.getAllPlayers()) {
							sendMessageWithTag(player, item.startValue.split("@")[1], message);
						}
					}
	
					data.cancel = true;
					messageHandled = true;
					break;
				}
			}
			if (!messageHandled) {
				chat(data);
			}
		}
	});	
