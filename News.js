import React, { Component } from 'react';
import Newsitems from './Newsitems';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps ={
    country:'in',
    pageSize:8,
    category:'sports'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title=`  ${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=355dd1d0634e4abe82642941d828831d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalresults:parsedData.totalResults,loading :false})
    
    this.props.setProgress(100);
  }

 async componentDidMount(){
   
     this.updateNews();
 
  }

    handlePrevClick= async()=>{
 

   this.setState({page:this.state.page-1});
   this.updateNews();
    }

    handleNextClick=async()=>{
  
  this.setState({page:this.state.page+1});
  this.updateNews();

  }
  fetchMoreData = async() => {
  
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=355dd1d0634e4abe82642941d828831d&page=1&pageSize=${this.props.pageSize}`;
   
    let data = await fetch(url);
    let parsedData=await data.json()
    
    this.setState({articles:this.state.articles.concat(parsedData.articles), totalresults:parsedData.totalResults})

  };


  render() {
    
    return (
      <>
        <h1 className='text-center'>NewsMonkey -Top{this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
      { this.state.loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        >
    <div className='container'>  
       
     <div className="row">
     {  this.state.articles.map((element)=>{
      return  <div className="col-md-4" key={element.url} >
      <Newsitems  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}  imageUrl={element.urlToImage} newsUrl={element.url}  author={element.author} date={element.publishedAt}/>
      </div>
    
     })}
     </div>  

     </div>

     </InfiniteScroll>
  
    
     </>
    ) 
  }
}

export default News