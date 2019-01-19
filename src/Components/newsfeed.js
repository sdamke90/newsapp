import React, {Component} from 'react';
import { fetchNews } from "../actions"; 
import { connect } from 'react-redux';

import { Card,
   CardText,
   CardBody,
   CardTitle,
   CardSubtitle,
   CardImg,
   CardColumns,
   CardLink
} from 'reactstrap';


class Newsfeed extends Component{

    constructor(props){
        super(props);

        this.state = {
           currentPage: 1,
           newsPerPage : 10
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const country = this.props.country;
        this.props.fetchNews({country});
    }

    componentDidUpdate(prevProps) {
        if(this.props.country !== prevProps.country){
            const country = this.props.country;
            this.props.fetchNews({country});
        }
        if(this.props.news !== prevProps.news){
            this.setState({currentPage: 1});
        }
    }

    displayNews(n, k){
        const d = new Date(n.publishedAt);
        const time = d.toDateString() + " " + d.toLocaleTimeString();
    
        return(
            <div key={k}>
             <Card>
                  <CardImg className="img-fluid" src={n.urlToImage}/>
                    <CardBody>
                      <CardTitle className="h3"><a className="newsLinks" href={n.url} rel="noopener noreferrer" target="_blank">{n.title}</a></CardTitle>
                      <CardSubtitle className="text-muted">{n.source.name}</CardSubtitle>
                      <CardSubtitle className="text-muted mt-1">{time}</CardSubtitle>
                      <CardText className="lead">{n.description}</CardText>
                      <CardLink href={n.url} rel="noopener noreferrer" target="_blank">Read More</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    }

    handleClick(e){
      this.setState({
          currentPage: Number(e.target.id)
      });
    }

       pageNumbers(length){
        const pageNumbers = [];
        const totalPages = Math.ceil(length / (this.state.newsPerPage));
      
        for(let i=1; i <= totalPages; ++i){
            pageNumbers.push(i);
        }
  
        const showPageNumber = pageNumbers.map( num => {
            var classes = "pageNumber";
            if(num === this.state.currentPage){
                classes = classes+ " activePageNumber"
            }
            return(
                <li key={num} onClick={this.handleClick} id={num} className={classes}>
                    {num}
                </li>
            )
        });


        return(<div className="pageListDiv">
            <ul className="pageList mx-auto">
                {showPageNumber}
            </ul>
        </div>)
    }

    render(){
        if(this.props.news){
            const {currentPage, newsPerPage} = this.state;
            const newsData = this.props.news.data;  
            const to = currentPage * newsPerPage;
            const from = to - newsPerPage;
            const newsOnCurrentPage = newsData.articles.slice(from,to);
            var k = 0;
            const news = newsOnCurrentPage.map((n) =>
                this.displayNews(n, ++k)
            );

            return(
                <div className="container mt-4">
                 <CardColumns>
                  {news}
                 </CardColumns>
                  {this.pageNumbers(newsData.articles.length)}
                </div>
            );
        }

        return(<div>Loading.....</div>)
    }
}

const mapStateToProps = (state) => {
    return {
        news : state.news,
        country: state.country
    };
}

export default connect(mapStateToProps,{fetchNews})(Newsfeed);