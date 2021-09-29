import React, { useState, useEffect } from "react";
import Modal from "../../Modal/Modal";
import AdminRecipesStatus from "./AdminRecipesStatus";

function Admin() {
  const [recipes, setRecipes] = useState([]);
  const [fetchFlag, setFetchFlag] = useState("");
  let [reference, setReference] = useState("");

  /* List all recipes */

  const getRecipes = async () => {
    await fetch("https://polar-reaches-30197.herokuapp.com/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((err) => {
        console.log(err);
        alert("Algo salio mal");
      });
  };

  useEffect(() => {
    getRecipes();
  }, [fetchFlag]);

  console.log(recipes);

  /*Set Index*/

  const setIndex = (index) => {
    reference = recipes[index];
    setReference(reference);
  };

  /*Filter Recipes*/
    const accept = recipes.filter(p => p.accepted == "accepted");
    const reject = recipes.filter(p => p.accepted == "rejected");
    const pendant = recipes.filter(p => p.accepted == "pending");

  console.log("Accepted", accept);
  console.log('Pending', pendant)
  console.log('Rejected', reject)

  /*Delete*/
  const remove = (index) => {
    fetch(
      `https://polar-reaches-30197.herokuapp.com/recipes/${recipes[index]._id}`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDE4MTFkZWVhYTQwODAzMjIyOTAxZiIsImlhdCI6MTYzMTY4OTMwMywiZXhwIjoxNjMxNzc1NzAzfQ.zYvdpjTq4wJrul5dPEKP43Hrd35JsJYjpNWhfLcj4BQ",
        },
      }
    ).then((response) => setFetchFlag(response.json()));
  };

  return (
    <div>
      <h3>Recetas</h3>

      {/*TABLA */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Pasos</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <h5>Recetas Pendientes</h5>
          {pendant && pendant.map((item, index) => (
            <AdminRecipesStatus id="pendant" title="pendant" recipe={item} index={index} setFetchFlag={setFetchFlag} remove={remove} setIndex={setIndex}/>
          ))}
          <h5>Recetas Aceptadas</h5>
          {accept && accept.map((item, index) => (
            <AdminRecipesStatus id="accept" recipe={item} index={index} setFetchFlag={setFetchFlag} remove={remove} setIndex={setIndex}/>
          ))}
          <h5>Recetas Rechazadas</h5>
          {reject && reject.map((item, index) => (
            <AdminRecipesStatus id="reject" recipe={item} index={index} setFetchFlag={setFetchFlag} remove={remove} setIndex={setIndex}/>
          ))}
        </tbody>
      </table>
      <Modal recipe={reference} />
    </div>
  );
}

export default Admin;
