import SVGInject from "@iconfu/svg-inject";

function TabBarButton(props) {
  return (
    <>
      <li className={props.page === props.alt ? "currentPage" : ""}>
        <img
          src={props.svg}
          alt={`${props.alt}-icon`}
          onLoad={(e) => SVGInject(e.target)}
        />
        <p>{props.title}</p>
      </li>
    </>
  );
}

export default TabBarButton;
