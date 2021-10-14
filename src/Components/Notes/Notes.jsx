import {React, useState, useEffect} from 'react'
import moment from 'moment'
import ModalNotes from "../ModalNotes/ModalNotes";


function Notes({recipeId, reloadFlag, setReloadFlag, recipeFaved, location}) {

    const user = JSON.parse(localStorage.getItem("registerLogIn"));
    const tokenUser = JSON.parse(localStorage.getItem("userToken"));

    const [userNotes, setUserNotes] = useState([]);

    const [result, setResult] = useState(false)

    let reference = 0;

    const [note, setNote] = useState({
        notes: ""
    });

    const getUser = () => {
        if(user){
            fetch(`https://polar-reaches-30197.herokuapp.com/user/${user.email}`, {
                headers: {
                'Content-Type': 'application/json',
                'x-access-token' : tokenUser
            }})
            .then((response) => response.json())
            .then((data) => {
                setUserNotes(data.notes);
            })
            .catch((err) => {
                setTimeout(() => {
                    console.log(err);
                    alert("Algo salio mal")
                }, 2000);
            });
        }
    }

    useEffect(() => {
        getUser()
    }, [reloadFlag])


    useEffect(() => {
        fetch(`https://polar-reaches-30197.herokuapp.com/user/${user.email}`, {
                headers: {
                'Content-Type': 'application/json',
                'x-access-token' : tokenUser
            }})
            .then((response) => response.json())
            .then((data) => {
                const favorites = (element) => element._id === recipeId;
                setResult(data.myFavorites.some(favorites))
            })
            .catch((err) => {
                setTimeout(() => {
                    console.log(err);
                    alert("Algo salio mal")
                }, 2000);
            });
    }, [recipeFaved, location])


    const setNoteObj = (val) => {
        setNote(val.target.value)
    }

    const addNote = async () => {
        if(note.notes === "" || note.notes === null || note.notes === " "){
            alert("Escriba una nota primero")
        }else {
            await fetch( "https://polar-reaches-30197.herokuapp.com/notes", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : tokenUser
            },
            body: JSON.stringify({
                content: note,
                recipe: recipeId,
                user: user._id
            })
        })
        .then((response) => setReloadFlag(response.json()))
        .then(data => {
            setNote({
                notes: ""
            })
        })}
    }

    const notesFilter = userNotes.filter(note => note.recipe === recipeId);

    const deleteNote = async (index) => {
        await fetch( `https://polar-reaches-30197.herokuapp.com/notes/${notesFilter[index]._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token' : tokenUser
            },
            body: JSON.stringify()
        })
        .then((response) => setReloadFlag(response.json()))
    }

    const setIndex = (index) => {
        reference = index
    }

    return(
        <div className='container'>
            {result && result ? 
            <div className='container text-center'>
                <div><textarea className='rounded' name="notes" value={note.notes} cols="35" rows="5" onChange={setNoteObj} maxLength="150" placeholder="Agregá notas a tus recetas guardadas aquí!!"></textarea></div>
                <div className="d-grid col-4 mx-auto"><button type="button" className="btn btn-outline-danger rounded-pill" onClick={addNote}>Agregar</button></div>
            </div> : null}
            {notesFilter && notesFilter.map((item, index) => (
                <div key={index}>
                    <p>{item.content} <span>{moment(item.createdAt).format('DD/MM/YYYY')}</span>
                        <button className="float-end" type="button" onClick={() => deleteNote(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                        <button className="float-end" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setIndex(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                            </svg>
                        </button>
                    </p>
                </div>
            ))}
            <ModalNotes index={reference} note={note} setNote={setNote} setNoteObj={setNoteObj} notesFilter={notesFilter} setReloadFlag={setReloadFlag} recipeId={recipeId}/>
        </div>
    )
}

export default Notes;