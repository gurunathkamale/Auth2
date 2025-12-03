import * as yup from 'yup'
import { passwordRules } from './common/passwordRules'
import type { Role } from '../context/AuthContext';

export const RegisterSchema = yup.object().shape({
    name: yup.string().
        required('Enter your name'),
    
    email: yup.string().
        email('Enter a Valid Email').
        required('Email is required'),
    
    password: passwordRules,

    confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'password do not match')
    .required('confirm password required'),

    role: yup.mixed<Role>().oneOf(['user',"admin"]).required()
});

export type RegisterFormData = yup.InferType<typeof RegisterSchema>;
