import React, { useState } from "react";

function AddInputSteps({ remove, index, updateSteps }) {
  const [step, setStep] = useState('');

  const stepValue = (event) => {
    const value = event.target.value;
    setStep(value);
    updateSteps(index, value);
  }


  return (
    <div className="d-flex flex-column form-contact w-100 w-md-50">
      <label htmlFor="">Pasos de la preparación</label>
      <div className="d-flex justify-content-end w-100">
        <textarea type="text" name="step" className="w-100" data-index={index} value={step} onChange={stepValue} maxLength="500" ></textarea>

        <button type="button" className="btn btn-danger ms-2" onClick={remove}>
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
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AddInputSteps;
