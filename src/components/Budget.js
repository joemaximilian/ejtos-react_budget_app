/*
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { budget } = useContext(AppContext);
    return (
        <div className='alert alert-secondary'>
            <span>Budget: £{budget}</span>
        </div>
    );
};
export default Budget;
*/

import React, { useState, useEffect, useContext } from 'react';

import { AppContext } from '../context/AppContext';

function BudgetInput() {

   // const { state, dispatch } = useContext(AppContext);
   // const budgetFromStore = state.budget; // Get the budget value from the store

    //const [budget, setBudget] = useState(budgetFromStore); // Initial value of budget is budgetFromStore
    const { budget: budgetFromStore, dispatch } = useContext(AppContext);
    // Get the budget value from the store
    
    const [budget, setBudget] = useState(budgetFromStore);
    // Initial value of budget is budgetFromStore
    
    //const { remaining } = useContext(AppContext);
    
    const { expenses,currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0); 
    

    // Synchronize local state with context state
    useEffect(() => {
        setBudget(budgetFromStore);
    }, [budgetFromStore]);



    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}
                <input 
                    type="number" 
                    value={budget} 
                    onChange={(e) => {
                        if(parseInt(e.target.value, 10) > 20000) {
                            alert("The budget cannot exceed £20,000");
                            setBudget("0");
                            return;
                        }
                        if(parseInt(e.target.value, 10) < totalExpenses) {
                            alert("The budget cannot be less than the spend.");
                            setBudget(totalExpenses);
                            return;
                        }
                        setBudget(e.target.value);
                        dispatch({
                            type: 'SET_BUDGET',
                            payload: parseInt(e.target.value, 10),
                        });
                    }}
                />
            </span>
        </div>

    );
}

export default BudgetInput;
