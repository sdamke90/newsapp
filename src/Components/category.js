import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setCategory} from '../actions';

class Category extends Component{
    constructor(props){
        super(props);
        this.state ={
          activeLink : 'general'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    

    componentDidUpdate(prevProps){
        if(this.props.country !== prevProps.country) {
            this.setState({
            activeLink: 'general'
           })
        }
    }

    handleClick(e){
       this.props.setCategory(e.target.id , this.props.country);
       this.setState({
         activeLink: e.target.id
       })
    }
    
    displayCategory(category){
      var classes = "categoryItem mr-3"
      if(category === this.state.activeLink){
         classes = classes + " active";
      }
      return(<li className={classes} id={category} key={category} onClick={this.handleClick}>
          {category.charAt(0).toUpperCase() + category.slice(1) }
      </li>)
    }

    render(){
        const allCategories = ["general", "business", "entertainment", "health", "science", "sports", "technology"]
        const categories = allCategories.map((category) => 
              this.displayCategory(category)
        );
        return(
            <div className="d-flex bg-secondary">
                <div className="container">
                   <ul className="categoryList">
                       {categories}
                   </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return{
    country: state.country
  };
}

export default connect(mapStateToProps,{setCategory})(Category);