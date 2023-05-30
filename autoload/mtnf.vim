function! mtnf#rename(newFileName) abort
    echo a:newFileName
    if exists(a:newFileName)
        echo 'Already exist.'
    else
        execute("w")
        call rename(expand('%'), a:newFileName)
        " 別ファイルで保存
        " execute("w " . a:newFileName)

        call delete(expand('%'))
        execute("bdelete!")
        execute("tabnew " . a:newFileName)
    endif
endfunction

