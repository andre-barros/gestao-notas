import { useReducer, useState } from 'react';

function CaixaDeTexto({ type, texto, aoAlterarTexto }) {
  
    return <>
       <input 
        type={type}
        texto={texto}
        onChange={aoAlterarTexto}
      />
    </>
}

export default CaixaDeTexto;
