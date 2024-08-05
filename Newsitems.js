import React, { Component } from 'react';

export   class Newsitems extends Component {
  
  render() {
   let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
      <div className= "my-3">
     
     <div   className="card" >
        <img src={!imageUrl?"https://images.cnbctv18.com/uploads/2024/04/options-trading-2024-04-c3a539bb4d6aecf6495aa9cdfaee05c1.jpg":imageUrl}  className="card-img-top" alt="news"/>
        <div   className="card-body">
         <h5   className="card-title">{title}</h5>
         <p   className="card-text">{description}....</p>
         <p className="card-text"><small className='text-muted'>By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>

           <a rel="noreferrer"  href={newsUrl}   className="btn btn-sm btn-dark">Read More</a>
        </div>
     </div>
      </div>
    )
  }
}



    

export default Newsitems