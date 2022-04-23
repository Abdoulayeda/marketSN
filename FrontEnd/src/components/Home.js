/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 02:53:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
import React, {useState, useEffect} from 'react';
import axios from "axios"

/* import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col' */

import photo from "../photo1.jpg"
const Home = ()=> {

  const [produits, setProduits]= useState([])
  const baseurl = 'http://localhost:5000/public/images/'

  useEffect(()=>{
    axios.get('http://localhost:5000/api/produits')
    .then(function(response){
     setProduits(response.data)
     console.log(response.data)
     
    }) 
  },[])


  /*   const getproduits= async ()=> {
      try{
       const response = await axios.get('http://localhost:5000/api/produits')
       setProduits(response.data)
      }catch(err){

      }
    } */
    return (
 <div className="container">
  <h1>Bienveune</h1>
 
<div className="row ">
{produits.map((produit)=> (
 <div key={produit.id} className="col-lg-3">
    <div className="">
    <div className="card">
    <img key={produit.image} src={photo} width="300" height="300" alt="" className="card-img-top" />
    <div className="card-body">
        <h5 className="card-title"> {produit.nom}</h5>
        <h5 className="card-title"> {produit.prix} FCFA</h5>

        <p className="card-text">{produit.description}</p>
        <a href="#" class="btn btn-primary">Voir</a>
    </div>
    </div>
  </div>
</div> 
))}
</div>
</div>
    )
}

export default Home