import Image from 'next/image'
import { useState } from 'react'
import Input from './Input'

const Question = ({
  question,
  options,
  onSelect,
  type,
  register,
  error,
  name,
  isOther,
  handleOptionClick,
}) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleClick = (option) => {
    handleOptionClick(option)
    setSelectedOption(option)
  }

  const handleKeyDown = (event, option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(option)
    }
  }

  return (
    <div className="relative w-full bg-darkGreen dark:bg-blackDark">
      <div>
        <h3 className="regal-black mb-5 mt-5 font-sans font-medium text-subTitleLM dark:text-gray-100">
          {question}
        </h3>

        {type === 'radio' && (
          <div className="flex flex-col">
            {options.map((option, index) => (
              <div
                key={name + index}
                className="mb-1 mt-5 cursor-pointer rounded p-2"
                onClick={() => handleOptionClick(option)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, option)}
              >
                <input
                  {...register(name)}
                  type="radio"
                  id={name + index}
                  name={name}
                  // checked={option === selectedOption}
                  value={option}
                  // required={true}
                  className="appearance-none focus:border-designColor focus:outline-none focus:ring active:border-designColor active:outline-none active:ring"
                />
                <label
                  htmlFor={name + index}
                  className="ml-3 cursor-pointer text-sm font-medium text-txt dark:text-gray-200"
                >
                  {option}
                </label>
              </div>
            ))}
            {isOther && (
              <input
                type="text"
                name="otherOption"
                required={true}
                placeholder="Enter other option"
                className={'text-grey-600 mb-2'}
              />
            )}
            {error[name] && <p className="mb-2 text-red-500">{error[name].message}</p>}
          </div>
        )}

        {type === 'input' &&
          options.map((option, index) => (
            <div key={name + index}>
              <Input
                type="text"
                label={option}
                name={name}
                register={register}
                error={error[name]}
              />
            </div>
          ))}

        {type === 'checkbox' && (
          <div className="flex flex-col">
            {options.map((option, index) => (
              <div
                key={name + index}
                className="mb-4 mt-5 cursor-pointer rounded p-2"
                role="button"
                tabIndex={0}
              >
                <input
                  {...register(name)}
                  type="checkbox"
                  id={name + index}
                  name={name}
                  // checked={option === selectedOption}
                  value={option}
                  // required={true}
                  className="appearance-none focus:border-designColor focus:outline-none focus:ring active:border-designColor active:outline-none active:ring"
                />
                <label
                  htmlFor={name + index}
                  className="ml-3 cursor-pointer text-sm font-medium text-txt dark:text-gray-200"
                >
                  {option}
                </label>
              </div>
            ))}
            {error[name] && <p className="mb-2 text-red-500">{error[name].message}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Question
