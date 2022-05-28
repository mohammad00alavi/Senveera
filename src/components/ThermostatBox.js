import "./thermostatBox.css";
import "./channelBox.css";
import "./channel.css";
import { ReactComponent as AddFavoriteButton } from "../svg/plus.svg";
import { ReactComponent as MinusButton } from "../svg/minus.svg";
import { ReactComponent as TemperatureSVG } from "../svg/temperature.svg";
import { ReactComponent as Power } from "../svg/power.svg";
import { ReactComponent as Fan } from "../svg/thermo-fan.svg";

function ThermostatBox(props) {
  // 192.168.1.166/Termoostat/api/changeTermoostat/?fan=1&temp=20&iscool=true&issleep=true&id=714949
  let fan, setTemp, isCool, isSleep, thermId;
  thermId = props.data["packId"];
  fan = props.data["tblPackage_pin"][0]["strStatus"]["fan"];
  isCool = props.data["tblPackage_pin"][0]["strStatus"]["IsCool"];
  setTemp = props.data["tblPackage_pin"][0]["strStatus"]["settedtemp"];
  isSleep = props.data["tblPackage_pin"][0]["strStatus"]["IsSleep"];

  return (
    <div className="thermostatBox" key={props.data["packid"]}>
      <span>{props.name}</span>
      <div className="stateContainer">
        <div>
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-isCool-false`}
            onClick={props.handleFunc}
            className={`${
              props.data["tblPackage_pin"][0]["strStatus"]["IsCool"] === "false"
                ? "stateActive"
                : ""
            }`}
          >
            گرمایشی
          </span>
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-isCool-true`}
            onClick={props.handleFunc}
            className={`${
              props.data["tblPackage_pin"][0]["strStatus"]["IsCool"] === "true"
                ? "stateActive"
                : ""
            }`}
          >
            سرمایشی
          </span>
        </div>
        <span>
          دمای محیط {props.data["tblPackage_pin"][0]["strStatus"]["Temp"]}
          &deg;C
        </span>
        <span
          id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-isSleep-true`}
          onClick={props.handleFunc}
          className={`${
            props.data["tblPackage_pin"][0]["strStatus"]["IsSleep"] === "true"
              ? "sleepActive sleepBtn"
              : "sleepBtn"
          }`}
        >
          حالت خواب
        </span>
      </div>
      <div className="channelGroup thermostatChanneslGroup">
        <span
          className={`${
            fan === "1"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-1`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-1`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          فن 1
        </span>
        <span
          className={`${
            fan === "2"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-2`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-2`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          فن 2
        </span>
        <span
          className={`${
            fan === "3"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-3`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-3`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          فن 3
        </span>
        <span
          className={`${
            fan === "0"
              ? "thermoFanActive thermoFan thermoBtn"
              : "thermoFan thermoBtn"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-3`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-0`}
            onClick={props.handleFunc}
          ></span>
          <Fan />
          اتومات
        </span>
        <span
          className={`${
            fan === "4"
              ? "thermoPowerActive thermoBtn thermoPower"
              : "thermoBtn thermoPower"
          }`}
          // id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-4`}
          // onClick={props.handleFunc}
        >
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-fanSpeed-4`}
            onClick={props.handleFunc}
          ></span>
          <Power />
          خاموش
        </span>
      </div>
      <div className="setTempContainer">
        <div className="thermostatBtn">
          <AddFavoriteButton />
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-temp-increase`}
            onClick={props.handleFunc}
          ></span>
        </div>
        <div>
          <span>
            {props.data["tblPackage_pin"][0]["strStatus"]["settedtemp"]}
            <span>&deg;C</span>
          </span>
          <TemperatureSVG />
        </div>
        <div className="thermostatBtn">
          <MinusButton />
          <span
            id={`${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-temp-decrease`}
            onClick={props.handleFunc}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default ThermostatBox;
