import { world } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';

export async function floatingTextMenu(viewer) {
    const ui = new ActionFormData();
    ui.title('Text Menu');
    ui.button('Erstelle Floating Text', 'textures/ui/recipe_book_expand_icon');
    ui.button('Finde Text von Name', 'textures/ui/magnifyingGlass');

    ui.show(viewer).then(({ selection }) => {
        if (selection === 0) createText(viewer);
        else if (selection === 1) findText(viewer);
    })
};


export async function createText(viewer) {
    const xyz = viewer.location;
    Object.keys(xyz).forEach(k => xyz[k] = xyz[k].toFixed(2));
    const ui = new ModalFormData();
    ui.title('Erstelle fliegenden Text');
    ui.textField('Text', 'Text');
    ui.textField('Position', 'X Y Z', Object.values(xyz).join(' '));
    ui.show(viewer).then(({ formValues, canceled }) => {
        if (canceled) return;
        const _xyz = formValues[1].trim().split(' ', 3);
        const entity = viewer.dimension.spawnEntity('minecraft:egg<ftext:floating_text>', { x: Number(_xyz[0]), y: Number(_xyz[1]) - 0.6, z: Number(_xyz[2]) });
        if (formValues[0] == '' || !formValues[0]) entity.nameTag = 'Floating Text';
        else entity.nameTag = formValues[0].replace(/\\n/g, '\n');
    })
};


export  async function findText(viewer, prevError) {
    const ui = new ModalFormData();
    ui.title('Find Text by Name');
    ui.textField(`Suche Text name ${prevError ?? ''}`, 'Text');
    ui.show(viewer).then(({ formValues, canceled }) => {
        if (canceled) return;
        const ui1 = new ActionFormData();
        ui1.title('Find Text by Name');
        ui1.body(`Here are the texts found by the search for "${formValues[0]}"`);

        const texts = [];
        for (const egg of viewer.dimension.getEntities({ type: 'minecraft:egg', families: ['inanimate'] }))
            if (egg.nameTag.replace(/§.?/g, '').toLocaleLowerCase().includes(formValues[0].replace(/§.?/g, '').trim().toLocaleLowerCase())) {
                ui1.button(egg.nameTag.replace(/\n[^]+/, ''));
                texts.push(egg);
            }

        ui1.button('§cReturn§r', 'textures/ui/arrow_left');

        if (texts.length == 0) {
            viewer.playSound('note.bass');
            findText(viewer, `\n§cNo floating text matched with "${formValues[0]}"`);
            return;
        }
        else ui1.show(viewer).then(({ selection }) => {
            if (selection == texts.length) findText(viewer);
            else editText(viewer, texts[selection]);
        })
    })
};


export async function editText(viewer, textEntity) {
    const xyz = textEntity.location;
    xyz.y += 0.6;
    Object.keys(xyz).forEach(k => xyz[k] = xyz[k].toFixed(2));
    const ui = new ModalFormData();
    ui.title('Edit Floating Text');
    ui.toggle('Remove Floating Text', false);
    ui.textField('Display Text', 'Floating Text', textEntity.nameTag.replace(/\n/g, '\\n'));
    ui.textField('Position', 'X Y Z', Object.values(xyz).join(' '));
    ui.show(viewer).then(({ formValues, canceled }) => {
        if (canceled) return;
        if (formValues[0]) { textEntity.kill(); return };
        const _xyz = formValues[2].trim().split(' ', 3);
        textEntity.nameTag = formValues[1].replace(/\\n/g, '\n');
        textEntity.teleport({ x: Number(_xyz[0]), y: Number(_xyz[1]) - 0.6, z: Number(_xyz[2]) });
    })
};