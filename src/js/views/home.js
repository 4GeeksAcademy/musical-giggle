import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../store/appContext.js";

import { Link } from "react-router-dom";

import * as md5 from "blueimp-md5"; 

export const Home = () => {

	const { actions, store } = useContext(Context);
	
	useEffect( () => {
		actions.loadHeroes()
	},[])
	
	return ( <div className="text-center mt-5">
		<h1> Marvel API request!</h1>
		{	
			store.heroes.length == 0 && <span> Loading ...</span>		
		}
		{
			store.heroes.length != 0 &&
			store.heroes.map( item => <HeroCard key={item.id} item={item} /> )
		}
	</div>
)};

const HeroCard = ({ item }) => {
	
	return (
		<div className="card col-12">
			<img src={item.thumbnail.path+"/standard_fantastic."+item.thumbnail.extension} className="card-img-top" alt={item.name} />
			<div className="card-body">
				<h5 className="card-title">{item.name}</h5>
				<p className="card-text">{item.description}</p>
				<Link to={`/character/${item.id}`} className="btn btn-primary">Watch Details</Link>
			</div>
		</div>
	)
}