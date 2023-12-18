import Link from 'next/link'

const SERVICES = [
  {
    name: 'Math Services',
    routes: [
      { name: 'Math (Unary RPC): Add', link: '/math' },
      { name: 'Math (Server Stream RPC): SinCos', link: '/math/sincos' },
    ]
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 items-center p-12 sm:p-16 md:p-24">
      <h1 className="text-3xl">
        Next gRPC Application
      </h1>

      { SERVICES.map((service) => {
        return (
          <div
            key={service.name}
            className='flex flex-col gap-4'
          >
            <p className='text-2xl underline'>{service.name}</p>
            
            <ul>
              { service.routes.map((route) => {
                return (
                  <li key={route.name} className='text-blue-300'>
                    <Link href={route.link}>
                      { route.name }
                    </Link>
                  </li>
                )
              }) }
            </ul>

          </div>
        )
      }) }
    </main>
  )
}
