import { ReactComponent as Dashboard } from "../svg/dashboard.svg";
import { ReactComponent as Management } from "../svg/management.svg";
import { ReactComponent as Scenario } from "../svg/scenario.svg";
import { ReactComponent as Setting } from "../svg/setting.svg";

function TabBarButton(props) {
  function tabBarButtonSVGRender() {
    switch (props.svg) {
      case "dashboard":
        return <Dashboard />;
      case "management":
        return <Management />;
      case "scenario":
        return <Scenario />;
      case "setting":
        return <Setting />;
      default:
    }
  }
  return (
    <>
      <li className={props.page === props.alt ? "currentPage" : ""}>
        {tabBarButtonSVGRender()}
        <p>{props.title}</p>
      </li>
    </>
  );
}

export default TabBarButton;
