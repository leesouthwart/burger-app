import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>£{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl added={() => props.ingredientAdded(ctrl.type)} removed={() => props.ingredientRemoved(ctrl.type)} 
            key={ctrl.label} label={ctrl.label} disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}>ORDER NOW</button>
    </div>
)

export default buildControls;