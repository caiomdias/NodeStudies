// Obter de um usuario:
// numero de telefone a partir do seu ID
// endereco pelo id

function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000);
}

function obterTelefone(userId, callBack) {
  if(userId) {
    setTimeout(() => {
      return callBack(null, {
        telefone: '11111111111',
        ddd: 11
      })
    }, 2000);
  }
}

function obterEndereco(userId, callBack) {
  if(userId) {
    setTimeout(() => {
      return callBack(null, {
        rua: 'Rua Top',
        ddd: 0
      })
    }, 2000);
  }
}

obterUsuario(function resolverUsuario(errorUsuario, usuario) {
  if(errorUsuario) {
    console.log('DEU ERRO NO USUARIO ->', errorUsuario);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(errorTelefone, telefone) {
    if (errorTelefone) {
      console.log('DEU ERRO NO TELEFONE ->', errorTelefone);
      return;
    }
    obterEndereco(usuario.id, function resolverEnfereco(errorEndereco, endereco) {
      if (errorEndereco) {
        console.log('DEU ERRO NO ENDERECO ->', errorEndereco);
        return;
      }
      return console.log(usuario, telefone, endereco);
    });
  });
});
