"use client"
import { IUser } from '@/Entitys/User';
import { Button } from '@/components/Button';
import React, { DetailedHTMLProps } from 'react';
import { useFormState } from 'react-dom';
import { handleSignin } from './action';
import { FormAlert } from '@/components/FormAlert';
import { LabelInput } from '@/components/LabelInput';
import { Form } from '@/components/Form';

interface ISetMissedFormProps extends DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    users: IUser[] | undefined;
}

const initialState = {
    message: undefined,
    status: 0
}
export const SetMissedForm = ({ users, ...restProps }: ISetMissedFormProps) => {


    const [state, formAction] = useFormState(handleSignin, initialState)


    return (
        <Form action={formAction} className="mt-8 mb-8" {...restProps}>
            <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Registro de Ponto</h2>

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

            <LabelInput id="date" name="date" type="date">Data: </LabelInput> 
            <LabelInput id="first_entrance" name="first_entrance" type="time">Primeira entrada:</LabelInput> 
            <LabelInput id="first_exit" name="first_exit" type="time">Primeira saida:</LabelInput> 
            <LabelInput id="second_entrance" name="second_entrance" type="time">Segunda entrada:</LabelInput> 
            <LabelInput id="second_exit" name="second_exit" type="time">Segunda saida:</LabelInput>
            <LabelInput id="missed" name="missed" type="checkbox" className="mb-6 flex items-center gap-2">Falta: </LabelInput> 

            {
                state.message && <FormAlert variant={state.status === 200 ? 'success' : 'danger'}>{state.message}</FormAlert>
            }
            <Button type="submit" className="mt-4 w-full">
                Salvar
            </Button>

        </Form>
    )
}
