'use client'
import { QUESTION_DATA } from '@/data/questionData'
import { yupResolver } from '@hookform/resolvers/yup'
import { REGISTER_SCHEMA } from 'app/yup/Validation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import Question from './Question'
import QuestionNav from './QuestionNav'
import SplashHeader from './SplashHeader'
const QuestionForm = ({ checkerRoute, showStepper }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isOther, setIsOther] = useState(false)
  const [isLastStep, setIsLastStep] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(false)

  const numOfQuestion = QUESTION_DATA.length
  const initialArray = Array.from({ length: numOfQuestion }, (_, index) => index === 0)
  const [stepCompleted, setStepCompleted] = useState(initialArray)
  const handleNext = () => {
    setIsOther(false)
    if (currentQuestion < QUESTION_DATA.length - 1) {
      setCurrentQuestion((cur) => cur + 1)

      const newArray = [...stepCompleted]
      newArray[currentQuestion] = true
      setStepCompleted(newArray)

      setIsLastStep(currentQuestion === QUESTION_DATA.length - 2) // Reset isLastStep when going forward
    } else {
      setIsLastStep(true)
      showStepper()
    }
  }
  const handleStepper = (index) => {
    setIsOther(false)
    setCurrentQuestion(index)
    if (currentQuestion < QUESTION_DATA.length - 1) {
      setIsLastStep(false)
    } else {
      setIsLastStep(true)
    }
  }
  const handleStepperComplete = (index) => {
    setCurrentQuestion(index)
  }
  const handlePrev = () => {
    setIsOther(false)
    if (currentQuestion > 0) {
      setCurrentQuestion((cur) => cur - 1)
      const newArray = [...stepCompleted]
      newArray[currentQuestion] = true
      setStepCompleted(newArray)

      setIsFirstStep(false) // Reset isFirstStep when going back
    } else {
      setIsFirstStep(true)
    }
    if (currentQuestion < QUESTION_DATA.length - 1) {
      setIsLastStep(false)
    } else {
      setIsLastStep(true)
    }
  }

  const handleSelect = (option) => {
    console.log(`Selected option: ${option}`)
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterQuestion>({
    resolver: yupResolver(REGISTER_SCHEMA),
  })

  const onSubmit: SubmitHandler<RegisterQuestion> = async (values) => {
    console.log('form value is value', values)
  }

  const handleOptionClick = (option) => {
    // onSelect(option);
    console.log('option', option)
    setIsOther(option === 'Other')
    console.log('option', option, isOther)
  }

  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <SplashHeader checkerRoutes={checkerRoute} />
      <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-[100%] flex-col justify-between rounded bg-darkGreen p-8 shadow-md dark:bg-blackDark">
          <div className="flex w-[100%] flex-row">
            <button
              onClick={handlePrev}
              className="mr-3 bg-transparent"
              type="submit"
              disabled={isFirstStep}
            >
              <MdOutlineArrowBackIos />
            </button>
            <QuestionNav handleStepper={handleStepper} currentQuestion={currentQuestion} />
          </div>
          <Question
            question={QUESTION_DATA[currentQuestion].question}
            options={QUESTION_DATA[currentQuestion].options}
            onSelect={handleSelect}
            type={QUESTION_DATA[currentQuestion].type}
            register={register}
            error={errors}
            name={QUESTION_DATA[currentQuestion].name}
            isOther={isOther}
            handleOptionClick={handleOptionClick}
          />
          <div className="flex flex-row justify-start gap-5">
            <button
              onClick={handleNext}
              className={`mb-3 w-full flex flex-row items-center justify-center rounded px-6 pb-2 pt-2.5 font-serif text-xs font-bold uppercase leading-normal  shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}

              style={{
                background:
                  'linear-gradient(to right, #235475, #56a4d9, #3e95d0, #1495ea)',
              }}

              type="submit"
            >
              {isLastStep ? 'Save' : 'Continue'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default QuestionForm
