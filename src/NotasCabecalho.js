import { useReducer } from 'react';
import { withRouter } from 'react-router-dom';


function cabecalhoReducer (estadoAtual, acao) {
 if (acao.type === "AUTENTICAR") {
    return {
      ...estadoAtual,
      autenticando: true,
    };
  } else if (acao.type === "FALHAR_AUTENTICACAO") {
    return {
      ...estadoAtual,
      autenticando: false,
      loginInvalido: true,
    };
  } else if (acao.type === "CONFIRMAR_AUTENTICACAO") {
    return {
      ...estadoAtual,
      autenticando: false,
      loginInvalido: false,
      autenticado: true,
    };
  }
}

const estadoInicial = {
  autenticado: false,
  autenticando: false,
}

function NotasCabecalho({ usuario, ...props }) {
  const [estado, dispatch] = useReducer(cabecalhoReducer, estadoInicial);


  const sair = function () {
    fetch(`http://localhost:4000/usuarios/${usuario.id}`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
          autenticado: false,
      })
    }).then(() => {
      return props.history.push(`/`);
    })
  }

//   const usuario  =  {
//     nome: "Admin"
//   }

  return  (

    <div style={{ height: 20, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '90%' }}>
        <button onClick={sair}>
          {estado.autenticando ? "Saindo..." : "Sair"}
        </button>
      </div>
      <div style={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{usuario.nome}</p>
      </div>
    </div>
  )
}

export default withRouter(NotasCabecalho);
