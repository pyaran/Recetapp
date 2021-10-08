import React, {useState, useEffect} from 'react';
import "../Tags/Tags.css";

function Tags() {
    
    const [tags, setTags] = useState([]);

    const getTagArray = async () => {

        await fetch(`https://polar-reaches-30197.herokuapp.com/tags/`)
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(err => { console.log(err) })
    }

    useEffect(() => {
        getTagArray();
    }, [])

        console.log('tags', tags);


    const handleChange = (e)=> {
        let isChecked = e.target.checked;
        console.log('counter', isChecked, trueCheckedCount());
        if(!isChecked){
            const tagsUpdated = tags;
            const index = parseInt(e.target.dataset.index);
            tagsUpdated[index].checked = !isChecked;
            setTags(tagsUpdated);
        }
    }
    const trueCheckedCount = ()=> {
        console.log('algo porfa', tags.filter(data=> {
            console.log('data', data);
            return data.checked;
        }));
        return tags.filter(data=> data.checked).length
    }

    return (
        <div className="d-flex justify-content-sm-center justify-content-md-start text-uppercase tag-acordeon w-75 rounded">
            <div className="container pb-3">
                <h4 className="text-center p-2 pt-3">También podes usar nuestros filtros...</h4>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <i className="bi bi-funnel h4 p-1 mb-1"></i> Seleccioná hasta tres opciones:
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body d-flex justify-content-evenly flex-wrap ">
                                {tags && tags.map((item, index) => (
                                    <div key={index} class="form-check form-check-inline py-1">
                                        <input type="checkbox" data-index={index} class="btn-check" id={`btn-check-outlined-${index}`} autocomplete="off" checked={item.checked} onChange={handleChange}/>
                                        <label class="btn btn-outline-secondary rounded-pill" for={`btn-check-outlined-${index}`}>{item.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-button text-center pt-3 d-grid col-3 mx-auto">
                    <button type="button" className="btn btn-danger rounded-pill">Filtrar</button>
                </div>
            </div>
        </div>
    )
}

export default Tags;

