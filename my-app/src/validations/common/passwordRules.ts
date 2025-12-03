
import * as yup from 'yup'

export const passwordRules = yup.string()
    .required('password required')
    .min(8, 'password contains minimum 8 characters')
    .matches(/[a-z]/, 'password contains one lowercase')
    .matches(/[A-Z]/, 'password contains one uppercase')
    .matches(/[0-9]/, 'password contains one digit')
    .matches(/[^A-Za-z0-9]/, 'password contains one special Character')