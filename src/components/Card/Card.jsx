import React from "react";
import { Link } from "react-router-dom";
import constants from "../../helpers/constants";
import "./Card.scss";

export function Card({ type, data}) {
  const renderItem = (itemType, id, title, image) => (
    <Link to={`/${itemType}/${id}`}>
      <div className="card">
        <div 
          className="card-cover"
          style={
            image ? { backgroundImage: `url('${constants.IMAGE_BASE_URL}${image}')`} :
            { backgroundImage: `url('${constants.DEFAULT_IMAGE}')`}
          }
        />
        <div className="card-body">
          <div className="card-detail">
            <div className="card-title">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );

  const renderSearchItem = () => {
    const { title, name, poster_path, profile_path, id } = data;
    if(type === "person") {
      return renderItem("person", id, name, profile_path);
    }
    if(type === "tv") {
      return renderItem("tv", id, name, poster_path);
    }
    return renderItem("movie", id, title, poster_path);
  };


  return <div className="search-item">{renderSearchItem()}</div>;
}