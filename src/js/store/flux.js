import * as md5 from "blueimp-md5"; 

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			heroes: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					title: "Diego",
					background: "red",
					initial: "white"
				},
				{
					title: "Steffano",
					background: "blue",
					initial: "black"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadHeroes: async () => {

				const ts = new Date()

				try{
					let resp = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${process.env.PUBLIC_KEY}&hash=${md5(ts+process.env.PRIVATE_KEY+process.env.PUBLIC_KEY)}`)
					let superheroes = await resp.json()

					setStore({ heroes: superheroes.data.results})

				}catch(err){
					console.log(err)
				}

			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
