import React, {useEffect} from 'react';
import mainStore from "../store/mainStore";
import SinglePostComp from "../components/SinglePostComp";

const FavoritesPage = () => {

    const {favorites} = mainStore()

    return (
        <>
            <h2 className='d-flex justify-content-center text-white user-select-none'>Favorites</h2>
            <div className='d-flex justify-content-center flex-wrap gap-2'>
                {favorites.map((x, i) => (
                    <SinglePostComp key={i} post={x}/>
                ))}
            </div>
        </>
    );
};

export default FavoritesPage;