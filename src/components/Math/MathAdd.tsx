'use client'
import { useState } from 'react'
import { MathServiceClient } from '@/grpc/math/v1/MathServiceClientPb'
import { AddRequest } from '@/grpc/math/v1/math_pb'

export default function MathAdd () {
  const [totalNumber, setTotalNumber] = useState(0)
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')

  const onClickButtonHandler = async () => {
    const client = new MathServiceClient(process.env.NEXT_PUBLIC_API_DOMAIN as string, null, {})
    const addRequest = new AddRequest()

    addRequest.setFirstNumber(Number(firstNumber))
    addRequest.setSecondNumber(Number(secondNumber))

    try {
      const result = await client.add(addRequest, null)
      
      setTotalNumber(result.getResult())
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <div className='flex flex-col'>
      <h2 className='text-lg text-center font-bold'>
        Math Method (Unary RPC): Add
      </h2>

      <section className="flex flex-col gap-4 pt-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            className='flex h-16 w-24 sm:w-36 px-2 py-4 text-md rounded-md'
            name="firstNumber"
            onChange={(e) => setFirstNumber(e.target.value)}
            placeholder='first number'
            value={firstNumber}
          />

          <span className='text-xl font-bold'>+</span>

          <input
            className='flex h-16 w-24 sm:w-36 p-4 text-md rounded-md'
            name="secondNumber"
            onChange={(e) => setSecondNumber(e.target.value)}
            placeholder='second number'
            value={secondNumber}
          />

          <span className='text-xl font-bold'>=</span>

          <div className="text-lg font-500">
            { totalNumber }
          </div>
        </div>

        <button
          className='bg-blue-500 text-white p-2 rounded-md'
          onClick={onClickButtonHandler}
        >
          SUBMIT
        </button>
      </section>
    </div>
  )
}

