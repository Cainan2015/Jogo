$(document).ready(function () {
    $('form').submit(function (e) {
        var valido = true;
        $('.required').each(function (input) {
            var campo = $(this)
            var valor = campo.val();

            if (validaCampo(valor)) {
                campo.removeClass("error");
            } else {
                campo.addClass("error");
                valido = false;
            }

        });
        var senha1 = $("input[name='senha']").val();
        var senha2 = $("input[name='senha2']").val();
        if (valido) {
            if (!confereSenha(senha1, senha2)) {
                alert('As senhas devem ser iguais');
                e.preventDefault();
            }
        } else {
            alert("Campos obrigatorios nao foram preenchidos");
            e.preventDefault();
        }
    });
});



function validaCampo(campo) {
    if (campo == null || campo == "") {

        return false;
    }
    return true;
}

function confereSenha(senha1, senha2) {
    if (senha1 != senha2) {
        return false;
    }
    return true

}