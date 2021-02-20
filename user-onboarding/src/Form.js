import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required('user is required').min(6, 'user needs to be 6 chars min'),
    email: yup.string().required('email is required'),
    password: yup.string().required('password is required').min(8, 'password needs to be 8 chars min'),
    agree: yup.boolean().oneOf([true], 'you must accept terms of service'),
})

const intialForm = {
    name:'',
    email:'',
    password:'',
    agree: false
  }


function Form() {
    const [ form, setForm ] = useState(intialForm)
    const [errors, setErrors] = useState({ name:'', email:'', password:'', agree:''})
    const [disabled, setDisabled] = useState(true)

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value) 
            .then(() => setErrors({ ...setErrors, [name]:'' }))
            .catch(err => setErrors({ ...setErrors, [name]: err.errors[0] }))
    }

    const handleChange = event => {
        const {name, value, type, checked } = event.target;
        const update = type === 'checkbox' ? checked : value;
        setFormErrors(name, value)
        setForm({ ...form, [name]: update});
    };

    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])

    const handleSubmit = event => {
        event.preventDefault();
        console.log("submitted");
        const newUser = { user: form.user, name: form.name, email: form.email, password: form.password, agree: form.agree }
        axios.post('https://reqres.in/api/users', newUser)
            .then(res => {
                setForm({name:'',
                email:'',
                password:'',
                agree: false})
            })
            .catch (err => {
                debugger
            })
        
    };

  return (
    <div className="Form">
        <div style={ {color: 'red' }}>
            <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.agree}</div>
        </div>
      <form onSubmit={event => handleSubmit(event)}>
        <section className='Name'>
            <label>
            Name:
            <input 
            type="text" 
            name="name"
            value={form.name}
            placeholder="Enter Name"
            onChange={handleChange} 
            data-cy="name"
            />
            </label>
        </section>
        <section className='Email'>
            <label>
            Email:
            <input 
            type="text" 
            name="email"
            value={form.email}
            placeholder="Enter Email"
            onChange={handleChange} 
            data-cy="email"
            />
            </label>
        </section>
        <section className='Password'>
            <label>
            Password:
            <input 
            type="text" 
            name="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange} 
            data-cy="password"
            />
            </label>
        </section>
        <section>
            <label>
                Do you agree to the terms of service?
                <input 
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange} 
                data-cy="agree"
                />
            </label>    
        </section>  
    
        <div className='submit'>
        <button disabled={disabled} data-cy="submitBtn">Submit!</button>
        </div>
      </form>
    </div>  
  );
}

export default Form;


