'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import * as echarts from 'echarts'

import { MathServiceClient } from '@/grpc/math/v1/MathServiceClientPb'
import { SinCosRequest, SineCosineEnum } from '@/grpc/math/v1/math_pb'

interface IDataSinCos {
  degrees: number;
  value: number;
}

interface ISinCosMethod {
  name: string,
  value: SineCosineEnum.SINE | SineCosineEnum.COSINE
}

const sinCosMethods: ISinCosMethod[] = [
  {
    name: 'Sine',
    value: SineCosineEnum.SINE,
  },
  {
    name: 'Cosine',
    value: SineCosineEnum.COSINE,
  }
]

export default function MathSinCos () {
  const [sinCosMethod, setSinCosMethod] = useState(SineCosineEnum.SINE)
  const [isStreamDataOnProcess, setIsStreamDataOnProcess] = useState(false)
  const [sinCosData, setSinCosData] = useState<IDataSinCos[]>([])

  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSinCosMethod(Number(value))
  }

  const onClickGetDataHandler = async () => {
    setSinCosData([])
    setIsStreamDataOnProcess(true)
    const client = new MathServiceClient(process.env.NEXT_PUBLIC_API_DOMAIN as string, null, {})
    const sinCosRequest = new SinCosRequest()

    sinCosRequest.setMethod(sinCosMethod)

    try {
      const stream = client.sinCos(sinCosRequest, {})

      stream.on('data', (data) => {
        setSinCosData((prevValue) => [...prevValue, {
          degrees: data.getDegree(),
          value: data.getValue(),
        }])
      })

      stream.on('end', () => {
        setIsStreamDataOnProcess(false)
      })
    } catch (error) {
      console.warn(error)
    }
  }

  const generatedChart = () => {
    const lineChart = echarts.init(document.getElementById('sincos-id'), null, {
      width: 600,
      height: 400,
    })

    const options = {
      xAxis: {
        type: 'category',
        name: 'Degrees',
        data: sinCosData.map((data) => data?.degrees), // Array of x-axis categories
      },
      yAxis: {
        type: 'value',
        name: 'Value',
      },
      series: [
        {
          data: sinCosData.map((data) => data.value), // Array of y-axis values
          type: 'line',
        },
      ],
    };

    lineChart.setOption(options)

    return lineChart
  }

  useEffect(() => {
    const chart = generatedChart()

    return () => {
      chart.dispose()
    }
  }, [sinCosData])

  return (
    <section className='flex flex-col items-center gap-4'>
      <h2 className='text-lg text-center font-bold'>
        Math Method (Server Stream RPC): SinCos
      </h2>

      <select
        className='px-4 py-2 rounded-md text-black'
        onChange={onChangeSelectHandler}
        value={sinCosMethod}
      >
        {sinCosMethods.map((method) => {
          return (
            <option
              key={method.name}
              value={method.value}
            >
              { method.name }
            </option>
          )
        })}
      </select>

      <button
        className='bg-blue-500 py-2 px-4 w-36 rounded-md text-white'
        onClick={onClickGetDataHandler}
      >
        Get Data
      </button>

      { isStreamDataOnProcess ? (
        <p>Stream Data still on process</p>
      ) : null }

      <div className='pt-12'>
        <div className="legend-title">
          Sine/Cosine Method
        </div>

        <div id='sincos-id'></div>
      </div>
    </section>
  )
}