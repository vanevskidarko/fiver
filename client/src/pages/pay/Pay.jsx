import React, { useEffect, useState } from 'react'
import './Pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../../utils/newRequest';
import {useParams} from 'react-router-dom';
import CheckoutForm from '../../components/CheckoutForm.jsx';


const stripePromise = loadStripe("pk_test_51O8rjDA6hZvgxamlAgvdGrgMJ08VA05Ymeo1u11TG6RjshE1rDp17cqmX58DHdlz9JvMaVKA8slhuSMfZivYxnm7008BkdOZ9G");


const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");


    const {id} = useParams()

    useEffect (() =>{
        const makeRequst = async () => {
            try {
                const res = await newRequest.post(`orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error)
            }
        }
        makeRequst()
    }, [])


    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

  return (
    <div className='pay'>

        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay