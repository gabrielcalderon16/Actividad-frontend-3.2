import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {


    const [ formState, setFormState ] = useState( initialForm );
    const [FormValidation, setFormValidation] = useState({
    })

    
    useEffect(() => {
    
        setFormState(initialForm)
        
    }, [initialForm])



    useEffect(() => {
        createValidators()
    }, [formState])
    
    const formStateValid = useMemo( () => {
        for( const formField of Object.keys( FormValidation ) ){
           if(FormValidation[formField] !== null ) return false
        }
        return true
    },[FormValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators= () => {

        const formCheckValues = {}

        for( const formField of Object.keys( formValidations ) ){

            const [ fn , errorMessage = "Este campo es requerido" ] = formValidations[formField];

            formCheckValues[ `${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setFormValidation(formCheckValues)


    }

    return {
        ...formState,
        ...FormValidation,
        formState,
        onInputChange,
        onResetForm,
        formStateValid
    }
}