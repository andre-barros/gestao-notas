import { useReducer } from 'react';
import CaixaDeTexto from './CaixaDeTexto';
import { withRouter } from 'react-router-dom';

function loginReducer (estadoAtual, acao) {
  if(acao.type === "ALTERAR_NOME") {
    return {
      ...estadoAtual,
      nome: acao.payload,
    }
  } else if (acao.type === "ALTERAR_SENHA") {
    return {
      ...estadoAtual,
      senha: acao.payload,
    }
  } else if (acao.type === "AUTENTICAR") {
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
  nome: "",
  senha: "",
  autenticado: false,
  autenticando: false,
  loginInvalido: false,
}

function Login(props) {
  const [estado, dispatch] = useReducer(loginReducer, estadoInicial);

  const validaAcesso = function () {
    dispatch({ type: "AUTENTICAR" });

    //nome: admin
    //senha: 123

    fetch(`http://localhost:4000/usuarios?nome=${estado.nome}&senha=${estado.senha}`).then(async function(response) {
      var usuario = await response.json();
      usuario = usuario[0];






      if (usuario) {
        fetch(`http://localhost:4000/usuarios/${usuario.id}`, {
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
             autenticado: true,
          })
        }).then(() => {
          dispatch({ type: "CONFIRMAR_AUTENTICACAO" });
          return props.history.push(`/notas/${usuario.id}`);
        })
      }
      return dispatch({ type: "FALHAR_AUTENTICACAO" });
    }).catch(function(err) {
      console.error('Erro na requisicao', err);
    });
  }

  return  (
    <>
      <h1>Controle de Acesso</h1>
      {estado.loginInvalido && (
        <p style={{ color: "red" }}>
          Usuário e/ou senha inválido(s)! Tente novamente.
        </p>
      )}
      <CaixaDeTexto 
        type="text"
        texto={estado.nome}
        aoAlterarTexto={(e) => dispatch({ type: "ALTERAR_NOME", payload: e.target.value })}
      />

      <CaixaDeTexto 
        type="password"
        texto={estado.senha}
        aoAlterarTexto={(e) => dispatch({ type: "ALTERAR_SENHA", payload: e.target.value })}
      />
      <button onClick={validaAcesso}>
        {estado.autenticando ? "Acessando..." : "Acessar"}
      </button>
    </>
  )
}

export default withRouter(Login);
