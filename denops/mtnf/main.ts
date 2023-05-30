import { Denops } from 'https://deno.land/x/denops_std@v1.0.0/mod.ts';
import { ensureString } from "https://deno.land/x/unknownutil@v1.0.0/mod.ts";

function isVisualMode(mode: string): boolean {
    const V_MODE_LIST = ['v', 'V', '\x16'];

    return V_MODE_LIST.includes(mode);
}

async function getCurrentSelection(denops: Denops): Promise<string> {
    const mode = await denops.call('mode');
    ensureString(mode);

    if (!isVisualMode(mode)) {
        throw new Error('Not in visual mode.');
    }

    // https://zenn.dev/kawarimidoll/articles/4357f07f210d2f
    const saveReg = await denops.call('getreginfo', 'z');

    let text = '';
    try {
        await denops.cmd('noautocmd normal! "zygv')
        const regText = await denops.call('getreg', 'z');
        ensureString(regText);
        text = regText;
    } catch (err) {
        console.error(err);
    } finally {
        await denops.call('setreg', 'z', saveReg);
    }

    return text;
}

async function newBuffer(denops: Denops, name: string): Promise<void> {
    await denops.cmd(`e ${name}`);
}

async function newTabBuffer(denops: Denops, name: string): Promise<void> {
    await denops.cmd(`tabnew ${name}`);
}

async function newBufferWithCurrentSelection(denops: Denops, name: string): Promise<void> {
    const text = await getCurrentSelection(denops);

    if (!text) {
        console.error('No selected text.');
    }

    await newTabBuffer(denops, name);
    await denops.call('setline', '.', text.split('\n'));
}

export function main(denops: Denops): void {
    denops.dispatcher = {
        getCurrentSelection(): Promise<string> {
            return getCurrentSelection(denops);
        },

        newBuffer(name = ''): Promise<void> {
            ensureString(name);
            return newBuffer(denops, name);
        },

        newTabBuffer(name = ''): Promise<void> {
            ensureString(name);
            return newTabBuffer(denops, name);
        },

        newBufferWithCurrentSelection(name = ''): Promise<void> {
            ensureString(name);
            return newBufferWithCurrentSelection(denops, name);
        }
    };
}
