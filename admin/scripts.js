$(function(){
    $('main table tbody').on('click', 'tr', function(){
        var $this = $(this),
        $thead = $this.parents('table').find('thead'),
        $ths = $thead.find('th'),
        $tds = $this.find('td'),
        $form = $('aside form'),
        titulo, valor;

        for(var i=0; i < $ths.length; i++) {
            titulo = $($ths[i]).text();
            valor = $($tds[i]).text();
            $form.find('p:has(label:contains(\''+titulo+'\'))').find('input, textarea').val(valor).change();
        }
        
        $form
            .addClass('edit')
            .data('row', $this);

    });

    $('form input[value=Cancelar]').click(function(){
        $(this).parents('form')
            .removeClass('edit')
            .data('row', null);
    });

    $('form input[value=Apagar]').click(function(){
        var $form = $(this).parents('form');
        
        $form.data('row').remove();

        $form
            .removeClass('edit')
            .data('row', null);
    })

    $('form').submit(function(evt){
        evt.preventDefault();

        var row = '<tr>';
        $(this).find('p:has(label) input').each(function(){
            row += '<td>' + $(this).val() + '</td>'
            $(this).val('').change();
        });

        row += '</tr>'
        $(row).appendTo('main table tbody');
    });
});