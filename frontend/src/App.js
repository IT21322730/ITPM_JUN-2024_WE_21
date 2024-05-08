import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import AllRestaurant from "./components/Restaurant/AllRestaurant"
import AddRestaurant from "./components/Restaurant/AddRestaurant"
import UpdateRestaurant from "./components/Restaurant/UpdateRestaurant"
import PrintRestaurant from "./components/Restaurant/PrintRestaurant"
import ViewRestaurant from "./components/Restaurant/ViewRestaurant"

import Menu from "./components/Orders/NewFeatuer/Menu";
import Select from "./components/Orders/NewFeatuer/Select/Select";
import Speak from './components/Orders/NewFeatuer/Speak';
import Select_one from '../../frontend/src/components/Orders/NewFeatuer/Select/Select_one'
import Select_two from '../../frontend/src/components/Orders/NewFeatuer/Select/Select_two'
import Select_three from '../../frontend/src/components/Orders/NewFeatuer/Select/Select_three'
import Select_four from '../../frontend/src/components/Orders/NewFeatuer/Select/Select_four'
import Select_five from '../../frontend/src/components/Orders/NewFeatuer/Select/Select_five'
import Select_six from '../../frontend/src/components/Orders/NewFeatuer/Select/Select_six'
import Select_seven from './components/Orders/NewFeatuer/Select/Select_seven'
import Select_eight from './components/Orders/NewFeatuer/Select/Select_eight'
import Select_nine from './components/Orders/NewFeatuer/Select/Select_nine'
import Usercomplain from '../../frontend/src/components/Orders/NewFeatuer/Complain'
import Complain from '../../frontend/src/components/Restaurant/Complain'
import OurCollection from '../../frontend/src/components/OurCollection'

import Register from "../../frontend/src/components/User/Register";
import Authenticate from "../../frontend/src/components/User/Authenticate";
import Home from "../../frontend/src/components/Home"
import IndianCuisines from "../src/components/Novelty/InidanCuisines";
import SrilankanCuisine from "../src/components/Novelty/SrilankanCuisine";
import ThaiCuisine from "../src/components/Novelty/ThaiCuisines";
import KoreanCuisine from "../src/components/Novelty/KoreanCuisines";
import JapaneseCuisine from "../src/components/Novelty/JapaneseCuisines";
import ChineseCuisine from "../src/components/Novelty/ChineseCuisines";

import AllItems from '../../frontend/src/components/Items/AllItems';
import AddItem from '../../frontend/src/components/Items/AddItem';
import UpdateItem from '../../frontend/src/components/Items/UpdateItem';
import PrintItem from '../../frontend/src/components/Items/PrintItem';
import ViewItem from '../../frontend/src/components/Items/ViewItem';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      
      <Route path="/admin/restaurants" exact element={<AllRestaurant />} />
      <Route path="/restaurants/add" exact element={<AddRestaurant />} />
      <Route path="/restaurants/update/:id" exact element={<UpdateRestaurant />} />
      <Route path="/restaurants/view/:id" exact element={<ViewRestaurant />} />
      <Route path="/restaurants/rprint" exact element={<PrintRestaurant/>} />
      <Route path="/speechmenu" exact element={<Menu/>} />
      <Route path="/speak" exact element={<Speak/>} />
      <Route path="/selection" exact element={<Select/>} />
      <Route path="/price-1" element={<Select_one />} />
      <Route path="/price-2" element={<Select_two />} />
      <Route path="/price-3" element={<Select_three />} />
      <Route path="/price-4" element={<Select_four />} />
      <Route path="/price-5" element={<Select_five />} />
      <Route path="/price-6" element={<Select_six />} />
      <Route path="/price-7" element={<Select_seven />} />
      <Route path="/price-8" element={<Select_eight />} />
      <Route path="/price-9" element={<Select_nine />} />
      <Route path = "/admin/complain" element = {<Complain />} exact/>
      <Route path = "/complain" element = {<Usercomplain />} exact/>
      <Route path = "/ourcollection" element = {<OurCollection />} exact/>

      <Route path = "/home" exact element= {<Home/>} />
      <Route path = "/register" exact element= {<Register/>} />
      <Route path = "/authenticate" exact element= {<Authenticate/>} />
      <Route path = "/indian" exact element= {<IndianCuisines/>} />
      <Route path = "/sri-lankan" exact element= {<SrilankanCuisine/>} />
      <Route path = "/thai" exact element= {<ThaiCuisine/>} />
      <Route path = "/korean" exact element= {<KoreanCuisine/>} />
      <Route path = "/japanese" exact element= {<JapaneseCuisine/>} />
      <Route path = "/chinese" exact element= {<ChineseCuisine/>} />

      <Route path = "/addcake" exact element= {<AddItem/>}/>
      <Route path = "/allItems" exact element= {<AllItems/>}/>
      <Route path = "/updatecake/:id" exact element= {<UpdateItem/>}/>
      <Route path = "/cakeprint" exact element= {<PrintItem/>}/>
      <Route path = "/viewcake/:id" exact element= {<ViewItem/>}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
