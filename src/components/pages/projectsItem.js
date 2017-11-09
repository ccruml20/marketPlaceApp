import React, { Component } from 'react'
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCartItem} from '../../actions/cartActions';


class ProjectItem extends Component {

  handleCart(){
    const project = [...this.props.cart, {
      _id: this.props._id,
      title:this.props.title,
      description:this.props.description,
      images: this.props.images,
      price:this.props.price,
      quantity: 1
    }]

    //Check if cart is Empty
    if(this.props.cart.length > 0 ){
      let _id = this.props._id;

      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      })
      if (cartIndex === -1){
        this.props.addToCart(project);
      }else{
        //update quantity
        this.props.updateCartItem(_id, 1, this.props.cart)
      }
    }else {
      this.props.addToCart(project)
    }
  }
  constructor(){
    super();
    this.state = {
      isClicked: false
    };
  }

  onReadMore(){
    this.setState({isClicked: true})
  }
  render() {
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4} md={12}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.description.length > 50 && this.state.isClicked === false) ? (this.props.description.substring(0, 250)) : (this.props.description)}
              <button className="link" onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description.length > 50) ? ('...read more') : ('')}
              </button>
            </p>
            <h6>$ {this.props.price}</h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return{
    cart: state.cart.cart
  }
}
function mapDispathToProps(dispatch) {
  return bindActionCreators({
    addToCart:addToCart,
    updateCartItem: updateCartItem
  }, dispatch)
}
export default connect(mapStateToProps, mapDispathToProps)(ProjectItem);
