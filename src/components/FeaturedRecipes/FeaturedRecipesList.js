import React, {useEffect, useState} from 'react';
import Recipe from '../Recipes/RecipeByName';
import LoadingPage from "../Pages/LoadingPage";
import Page404 from "../Pages/Page404";

function FeaturedRecipesList()
{
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);

    const [loading, setLoading] = useState(true);
    const moreRecipesHandler = () => setPage(page + 1);

    useEffect(() => {
        fetch(`http://0.0.0.0:8080/api/recipe/search`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: JSON.stringify({page})
        })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 'success') return;
                setRecipes([...recipes, ...data.payload.recipes])
                setNextPage(data.payload.nextPage);
                setLoading(false);
            })
    }, [page]);

    return(
        <>
            {loading === true ? (
                <LoadingPage />
            ) : loading === false && recipes.length === 0 ? (
                <Page404 />
            ) : (
                <div className='home-page recipes'>
                    <div className='recipes-declaration'>Top Recipes</div>
                    <div className='recipes-list'>
                        {recipes.map((recipe) => (
                            <Recipe recipe={recipe} key={recipe._id}/>
                        ))}
                    </div>
                </div>
                )
            }
            {nextPage !== null ? (
                <div className='button-container '>
                    <button className='recipe-but more' onClick={moreRecipesHandler}>More Recipes</button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default FeaturedRecipesList;
