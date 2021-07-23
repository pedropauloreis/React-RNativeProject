import React, {useState,useMemo} from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';


export default function New({history}){
    const [company,setCompany] = useState('');
    const [techs,setTechs] = useState('');
    const [price,setPrice] = useState('');
    const [thumbnail,setThumbnail] = useState(null);
    const [companyValid,setCompanyValid] = useState(true);
    const [techsValid,setTechsValid] = useState(true);
    const [priceValid,setPriceValid] = useState(true);
    const [thumbnailValid,setThumbnailValid] = useState(true);

    const preview = useMemo(
        ()=> {
            return thumbnail? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    )

    async function handleSubmit(event){
        event.preventDefault();
        let err= false;

        if(company==="")
        {
            setCompanyValid(false)
            err = true;
        }
        else {
            setCompanyValid(true)
        }

        if(techs==="")
        {
            setTechsValid(false)
            err = true;
        }
        else {
            setTechsValid(true)
        }
        
        if(price==="")
        {
            setPriceValid(false)
            err = true;
        }
        else {
            setPriceValid(true)
        }
        
        if(thumbnail===null)
        {
            setThumbnailValid(false)
            err = true;
        }
        else
        {
            setThumbnailValid(true)
        }

        if (!err)
        {
            const data = new FormData();
            data.append('thumbnail',thumbnail);
            data.append('company',company);
            data.append('techs',techs);
            data.append('price',price);

            const user_id = localStorage.getItem('user');
            await api.post('/spots',data, {headers: {user_id}});

            history.push('/dashboard');
        }
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="file"><span style={thumbnailValid ? {} : {color:'#ff0000'}} >MINIATURA *</span> <span>(separadas por vírgula)</span> </label>
            <label 
            id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail? 'has-thumbnail':''}
            
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Selecione uma imagem" />
            </label>
            <label htmlFor="company"><span style={companyValid ? {} : {color:'#ff0000'}} >EMPRESA *</span></label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value = {company}
                onChange={ event => setCompany(event.target.value)}
                style={companyValid ? {} : {borderColor:'#ff0000'}}
            />

            <label htmlFor="techs"><span style={techsValid ? {} : {color:'#ff0000'}} >TECNOLOGIAS *</span> <span>(separadas por vírgula)</span> </label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value = {techs}
                onChange={ event => setTechs(event.target.value)}
                style={techsValid ? {} : {borderColor:'#ff0000'}}
            />

            <label htmlFor="price"><span style={priceValid ? {} : {color:'#ff0000'}} >VALOR DA DIÁRIA *</span> <span>(em branco para GRATUITO)</span> </label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value = {price}
                onChange={ event => setPrice(event.target.value)}
                style={priceValid ? {} : {borderColor:'#ff0000'}}
            />

            <button type="submit" className="btn">Cadastrar</button>

        </form>
    )
}