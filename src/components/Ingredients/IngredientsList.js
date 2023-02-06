import './style/IngredientsList.css';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
import Page404 from '../Pages/Page404';

function IngredientsList()
{
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    setTimeout(() => setLoading(false), 5000);


    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const moreIngredientsHandler = () => setPage(page + 1);

    useEffect(() => {
        fetch(`http://0.0.0.0:8080/api/ingredient/search`,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: JSON.stringify({page})
        })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 'success') return;
                setLoading(false);
                setNextPage(data.payload.nextPage);
                setIngredients([...ingredients, ...data.payload.ingredients]);
            });
    }, [page]);

    return(
        <>
        {loading === true ? (
            <LoadingPage />
        ) : loading === false && ingredients.length === 0 ? (
            <Page404 />
        ) : (
            <div className='home-page ingredients' id='ingredients'>
                <div className='ingredients-declaration'>Search by Ingredient</div>
                <div className='ingredient-list'>
                    {ingredients.map((ingredient) => (
                        <div className='ingredient' key={ingredient._id}>
                            <Link to={{
                                pathname:`/ingredients/${ingredient.title}`, state: { ingredient }
                            }}>
                                <img className='ingredient-thumbnail' src={`https://www.themealdb.com/images/ingredients/${ingredient.title}.png`} alt='T_T'/>
                                <div className='ingredient-name'>{ingredient.title}</div>
                            </Link>
                            <div className='button-container'>
                                <button className='recipe-but'>Add</button>
                            </div>
                        </div>
                    ))}
                </div>
                {nextPage !== null ? (
                    <div className='button-container '>
                        <button className='recipe-but more' onClick={moreIngredientsHandler}>More Ingredients</button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        )}
        </>
    );
}

export default IngredientsList;
