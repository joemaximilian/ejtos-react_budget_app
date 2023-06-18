import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../App.css';
const currencies = [
    { value: '£', label: '£ Pound', singleLabel: 'Currency (£ Pound)' },
    { value: '$', label: '$ Dollar', singleLabel: 'Currency ($ Dollar)' },
    { value: '€', label: '€ Euro', singleLabel: 'Currency (€ Euro)' },
    { value: '₹', label: '₹ Ruppee', singleLabel: 'Currency (₹ Ruppee)' },
];

const Currency = () => {
    const { currency: currencyFromStore, dispatch } = useContext(AppContext);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies.find(currency => currency.value === currencyFromStore));
    const [isOpen, setIsOpen] = useState(false);

    const handleCurrencyChange = currency => {
        setSelectedCurrency(currency);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: currency.value,
        });
    };

    return (
        <div>
            <div onClick={() => setIsOpen(!isOpen)} className='green-box'>
                {selectedCurrency.singleLabel}
            </div>
            {isOpen && (
                <ul className='green-list'>
                    {currencies.map((currency, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                handleCurrencyChange(currency);
                                setIsOpen(false);
                            }}
                        >
                            {currency.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Currency;
