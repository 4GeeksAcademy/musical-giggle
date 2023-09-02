import React, { useContext } from "react"
import { Context } from "../store/appContext.js";

const Favorites = () => {

    const { store, actions } = useContext(Context);

    return (<>
        <div className="">
            <ul className="">
                {store.favorites.map((charac, index) => <li key={index} className="">
                    <div className="d-flex flex-row">
                        <h2>
                            {charac}
                        </h2>
                        <h2 onClick={() => actions.removeFavorite(charac)}>
                            🗑️
                        </h2>
                    </div>
                </li>)}
            </ul>
        </div>
    </>)

}


export default Favorites;