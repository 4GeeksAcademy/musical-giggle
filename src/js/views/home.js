import React, { useState, useEffect } from "react";
import * as md5 from "blueimp-md5"; 

export const Home = () => {
	
	const [ heroes, setHeroes ] = useState([])
	
	useEffect( async ()=>{
		const ts = new Date()
		fetch(`https://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${process.env.PUBLIC_KEY}&hash=${md5(ts+process.env.PRIVATE_KEY+process.env.PUBLIC_KEY)}`)
			.then((resp) => {
				return resp.json()
			})
			.then((superheroes)=>{
				setHeroes(superheroes.data.results)
			})
			.catch((err)=>{
				console.log(err)
			})
	},[])
	
	return ( <div className="text-center mt-5">
		<h1> Marvel API request!</h1>
		{	
			heroes.length == 0 && <span> Loading ...</span>		
		}
		{
			heroes.length != 0 &&
			heroes.map( item => (
				<h2 key={item.id}>
					{item.name}
				</h2>
			) )
		}
	</div>
)};
