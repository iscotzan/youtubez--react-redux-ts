import React from 'react';
import {RootState} from './store';
import {loadProducts} from './store/modules/products';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

const mapStateToProps = (state: RootState) => ({
    cart: state.products.cart,
});
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            loadProducts,
        },
        dispatch
    );
};
type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;
const UnconnectedProducts: React.FC<Props> = props => {
    // Do cart things here!
    return <>Your Cart</>;
};
export const Products = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedProducts);