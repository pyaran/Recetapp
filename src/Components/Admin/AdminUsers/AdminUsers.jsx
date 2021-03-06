import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ModalUser from "./ModalUser/ModalUser";

function AdminUsers() {
  let history = useHistory();

  const user = JSON.parse(localStorage.getItem("registerLogIn"));
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const [users, setUsers] = useState([]);
  const [fetchFlag, setFetchFlag] = useState("");
  let [reference, setReference] = useState(0);

  const getUsers = async () => {
    await fetch("https://polar-reaches-30197.herokuapp.com/user", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        setTimeout(() => {
          console.log(err);
          alert("Algo salio mal");
        }, 2000);
      });
  };

  /* List all users */
  useEffect(() => {
    if (!user) {
      history.push("/login");
      alert("Inicie secion para visualizar esta Pagina");
    } else if (user.role === "user") {
      history.push("/");
      alert("No tiene los permisos necesarios para acceder a esta pagina");
    } else {
      getUsers();
    }
  }, [fetchFlag]);

  /*Delete*/
  const remove = (index) => {
    fetch(
      `https://polar-reaches-30197.herokuapp.com/user/${users[index]._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userToken,
        },
        body: JSON.stringify(),
      }
    ).then((response) => setFetchFlag(response.json()));
  };

  const setIndex = (index) => {
    reference = users[index];
    setReference(reference);
  };

  return (
    <div className="container">
      <h2>Usuarios</h2>
      {/*TABLA */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col" className="d-none d-md-table-cell">
              Email
            </th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td className="d-none d-md-table-cell">{item.email}</td>
              <td>{item.role}</td>
              <td>
                <button
                  className="btn btn-danger w-20 mb-1"
                  onClick={() => remove(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-Rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-primary w-20 me-3 mb-1 d-md-none"
                  data-bs-toggle="modal"
                  data-bs-target="#userModal"
                  onClick={() => setIndex(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-bar-expand"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalUser user={reference} />
    </div>
  );
}

export default AdminUsers;
