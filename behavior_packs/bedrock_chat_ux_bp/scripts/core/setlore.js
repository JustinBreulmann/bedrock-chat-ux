import {world,Player,ItemStack,system,ItemTypes} from "@minecraft/server"
import {ModalFormData} from "@minecraft/server-ui";

export function setLore(player) {
	let form = new ModalFormData();

	let {container} = player.getComponent("minecraft:inventory")
	let Item = container.getItem(player.selectedSlot)

	form.title(`Items`);
	form.textField("§l      --------------------                  §f§rBeschrifte Items \n§l      --------------------      §8§lName", "Schreibe hier");
	form.textField("§8§lSignieren", "Schreibe hier");
	form.show(player).then((response) => {
	  if (response.canceled) return;

	  const nameTagValue = response.formValues[0];
	  const loreValue = response.formValues[1];


	  if (nameTagValue !== '') {
		Item.nameTag = response.formValues[0].replace(/-n/g,`\n`);
	  }
	  if (typeof loreValue === 'string' && loreValue !== '') {
		Item.setLore([loreValue.replace(/-n/g,`\n`)]);
		container.setItem(player.selectedSlot,Item);
	  }
	});
  }
  
  