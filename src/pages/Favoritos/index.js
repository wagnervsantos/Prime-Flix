import { useEffect, useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"


function Favoritos(){
const [filmes, setFilmes] = useState([])

useEffect(()=>{
    const minhaLista = localStorage.getItem('@primeflix');
    setFilmes(JSON.parse(minhaLista) || [])

},[])
/*quando o filme estive salvo e quiser excluir ele */
function excluirFilme(id){
    let filtroFilmes = filmes.filter( (item) => {
        return(item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
    toast.success("Filme Removido com sucesso!")
}

    return(
        <div className='meus-filmes'>
            <h1>tela de favoritos</h1>

            {filmes.length === 0 && <span>Você Não possui nenhum filme Salvo :( </span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Meus detalhes</Link>
                                <button onClick={() => excluirFilme(item.id) }>Excluir</button>

                             </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;