"use client"
//types
import { IUser } from '@/Entitys/User';
import React, { DetailedHTMLProps, ReactNode } from 'react';

//form action
import { useFormState } from 'react-dom';
import { handleSignin, State } from './action';

//components
import { Button } from '@/components/Button';
import { FormAlert } from '@/components/FormAlert';
import { LabelInput } from '@/components/LabelInput';
import { Form } from '@/components/Form';

interface ISetMedicalCertificateFormProps extends DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    users: IUser[] | undefined;
}

const initialState:State = {
    message: undefined,
    status: undefined
}


export const SetMedicalCertificateForm = ({ users, ...restProps }: ISetMedicalCertificateFormProps) => {

    const [state, formAction] = useFormState(handleSignin, initialState)

    return (
        <Form action={formAction} {...restProps}>
            <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Registro de Atestado</h2>

            <div className="mb-4">
                <label htmlFor="userId" className="block text-green-700 text-sm font-bold mb-2">Funcionário:</label>
                <select name="userId" id="userId" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 ${!users && 'text-red-500'}`}>
                    {
                        users ?
                            users.map(user => <option key={user.id} value={user.id}>{user.props.name}</option>)
                            :
                            <option >Falha ao carregar usuários</option>
                    }
                </select>
            </div>

            <LabelInput id="startsAt" name="startsAt" type="date" >Data inicio</LabelInput> 

            <LabelInput id="endsAt" name="endsAt" type="date">Data Final</LabelInput>

            {
                state.message && <FormAlert variant={state.status === 200 ? 'success' : 'danger'}>{state.message}</FormAlert>
            }
            <Button type="submit" className="mt-4 w-full">
                Salvar
            </Button>

        </Form>
    )
}
