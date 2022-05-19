import React from 'react'

export default function Rating(props) {
    const { rating, numReviews, caption } = props;

    function declOfNum(number, titles) {  
        let cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }
    
    return (
        <div className="rating">
            <span> <i className={rating >= 1 ? "fa fa-star" : rating > 0.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={rating >= 2 ? "fa fa-star" : rating > 1.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={rating >= 3 ? "fa fa-star" : rating > 2.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={rating >= 4 ? "fa fa-star" : rating > 3.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>
            <span> <i className={rating >= 5 ? "fa fa-star" : rating > 4.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'}></i> </span>


            {caption ? (
                <span>{caption}</span>
              ) : (
                <span>{numReviews +  ' ' + declOfNum(numReviews,['отзыв','отзыва','отзывов'])}</span>
              )}

        </div>
    )
}
