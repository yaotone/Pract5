import { useState } from "react";

export default function Form(props){
    function handleChange(e) {
        setName(e.target.value);
    }

    const [name, setName] = useState('');

    function handleSubmit(e) {
            e.preventDefault();
            props.addTask(name);
            setName('')
        }

    return(
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                Что необходимо сдедать?
                </label>
            </h2>
            <input
            onChange={handleChange}
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Добавить задачу
            </button>
        </form>
    )
}