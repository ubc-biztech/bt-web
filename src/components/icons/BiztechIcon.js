import React from 'react'

const Biztech = ({ fill, size, margin }) => (
  <svg height={size || '32'} viewBox='0 0 356 458' xmlns='http://www.w3.org/2000/svg' style={{ margin: margin }}>
    <g clipPath='url(#clip0)'>
      <path d='M355.69 175.05V389.66L186.33 458.33V232.33L337.17 181.32L355.69 175.05Z' fill={fill || '#59595B'}/>
      <path d='M0 175.05V389.66L169.35 458.33V232.33L0 175.05Z' fill={fill || '#7AD040'}/>
      <path d='M178.36 84.33L353.03 149L178.36 209.66L1.32001 149L178.36 84.33Z' fill={fill || '#939598'}/>
      <path d='M179.17 84.28L179.26 0L0.520004 65.66L1.32 149' fill={fill || '#59595B'}/>
    </g>
  </svg>
)

export default Biztech
