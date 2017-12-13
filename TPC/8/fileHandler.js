$(function() {
    var files = 1;    
    $('#add').click(function() {
        if(files==6)
            alert("Não é possível adicionar (max 6 ficheiros)."); 
        else{
            files++
            var name = "Ficheiro" + files
            $('#files').append('<tr id="'+name+'">' + name + '<td><b><label>'+ name+'</label></b><input class="w3-input w3-border-0" type="file" name="' + name + '"></td></tr>')
        } 
    })
    $('#remove').click(function (){
        if(files==1)
            alert("Não é possivel remover (min 1 ficheiro)")
        else {
            var name = "#Ficheiro" + files
            $(name).remove()
            files--
        }
    })
})