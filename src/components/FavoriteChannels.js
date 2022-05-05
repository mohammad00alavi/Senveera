import { ReactComponent as AddFavoriteButton } from "../svg/plus.svg";

function FavoriteChannels() {
  return (
    <div className="favorite-equipments">
      <div>
        <h3>مورد علاقه ها</h3>
        <AddFavoriteButton className="plusBtn" />
      </div>
    </div>
  );
}

export default FavoriteChannels;
