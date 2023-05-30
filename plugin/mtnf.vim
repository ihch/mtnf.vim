vnoremap . <cmd>echo denops#request("mtnf", "getCurrentSelection", [])<CR>
vnoremap <leader>. <cmd>call denops#request("mtnf", "newBufferWithCurrentSelection", ["tmp"])<CR>

command! -nargs=1 Rename call mtnf#rename(<f-args>)

