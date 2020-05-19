import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardImgOverlay, CardTitle } from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);
    }

    renderDish(dish){
        return(
            <Card>
                <CardImg width = "100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments){
        if(comments == null){
            return(
                <div></div>
            );
        }
        const comm = comments.map((comment) => {
            return(
                <li key={comment.id}>
                    <ul className='list-unstyled'>
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                </li>
            );
        });

        return(
            <div className='Container'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {comm}
                </ul>
            </div>
        );
    }

    render(){
        if(this.props.selectedDish == null){
            return(
                <div className = 'row'></div>
            );
        }
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            </div>
        );
    };

}

export default DishDetail;