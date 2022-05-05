import React from 'react'

export default function CheckoutSteps(props) {
  return (
    <div className='row checkout-steps'>
        <div className={props.step1 ? 'active' : ''}>Вход в аккаунт</div>
        <div className={props.step2 ? 'active' : ''}>Доставка</div>
        <div className={props.step3 ? 'active' : ''}>Метод оплаты</div>
        <div className={props.step4 ? 'active' : ''}>Подтверждение заказа</div>
    </div>
  )
};

