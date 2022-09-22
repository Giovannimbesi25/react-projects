import useFetch from "../../hooks/useFeatch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {data, loading, error} = useFetch("/hotels?featured=true&limit=4")


  return (
    <div className="fp">
    { loading ? (
      "Loading featured" 
    ) :
    ( <>
      {data.map(item=>(
        <div className="fpItem" key={item._id}>
          {
            item.photos.length > 0 ? 
            (<img
            alt=""
            className="fpImg"
            src={item.photos[0]}/>
            ) : (         
            <img
            alt=""
            className="fpImg"
            src= "https://as2.ftcdn.net/v2/jpg/03/08/68/19/1000_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg" />
            )}
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          { item.rating &&
          <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
      ))}
      

      </>
    )}
    </div>
  );
};

export default FeaturedProperties;
