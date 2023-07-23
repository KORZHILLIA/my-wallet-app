import {useForm} from 'react-hook-form';
import Web3 from 'web3';

import Input from 'shared/components/Input/Input';
import SpinnerButton from 'shared/components/SpinnerButton/SpinnerButton';

import type { TransferFormInputs } from 'constants/types';
import type { TransferFormProps } from 'constants/types';

import styles from './TransferForm.module.scss';

const TransferForm = ({onSubmit, isDisabled, isSending}: TransferFormProps) => {
    const web3 = new Web3(import.meta.env.VITE_BASE_URL);
    const {handleSubmit, register, formState: {errors}} = useForm<TransferFormInputs>({mode: 'onSubmit'});

    const onFormSubmit = (formData: TransferFormInputs) => {
        const ETHtoWei = web3.utils.toWei(formData.ETHValue, 'ether');
const updatedFormData = {...formData, ETHValue: ETHtoWei};
onSubmit(updatedFormData);
    };

    return <form className={!isDisabled ? styles.form : styles.formDisabled} onSubmit={handleSubmit(onFormSubmit)}>
        <Input label='Wallet address' type='text' register={register('accountID', {
            required: "Please fill this field",
            validate: {
                testValue: (value: string) => {
                    const regExp = /^0x[a-fA-F0-9]{40}$/;
                    return regExp.test(value) || 'Please follow format';
                },
            }
        })} error={errors.accountID?.message} />
        <Input label='Amount to send, ETH' type='text' register={register('ETHValue', {
            required: "Please fill this field",
            validate: {
                testValue: (value: string) => {
                    const regExp = /^\d+(?:\.\d+)?$/;
                    return regExp.test(value) || 'Only digits please';
                }
            },
        })} error={errors.ETHValue?.message} />
        <SpinnerButton type='submit' label='Send' showSpinner={isSending} />
    </form>
};

export default TransferForm;