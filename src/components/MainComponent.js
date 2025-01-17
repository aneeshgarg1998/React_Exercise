import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, postComment, fetchLeads, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, ratting, author, comment) => dispatch(postComment(dishId, ratting, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeads: () => dispatch(fetchLeads()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeads();
  }

  render(){

    const HomePage = () => {
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
                dishesLoading = {this.props.dishes.isLoading} 
                dishesErrMess = {this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promosLoading = {this.props.promotions.isLoading} 
                promosErrMess = {this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadsLoading = {this.props.leaders.isLoading} 
                leadsErrMess = {this.props.leaders.errMess}
            />
        );
    }

    const DishWithId = ({match}) => {
        return(
            <DishDetail selectedDish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
                isLoading = {this.props.dishes.isLoading} 
                errMess = {this.props.dishes.errMess}
               comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
               CommentsErrMess = {this.props.comments.errMess}
               postComment = {this.props.postComment} />
        );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path='/home' component={HomePage}/>
                <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>}/>
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback} />} />
                <Redirect to='home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));