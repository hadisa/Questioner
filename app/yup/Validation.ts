import * as yup from 'yup'

export const RESET_FORM = yup.object({
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Your password is too short.'),
  confirmPassword: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  name: yup.string().required('Please enter user name'),
  email: yup.string().required('Please enter a valid email').email(),
  image: yup.string().required('Please enter a valid email').email(),
  dropdown: yup.string().required('Please select an option from the dropdown'),
})

export const REGISTER_SCHEMA = yup.object({
  fruits: yup.string().required('Please select an option'),
  healthGoal: yup.string().required('Please select an option'),
  height: yup.number().required('Please enter your height(cm)'),
  weight: yup.number().required('Please enter your weight(kg)'),
  haveWeightGoal: yup.string().required('Please enter your weight(kg)'),
  weightGoal: yup.string().required('Please select an option'),
  sex: yup.string().required('Please select an option'),
  genderIdentify: yup.string().required('Please select an option'),
  isPregnant: yup.string().required('Please select an option'),
  age: yup.string().required('Please select your age'),
  usedAntibiotic: yup.string().required('Please select an option'),
  energy: yup.string().required('Please select an option'),
  exercise: yup.string().required('Please select an option'),
  menopause: yup.string().required('Please select an option'),
  healthConditions: yup.array().min(1).required('Please select one'),
  diabetes: yup.string().required('Please select an option'),
  parentsDiabetes: yup.string().required('Please select an option'),
  haveDisease: yup.string().required('Please select an option '),
  parentsDisease: yup.string().required('Please select an option '),
  haveBloodPressure: yup.string().required('Please select an option'),
  medicationsTreatPressure: yup.string().required('Please select an option '),
  eumaximo: yup.string().required('Please select an option'),
})

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().required('Please enter a valid email').email(),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Your password is too short.'),
})
