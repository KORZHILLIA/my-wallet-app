import {useForm} from 'react-hook-form';
import Web3 from 'web3';

import type { TransferFormInputs } from 'constants/types';
import type { TransferFormProps } from 'constants/types';

const TransferForm = ({onSubmit}: TransferFormProps) => {
    const web3 = new Web3(import.meta.env.VITE_BASE_URL);
    const {handleSubmit, register, formState: {errors}} = useForm<TransferFormInputs>({mode: 'all'});

    const onFormSubmit = (formData: TransferFormInputs) => {
        const ETHtoWei = web3.utils.toWei(formData.ETHValue, 'ether');
const updatedFormData = {...formData, ETHValue: ETHtoWei};
onSubmit(updatedFormData);
    };

    return <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type='text' {...register('accountID', {
            required: true,
            validate: {
                testValue: (value: string) => {
                    const regExp = /^0x[a-fA-F0-9]{40}$/;
                    return regExp.test(value) || 'Please follow format';
                },
            }
        })} />
        <input type='text' {...register('ETHValue', {
            required: true,
            validate: {
                testValue: (value: string) => {
                    const regExp = /[0-9]/;
                    return regExp.test(value) || 'Only digits please';
                }
            },
        })} />
        <button type='submit'>Go</button>
    </form>
};

export default TransferForm;