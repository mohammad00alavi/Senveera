import "./thermostatBox.css";
import "./channelBox.css";
import "./channel.css";
import "./irBox.css";
import { ReactComponent as AddFavoriteButton } from "../svg/plus.svg";
import { ReactComponent as MinusButton } from "../svg/minus.svg";
import { ReactComponent as TemperatureSVG } from "../svg/temperature.svg";
import { ReactComponent as Power } from "../svg/irCooler-power.svg";
import { ReactComponent as Fan } from "../svg/thermo-fan.svg";
import { ReactComponent as Winter } from "../svg/Winter_light.svg";
import { ReactComponent as Sun } from "../svg/Sun_light.svg";
import { ReactComponent as Auto } from "../svg/Temperature_light.svg";
import { ReactComponent as Turbine } from "../svg/Turbine_light.svg";
import { ReactComponent as Humidity } from "../svg/Humidity_light.svg";

function IRBox(props) {
  // 192.168.1.166/Termoostat/api/changeTermoostat/?fan=1&temp=20&iscool=true&issleep=true&id=714949

  let fan, power, mode, degree, irId;
  irId = props.data["id"];
  fan = props.data["strStatus"]["fan"];
  mode = props.data["strStatus"]["mode"];
  degree = props.data["strStatus"]["degree"];
  power = props.data["strStatus"]["Power"];

  const modeHeading = () => {
    switch (mode) {
      case "0":
        return "سرمایشی";
      case "1":
        return "خشک";
      case "2":
        return "فن";
      case "3":
        return "گرمایشی";
      case "4":
        return "اتومات";
      default:
    }
  };

  return (
    <div className="thermostatBox irCoolerBox" key={props.data["id"]}>
      <div className="irCoolerHeader">
        <span>{props.data["name"]}</span>
        {/* دمای محیط */}
        {props.data["strStatus"]["Temp"] === true ? (
          <span className="irCoolerTemp">
            دمای محیط {props.data["strStatus"]["Temp"]}
            &deg;C
            <TemperatureSVG />
          </span>
        ) : (
          ""
        )}
        <span
          className={`${
            power === "false"
              ? "irCoolerPowerActive irCoolerPower"
              : "irCoolerPower"
          }`}
        >
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-power-null`}
            onClick={props.handleFunc}
          ></span>
          <Power />
        </span>
      </div>

      <div className="modeHeading">
        <h4>{modeHeading()}</h4>
      </div>

      <div className="stateContainer">
        <div>
          <span
            className={`${
              mode === "0" ? "irCoolerModeActive irCoolerMode" : "irCoolerMode"
            }`}
          >
            <span
              id={`${fan}-${degree}-${power}-${mode}-${irId}-irCoolerMode-0`}
              onClick={props.handleFunc}
            ></span>
            <Winter />
          </span>
          <span
            className={`${
              mode === "3" ? "irCoolerModeActive irCoolerMode" : "irCoolerMode"
            }`}
          >
            <span
              id={`${fan}-${degree}-${power}-${mode}-${irId}-irCoolerMode-3`}
              onClick={props.handleFunc}
            ></span>
            <Sun />
          </span>
          <span
            className={`${
              mode === "4" ? "irCoolerModeActive irCoolerMode" : "irCoolerMode"
            }`}
          >
            <span
              id={`${fan}-${degree}-${power}-${mode}-${irId}-irCoolerMode-4`}
              onClick={props.handleFunc}
            ></span>
            <Auto />
          </span>
          <span
            className={`${
              mode === "2" ? "irCoolerModeActive irCoolerMode" : "irCoolerMode"
            }`}
          >
            <span
              id={`${fan}-${degree}-${power}-${mode}-${irId}-irCoolerMode-2`}
              onClick={props.handleFunc}
            ></span>
            <Turbine />
          </span>
          <span
            className={`${
              mode === "1" ? "irCoolerModeActive irCoolerMode" : "irCoolerMode"
            }`}
          >
            <span
              id={`${fan}-${degree}-${power}-${mode}-${irId}-irCoolerMode-1`}
              onClick={props.handleFunc}
            ></span>
            <Humidity />
          </span>
        </div>

        {/* <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-isSleep-false`}
            onClick={props.handleFunc}
            className={`${
              props.data["tblPackage_pin"][0]["strStatus"]["IsSleep"] === "true"
                ? "sleepActive sleepBtn"
                : "sleepBtn"
            }`}
          >
            حالت خواب
          </span> */}
      </div>
      <div className="channelGroup thermostatChanneslGroup">
        <span
          className={`${
            fan === "1"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${irId}-fanSpeed-1`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-fanSpeed-1`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          کم
        </span>
        <span
          className={`${
            fan === "2"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${irId}-fanSpeed-2`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-fanSpeed-2`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          متوسط
        </span>
        <span
          className={`${
            fan === "3"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${irId}-fanSpeed-3`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-fanSpeed-3`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          زیاد
        </span>
        <span
          className={`${
            fan === "4"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${irId}-fanSpeed-3`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-fanSpeed-4`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          اتومات
        </span>
      </div>
      <div className="setTempContainer">
        <div className="thermostatBtn">
          <AddFavoriteButton />
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-temp-increase`}
            onClick={props.handleFunc}
          ></span>
        </div>
        <div>
          <span>
            {degree}
            <span>&deg;C</span>
          </span>
          <TemperatureSVG />
        </div>
        <div className="thermostatBtn">
          <MinusButton />
          <span
            id={`${fan}-${degree}-${power}-${mode}-${irId}-temp-decrease`}
            onClick={props.handleFunc}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default IRBox;
