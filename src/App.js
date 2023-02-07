import './App.css';
import './universal-styles/RecipePreview.css';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Home from './components/Pages/Home';
import SearchRecipes from './components/Recipes/SearchRecipes';
import RecipeDetails from './components/Recipes/RecipeDetails';
import CategoryDetails from './components/Categories/CategoryDetails';
import IngredientDetails from './components/Ingredients/IngredientDetails';
import AreaRecipes from './components/Areas/AreaRecipes';
import Page404 from './components/Pages/Page404';
import Ingredients from "./components/Pages/Ingredients";
import User from "./components/Pages/User";
import Footer from "./components/Footer/Footer";

function App()
{
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/ingredients' exact component={Ingredients}/>
          <Route path='/user' exact component={User}/>
          <Route path='/recipes/id/:id' exact component={RecipeDetails}/>
          <Route path='/recipes/search/:pathname/:input' exact component={SearchRecipes} />
          <Route path='/categories/:name' exact component={CategoryDetails} />
          <Route path='/ingredients/:ingredient' exact component={IngredientDetails} />
          <Route path='/area/:area' exact component={AreaRecipes} />
          <Route component={Page404} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
