import React, {useReducer, useRef} from 'react';
import { ReactComponent as Beds } from './../assets/Beds.svg';
import { ReactComponent as Refri } from './../assets/Refrigerator.svg';
import { ReactComponent as Furniture } from './../assets/Forniture.svg';
import { ReactComponent as Oven } from './../assets/Oven.svg';
import { ReactComponent as Sofa } from './../assets/Sofa.svg';
import { ReactComponent as Tv } from './../assets/Tv.svg';
import { ReactComponent as Washer } from './../assets/washer.svg';
import { ReactComponent as Dining } from './../assets/Dining.svg';
import { ReactComponent as Desk } from './../assets/Desk.svg';
import { ReactComponent as Wardrobe } from './../assets/Wardrobe.svg';

const icons = [{obj: <Beds/>, name:'Beds'}, {obj: <Refri/>, name:'Refri'} , {obj: <Furniture/>, name:'Furniture'} , 
            {obj: <Oven/>, name:'Oven'}, {obj: <Sofa/>, name:'Sofa'}, {obj: <Tv/>, name:'Tv'}, 
            {obj: <Washer/>, name:'Washer'}, {obj: <Dining/>, name:'Dining'}, {obj: <Desk/>, name:'Desk'}, 
            {obj: <Wardrobe/>, name:'Wardrobe'}];

const initialState = {
    products: [
        {
            name: 'Beds' ,
            quantity: 0,
            size: 1.2
        },
        {
            name: 'Refri' ,
            quantity: 0,
            size: 1
        },
        {
            name: 'Furniture' ,
            quantity: 0,
            size: 0.5
        },
        {
            name: 'Oven' ,
            quantity: 0,
            size: 0.6
        },
        {
            name: 'Sofa' ,
            quantity: 0,
            size: 1.5
        },
        {
            name: 'Tv' ,
            quantity: 0,
            size: 0.25
        },
        {
            name: 'Washer' ,
            quantity: 0,
            size: 0.5
        },
        {
            name: 'Dining' ,
            quantity: 0,
            size: 2
        },
        {
            name: 'Desk' ,
            quantity: 0,
            size: 0.75
        },
        {
            name: 'Wardrobe' ,
            quantity: 0,
            size: 3.2
        }
    ],
    quotation: {
        totalItems: 0,
        totalSpace: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
        due: 0
    }
}

const ADD_ITEM = 'ADD_ITEM';
const REM_ITEM = 'REM_ITEM';
const CALC_QUOTA = 'CALC_QUOTA';
const CLEAR_FIELDS = 'CLEAR_FIELDS';
const TAX = .16;
const PRICE_M2 = 200;
const DEPO_PORCENT = 2;
const CERO = 0;
const ONE = 1;
const TEN = 10;

const quotationReducer = (state, action) => {

    const totalItems = (arr) => arr.reduce((acc, item) => acc+=item.quantity , CERO) ;
    const totalSpace = (arr) => arr.reduce((acc, item) => acc+=(item.size * item.quantity) , CERO) ;
    const subtotal = (arr) => (totalSpace(arr) * PRICE_M2) ;
    const getTax = (arr) => subtotal(arr) * TAX ;
    const total = (arr) => subtotal(arr) + getTax(arr) ;
    const due = (arr) => total(arr) / DEPO_PORCENT ;
    const rounded = (val) => Math.round(val * TEN) / TEN;

    switch (action.type) {
        case ADD_ITEM:  
            return{
                ...state,
                products: state.products.map((item) => 
                    item.name === action.payload.name ?
                        {
                            ...item,
                            quantity: item.quantity + ONE
                        }
                    : 
                    item
                ),
            }
        case REM_ITEM:  
        return{
            ...state,
            products: state.products.map((item) => 
                item.name === action.payload.name && item.quantity > CERO ?
                    {
                        ...item,
                        quantity: item.quantity - ONE
                    }
                : 
                item
            ),
        }
        case CLEAR_FIELDS:
            return initialState;
        case CALC_QUOTA:
            return{
                ...state,
                quotation: {
                    totalItems: totalItems(state.products),
                    totalSpace: totalSpace(state.products),
                    subtotal: rounded(subtotal(state.products)),
                    tax: rounded(getTax(state.products)),
                    total: rounded(total(state.products)),
                    due: rounded(due(state.products)) 
                }
            }
        default:
            return state;
    }
}

const Quotation = () => {

    const txtVal = useRef();

    const [state, dispatch] = useReducer(quotationReducer, initialState);

    const addelProd = (action, item) => {
        if(action === 'add'){
            dispatch({
                type: ADD_ITEM,
                payload: {
                    name: item
                }
            });
        }else{
            dispatch({
                type: REM_ITEM,
                payload: {
                    name: item
                }
            });
        }
        dispatch({type: CALC_QUOTA});
    }

    const clearFields = () => {
        dispatch({type: CLEAR_FIELDS});
        txtVal.current.value = ''
    }

    return (
        <section className='quota-content'>
            <h1>What items to store?</h1>
            <p>Select which items you wish to store before 
            moving to your new home. We’ll keep ’em safe!</p>

            <div className='quota-items'>
                {
                    icons.map((itemIco, index) => {
                        return(
                            <div key={index} className='quota-card'>
                                <div className='quota-card-image'>
                                    <React.Fragment>
                                        {itemIco.obj}
                                    </React.Fragment>
                                    <span>{itemIco.name}</span>
                                </div>
                                <div className='quota-card-ctrl'>
                                    <button onClick={ () => addelProd('del', itemIco.name)}> - </button>
                                    <input type='text' value={state.products[index].quantity} ref={txtVal} readOnly></input>
                                    <button onClick={ () => addelProd('add', itemIco.name)}> + </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='quota-actions'>
                <button onClick={ () => clearFields() }>Clear</button>
                <button onClick={ () => dispatch({type: CALC_QUOTA}) }>Calculate</button>
            </div>
            <div className='quota-summary'>
                <h2>Summary</h2>
                <div className='quota-summary-items'>
                    <div>
                        <span>Total items</span>
                        <span>{state.quotation.totalItems}</span>
                    </div>
                    <div>
                        <span>Total M</span>
                        <span>{state.quotation.totalSpace}</span>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>${state.quotation.subtotal}</span>
                    </div>
                    <div>
                        <span>Tax</span>
                        <span>${state.quotation.tax}</span>
                    </div>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Total</span>
                        <span style={{fontWeight: 'bold'}}>${state.quotation.total}</span>
                    </div>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Due Today CERO%</span>
                        <span style={{fontWeight: 'bold'}}>${state.quotation.due}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Quotation;
