import React, { useState, useEffect } from "react";
import * as md5 from "blueimp-md5"; 

export const Home = () => {
	
	const [ heroes, setHeroes ] = useState([])
	
	useEffect( () => {

		const ts = new Date()

		const buscarHeroes = async () => {
			try{
				let resp = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${process.env.PUBLIC_KEY}&hash=${md5(ts+process.env.PRIVATE_KEY+process.env.PUBLIC_KEY)}`)
				let superheroes = await resp.json()
				setHeroes(superheroes.data.results)
			}catch(err){
				console.log(err)
			}
		}

		buscarHeroes()
			
	},[])
	
	return ( <div className="text-center mt-5">
		<h1> Marvel API request!</h1>
		{	
			heroes.length == 0 && <span> Loading ...</span>		
		}
		{
			heroes.length != 0 &&
			heroes.map( item => (
				<div className="card col-12">
					<img src={item.thumbnail.path+"/standard_fantastic."+item.thumbnail.extension} className="card-img-top" alt={item.name} />
					<div className="card-body">
						<h5 className="card-title">{item.name}</h5>
						<p className="card-text">{item.description}</p>
						<a href="#" className="btn btn-primary">Go somewhere</a>
					</div>
				</div>
			) )
		}
	</div>
)};
