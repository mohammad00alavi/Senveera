import TabBarButton from "./TabBarButton";
import "./tabBar.css";

const TabrBarSVG = [
  { btn: "dashboard", title: "داشبورد", alt: "dashboard" },
  { btn: "management", title: "مدیریت", alt: "management" },
  { btn: "scenario", title: "سناریو", alt: "scenario" },
  { btn: "setting", title: "تنظیمات", alt: "setting" },
];

function TabBar(props) {
  return (
    <div id="tabBar">
      <ul>
        {TabrBarSVG.map((obj) => (
          <TabBarButton
            page={props.page}
            title={obj.title}
            alt={obj.alt}
            svg={obj.btn}
          />
        ))}
      </ul>
    </div>
  );
}

export default TabBar;
