import React from 'react';
import { Card, CardImg, CardBody, CardText, CardImgOverlay, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}){
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

function RenderComments({comments}){
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

const DishDetail = (props) => {
    if(props.selectedDish == null){
        return(
            <div className = 'row'></div>
        );
    }
    return(
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.selectedDish.name}</h3>
                    <hr /> 
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish = {props.selectedDish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments comments = {props.comments} />
                </div>
            </div>
        </div>
    );
};



export default DishDetail;