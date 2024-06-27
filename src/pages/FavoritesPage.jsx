import React, {useEffect} from 'react';
import mainStore from "../store/mainStore";
import SinglePostComp from "../components/SinglePostComp";

const FavoritesPage = () => {

    const {favorites} = mainStore()

    return (
        <>
            <div>
                <h2 className='d-flex justify-content-center'>Favorites</h2>
                <div className='d-flex flex-wrap gap-2'>
                    {favorites.map((x, i) => (
                        <SinglePostComp key={i} post={x}/>
                    ))}
                </div>

            </div>
        </>
    );
};

export default FavoritesPage;