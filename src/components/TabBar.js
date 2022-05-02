import TabBarButton from "./TabBarButton";
import "./tabBar.css";
import SVGPack from "./SVGPack";

const TabrBarSVG = [
  { btn: SVGPack.dashboard, title: "داشبورد", alt: "dashboard" },
  { btn: SVGPack.management, title: "مدیریت", alt: "management" },
  { btn: SVGPack.scenario, title: "سناریو", alt: "scenario" },
  { btn: SVGPack.setting, title: "تنظیمات", alt: "setting" },
];

function TabBar(props) {
  return (
    <div id="tabBar">
      <ul>
        {TabrBarSVG.map((obj) => (
          <TabBarButton
            page={props.page}
            title={obj.title}
            svg={obj.btn}
            alt={obj.alt}
          />
        ))}
      </ul>
    </div>
  );
}

export default TabBar;
