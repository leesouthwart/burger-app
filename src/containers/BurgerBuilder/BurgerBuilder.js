import React from 'react';
import { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 2,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        
        
        const sum = Object.keys(ingredients).map(
        igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
        this.setState({ state: this.state});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; // Getting the count of the ingredient 
        const updatedCount = oldCount + 1;  // Adding 1
        const updatedIngredients = {        // Getting current state for all ingredients
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; // Updating the state of single ingredient to the new count.
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; // Getting the count of the ingredient
        if (oldCount <= 0) {
            return;
        } 
        const updatedCount = oldCount - 1;  // Adding 1
        const updatedIngredients = {        // Getting current state for all ingredients
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; // Updating the state of single ingredient to the new count.
        const priceDeduction= INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls price={this.state.totalPrice} ingredientRemoved={this.removeIngredientHandler} ingredientAdded={this.addIngredientHandler}
                disabled={disabledInfo}
                purchasing={this.state.purchasing}
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable} />

            </Aux>
        )
    };
}

export default BurgerBuilder;