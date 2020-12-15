import React from 'react'
import { useLoading, Oval } from '@agney/react-loading';

function LoadingPage() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="3rem" color='gray' />,
  });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span>
        <section {...containerProps
        } >
          {indicatorEl}<br />
        </ section>
      </span>
    </div>
  )
}

export default LoadingPage
