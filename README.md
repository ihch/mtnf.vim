# mtnf.vim

Plug-in for `move to new file` in Vim. `mtnf` is an abbreviation for `move to new file` .

## Install

For [dein.vim](https://github.com/Shougo/dein.vim)

```vim
call dein#add('vim-denops/denops.vim')
call dein#add('ihch/mtnf.vim')
```

TOML style

```toml
[[plugins]]
repo = 'vim-denops/denops.vim'

[[plugins]]
repo = 'ihch/mtnf.vim'
```

## Basic usage

1. Select string in visual mode
2. Call mtnf command (Now fixed with `<leader>.` . But I'll change that soon enough.)
3. Calls the `Rename` command with a new file name as an argument (`:Rename newfile.txt`)


https://github.com/ihch/mtnf.vim/assets/18340344/c9430c9b-261c-4c6f-9993-7008b0fd2534

