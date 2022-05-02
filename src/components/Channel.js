import SVGPack from "./SVGPack";
import SVGInject from "@iconfu/svg-inject";

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
      return SVGPack.windowShadeOpen;
    } else if (props.data["pin"] === 1) {
      return SVGPack.windowShadePause;
    } else {
      return SVGPack.windowShadeClose;
    }
  }

  function coolerSVG() {
    if (props.data["pin"] === 0) {
      return SVGPack.coolerWater;
    } else if (props.data["pin"] === 1) {
      return SVGPack.coolerSlow;
    } else {
      return SVGPack.coolerFast;
    }
  }

  // console.log(props.handleFunc)
  if (props.mode === 4 ) {
    return (
      <span
        // key={`${quickAccessChannels[0].id + index}`}
        key={props.data["id"]}
        id={`${props.data["id"]}-${props.data["status"]}`}
        onClick={props.handleFunc}
        className={`${
          props.data["status"] === "1"
            ? "channelBtnActive channelLight"
            : "channelLight"
        }`}
      >
        {props.data["name"]}
      </span>
    );
  } else if (props.mode === 6) {
    return (
      <div className={`windowChannelGroup  ${props.data['status'] === '1' ? 'windowBtnActive' : ''}`}>
        <img
          src={windowSVG()}
          alt={`${props.alt}-icon`}
          onLoad={(e) => SVGInject(e.target)}
        />
        <span
          key={props.data["id"]}
          id={`${props.data["id"]}-${props.data["status"]}`}
          onClick={props.handleFunc}
        >
          {windowNameRender()}
        </span>
      </div>
    );
  } else if (props.mode === 1) {
    return(
      <span
        // key={`${quickAccessChannels[0].id + index}`}
        key={props.data["id"]}
        id={`${props.data["id"]}-${props.data["status"]}`}
        onClick={props.handleFunc}
        className={`${
          props.data["status"] === "1"
            ? "channelBtnActive channelLight"
            : "channelLight"
        }`}
      >
        {props.data["name"]}
      </span>
    )
  }else if (props.mode === 5) {
    return (
      <div className={`coolerChannelGroup  ${props.data['status'] === '1' ? 'coolerBtnActive' : ''}`}>
        <img
          src={coolerSVG()}
          alt={`${props.alt}-icon`}
          onLoad={(e) => SVGInject(e.target)}
        />
        <span
          key={props.data["id"]}
          id={`${props.data["id"]}-${props.data["status"]}`}
          onClick={props.handleFunc}
        >
        </span>
      </div>
    );
  }
}

export default Channel;
