import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { userContext } from '../../App';

const Shipment = () => {
    const [logInUser] = useContext(userContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log('submitted file is closed',data)
   };
  console.log(watch("example")); 
  

  return (
    <div>
        <h3>Please fill the form with the requirement:</h3>
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input name='name' defaultValue ={logInUser.name} placeholder='Your Name'  {...register("name", { required: true })} />
        {errors.name && <span id='errors'>Your name is required</span>}
        <input name='email' defaultValue ={logInUser.email} placeholder='Your Email'  {...register("email", { required: true })} />
        {errors.email && <span id='errors'>Your email is required</span>}
        <input name='address' placeholder='Your Address'  {...register("address", { required: true })} />
        {errors.address && <span id='errors'>Your address is required</span>}
        <input name='phoneNumber' placeholder='Your Phone Number'  {...register("phone", { required: true })} />
        {errors.phone && <span id='errors'>Your phone number is required</span>}
        <input name='zip' placeholder='ZIP code' {...register("zip", { required: true })} />
        {errors.zip && <span id='errors'>Your zip code is required</span>}
        
        <input id='submitBtn' type="submit" />
        </form>
    </div>

  );
};

export default Shipment;