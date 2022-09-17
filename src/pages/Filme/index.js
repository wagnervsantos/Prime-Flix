import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css'
import api from '../../services/api';
import { toast } from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate()

    const [filme, setFilme] = useState ({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "ab10b4e08d6019fc4fadddf3ef40951a",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
               setFilme(response.data);
               setLoading(false)
            })
            /*quando o filme não for encontrado vai cair dentro */
            .catch(()=>{
                console.log("filme não encontrado");
                navigate("/", { replace: true })
                return;
            })
        }
        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    
    // aqui vai salva meus filmes quando click no salvar
    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn("ESSE FILME JÁ ESTA SALVO!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success("filme salvo com sucesso!")
       

    }
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }


    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;