import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as md5 from "blueimp-md5" 

const HeroDetails = () => {

    const { hero_id } = useParams();

    const [ hero, setHero ] = useState()

    useEffect(()=>{

        async function loadIndividualHero(){
            const ts  = new Date ()
    
            try {
                
                const resp = await fetch(`https://gateway.marvel.com/v1/public/characters/${hero_id}?ts=${ts}&apikey=${process.env.PUBLIC_KEY}&hash=${md5(ts+process.env.PRIVATE_KEY+process.env.PUBLIC_KEY)}`)
                const hero = await resp.json()

                console.log(hero)
                setHero(hero.data.results[0])
                
            } catch (error) {
                console.log(error)
            }
        } 

        loadIndividualHero()

    },[])


    return ( <>
                <h2>Nombre del Character { hero && hero.name  } </h2>
                {
                    hero &&
                    <>
                        <img src={hero.thumbnail.path+"/standard_fantastic."+hero.thumbnail.extension } alt={hero.id} />
                        <p>
                            Comics
                        </p>
                        <ul>
                            { hero.comics.items.map((comic, index)=> <li key={comic.name + index}>
                                { comic.name  } 
                            </li>
                            )}
                        </ul>
                    </>
                }
            </> 
     )
}


export default HeroDetails;