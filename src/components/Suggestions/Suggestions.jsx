import { Divider, List } from "antd";
import { useSelector } from "react-redux";
import { getSuggestions } from "../../app/reducer";

export function Suggestions({ handleClick }) {
  const suggestions = useSelector(getSuggestions);
  const { movies, actors, shows } = suggestions;

  const renderList = (title, type, arr) => {
    const newarr = arr.slice(0, 3);
    if(newarr.length) {
      return(
        <>
          <Divider orientation="left">{title}</Divider>
          <List 
            bordered
            dataSource={newarr}
            renderItem={(item) => {
              <List.Item onClick={() => handleClick(`/${type}/${item.id}`)}>
                {item.title || item.name}
              </List.Item>
            }}
          />
        </>
      );
    }
  };

  return (
    <div>
      <>
        {renderList("Movies", "movie", movies)}
        {renderList("Actors", "person", actors)}
        {renderList("Shows", "tv", shows)}
      </>
    </div>
  )
}