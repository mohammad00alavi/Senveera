import "./channel.css";
import { ReactComponent as CoolerWater } from "../svg/cooler-water.svg";
import { ReactComponent as CoolerSlow } from "../svg/cooler-slow.svg";
import { ReactComponent as CoolerFast } from "../svg/cooler-fast.svg";
import { ReactComponent as WindowShadeOpen } from "../svg/window-shade-open.svg";
import { ReactComponent as WindowShadeClose } from "../svg/window-shade-close.svg";
import { ReactComponent as WindowShadePause } from "../svg/window-shade-pause.svg";
import { ReactComponent as LampIcon } from "../svg/lamp-icon.svg";


function Channel(props) {
  function windowNameRender() {
    if (props.data["pin"] === 0) {
      return "باز";
    } else if (props.data["pin"] === 1) {
      return "متوقف";
    } else {
      return "بسته";
    }
  }

  function windowSVG() {
    if (props.data["pin"] === 0) {
      return <WindowShadeOpen />;
    } else if (props.data["pin"] === 1) {
      return <WindowShadePause />;
    } else {
      return <WindowShadeClose />;
    }
  }

  function coolerSVG() {
    if (props.data["pin"] === 0) {
      return <CoolerWater />;
    } else if (props.data["pin"] === 1) {
      return <CoolerSlow />;
    } else {
      return <CoolerFast />;
    }
  }

  // console.log(props.handleFunc)
  if (
    props.mode === 1 ||
    props.mode === 2 ||
    props.mode === 3 ||
    props.mode === 4 ||
    props.mode === 9 ||
    props.mode === 14
  ) {
    return (

      // Old Version

      // <span
      //   key={props.data["id"]}
      //   className={`${
      //     props.data["status"] === "1"
      //       ? "channelBtnActive channelLight"
      //       : "channelLight"
      //   }`}
      // >
      //   <span
      //     id={`${props.data["id"]}-${props.data["status"]}`}
      //     onClick={props.handleFunc}
      //   ></span>
      //   {props.data["name"]}
      // </span>

      // New Version with Lamp Icon

      <span
        key={props.data["id"]}
        className={`${props.data["status"] === "1"? "lampActive lamp": "lamp"}`}>
        <span
          id={`${props.data["id"]}-${props.data["status"]}`}
          onClick={props.handleFunc}
        >
        </span>
        <LampIcon/>
        {props.data["name"]}
      </span>
    );
  } else if (props.mode === 6) {
    return (
      <div
        className={`windowChannelGroup  ${
          props.data["status"] === "1" ? "windowBtnActive" : ""
        }`}
      >
        {windowSVG()}
        <p>{windowNameRender()}</p>
        <span
          key={props.data["id"]}
          id={`${props.data["id"]}-${props.data["status"]}`}
          onClick={props.handleFunc}
        ></span>
      </div>
    );
  }
  else if (props.mode === 5) {
    return (
      <div
        className={`coolerChannelGroup  ${
          props.data["status"] === "1" ? "coolerBtnActive" : ""
        }`}
      >
        {coolerSVG()}
        <span
          key={props.data["id"]}
          id={`${props.data["id"]}-${props.data["status"]}`}
          onClick={props.handleFunc}
        ></span>
      </div>
    );
  }
}

export default Channel;
