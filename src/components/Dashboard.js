import React, { useState, useEffect } from "react";
import ChannelBox from "./ChannelBox";
import ThermostatBox from "./ThermostatBox";
import IRBox from "./IRBox";
import TabBar from "./TabBar";
// import SVGPack from "./SVGPack";
import "./dashboard.css";
// import localIP from './ip-address.js'
import { ReactComponent as RefreshButton } from "../svg/arrow-rotate-right-solid.svg";
import { ReactComponent as SenveeraLogo } from "../svg/logo-2.svg";
import { ReactComponent as SettingIcon } from "../svg/3-dots-setting.svg";
// import FavoriteChannels from "./FavoriteChannels";

function Dashboard() {
  // Declare Hooks

  let [jsonData, setJsonData] = useState([]),
    [btnActive, setBtnActive] = useState({ home: true, out: false }),
    [refreshBtn, setRefreshBtn] = useState("");

  // Declare Variables

  // let localIP = "http://192.168.4.1"
  let localIP = localStorage.getItem("ip-address"),
    localUrl = `${localIP}/DeviceList1`,
    otherModes = [],
    otherModesData,
    otherModesFromAPI = [],
    thermostat = [],
    thermostatData,
    thermostatFromAPI = [],
    ir = [],
    irData,
    irFromAPI = [],
    strModesFromAPI = [];

  useEffect(() => {
    fetch(`${localUrl}`)
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch(function () {
        return console.log("error");
      });
  }, []);

  // Handle Refresh

  const handleRefresh = () => {
    setRefreshBtn("refreshBtnActive");
    setTimeout(() => {
      setRefreshBtn("");
    }, 1000);
  };

  const handleGetAPI = () => {
    handleRefresh();
    setJsonData([]);
    fetch(`${localUrl}`)
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch(function () {
        return console.log("error");
      });
  };

  // Data Structure
  // With this function we structure our jsonData into an array.
  // we should also make other arrays for other modes

  const seperationOfData = () => {
    if (jsonData.length !== 0) {
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].hasOwnProperty("p")) {
          otherModesFromAPI.push(jsonData[i]);
        } else {
          strModesFromAPI.push(jsonData[i]);
        }
      }
    }
  };

  seperationOfData();

  const seperationOfstrModes = () => {
    if (strModesFromAPI.length !== 0) {
      for (let i = 0; i < strModesFromAPI.length; i++) {
        if (Number(strModesFromAPI[i]["i"].split(",")[2]) === 10) {
          thermostatFromAPI.push(strModesFromAPI[i]);
        } else if (Number(strModesFromAPI[i]["i"].split(",")[2]) === 8) {
          irFromAPI.push(strModesFromAPI[i]);
        }
      }
    }
  };

  seperationOfstrModes();

  const otherModesFunc = () => {
    for (let i = 0; i < otherModesFromAPI.length; i++) {
      otherModes.push(
        otherModesFromAPI.map((channel) => ({
          packId: Number(channel["i"].split(",")[0]),
          packName: channel["i"].split(",")[1],
          mode: Number(channel["i"].split(",")[2]),
          ip: channel["i"].split(",")[3],
          tblPackage_pin: channel["p"].split(";").map((btn, index) => ({
            id: Number(channel["i"].split(",")[0]) + index,
            name: btn.split(",")[0],
            status: btn.split(",")[1],
            pin: index,
          })),
        }))
      );
    }
    otherModesData = otherModes[0];
  };

  otherModesFunc();

  const thermostatFunc = () => {
    for (let i = 0; i < thermostatFromAPI.length; i++) {
      thermostat.push(
        thermostatFromAPI.map((channel) => ({
          packId: Number(channel["i"].split(",")[0]),
          packName: channel["i"].split(",")[1],
          mode: Number(channel["i"].split(",")[2]),
          ip: channel["i"].split(",")[3],
          tblPackage_pin: [
            {
              id: channel["pp"][0]["id"],
              name: channel["pp"][0]["name"],
              pin: channel["pp"][0]["pin"],
              strStatus: {
                stsmode: channel["pp"][0]["strStatus"]["stsmode"],
                fan: channel["pp"][0]["strStatus"]["fan"],
                relests: channel["pp"][0]["strStatus"]["relests"],
                Temp: channel["pp"][0]["strStatus"]["Temp"],
                settedtemp: channel["pp"][0]["strStatus"]["settedtemp"],
                IsCool: channel["pp"][0]["strStatus"]["IsCool"],
                IsSleep: channel["pp"][0]["strStatus"]["IsSleep"],
              },
            },
          ],
        }))
      );
    }
    thermostatData = thermostat[0];
  };

  thermostatFunc();

  const irFunc = () => {
    for (let i = 0; i < irFromAPI.length; i++) {
      ir.push(
        irFromAPI.map((channel) => ({
          packId: Number(channel["i"].split(",")[0]),
          packName: channel["i"].split(",")[1],
          mode: Number(channel["i"].split(",")[2]),
          ip: channel["i"].split(",")[3],
          tblPackage_pin: [
            {
              id: channel["pp"][0]["id"],
              name: channel["pp"][0]["name"],
              pin: channel["pp"][0]["pin"],
              Protocol: channel["pp"][0]["Protocol"],
              PinMode: channel["pp"][0]["PinMode"],
              strStatus: {
                stsmode: channel["pp"][0]["strStatus"]["stsmode"],
                fan: channel["pp"][0]["strStatus"]["fan"],
                mode: channel["pp"][0]["strStatus"]["mode"],
                Power: channel["pp"][0]["strStatus"]["Power"],
                degree: channel["pp"][0]["strStatus"]["degree"],
                Temp:
                  channel["pp"][0]["strStatus"]["Temp"] === undefined
                    ? false
                    : channel["pp"][0]["strStatus"]["Temp"],
              },
            },
            {
              id: channel["pp"][1]["id"],
              name: channel["pp"][1]["name"],
              pin: channel["pp"][1]["pin"],
              Protocol: channel["pp"][1]["Protocol"],
              PinMode: channel["pp"][1]["PinMode"],
              strStatus: {
                stsmode: channel["pp"][1]["strStatus"]["stsmode"],
                fan: channel["pp"][1]["strStatus"]["fan"],
                mode: channel["pp"][1]["strStatus"]["mode"],
                Power: channel["pp"][1]["strStatus"]["Power"],
                degree: channel["pp"][1]["strStatus"]["degree"],
                Temp:
                  channel["pp"][1]["strStatus"]["Temp"] === undefined
                    ? false
                    : channel["pp"][0]["strStatus"]["Temp"],
              },
            },
            {
              id: channel["pp"][2]["id"],
              name: channel["pp"][2]["name"],
              pin: channel["pp"][2]["pin"],
              Protocol: channel["pp"][2]["Protocol"],
              PinMode: channel["pp"][2]["PinMode"],
              strStatus: {
                stsmode: channel["pp"][2]["strStatus"]["stsmode"],
                fan: channel["pp"][2]["strStatus"]["fan"],
                mode: channel["pp"][2]["strStatus"]["mode"],
                Power: channel["pp"][2]["strStatus"]["Power"],
                degree: channel["pp"][2]["strStatus"]["degree"],
                Temp:
                  channel["pp"][2]["strStatus"]["Temp"] === undefined
                    ? false
                    : channel["pp"][0]["strStatus"]["Temp"],
              },
            },
          ],
        }))
      );
      irData = ir[0];
    }
  };

  irFunc();

  // Outside and inside handle function
  // move to new component
  // from here ==>

  const handleBtnActive = (event) => {
    event.preventDefault();
    switch (event.target.id) {
      case "btnIn":
        setBtnActive({ home: true, out: false });
        break;
      case "btnOut":
        setBtnActive({ home: false, out: true });
        break;
      default:
    }
  };

  // to here <==

  // Turn on and off the channels with this handle function

  const handleChannelStatus = (event) => {
    const channel = event.target.id.split("-");
    const channelID = channel[0];
    const channelstatus = channel[1] === "1" ? 0 : 1;
    (async () => {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ title: "Fetch POST Request Example" }),
      };
      const url = `${localIP}/Light/api/changerele/?id=${channelID}&status=${channelstatus}&result=Device1`;
      const response = await fetch(url, requestOptions);
      setJsonData(await response.json());
    })();
  };

  // Termostat Handle Function

  const handleIsCool = (event) => {
    // ${fan}-${setTemp}-${isCool}-${isSleep}-${thermId}-isCool-false
    const channel = event.target.id.split("-");
    let fan = channel[0],
      setTemp = channel[1],
      isCool = channel[2],
      isSleep = channel[3],
      channelID = channel[4],
      mode = channel[5];

    function increaseTemp() {
      let temp = Number(setTemp);
      if (temp < 55) {
        temp++;
        setTemp = temp;
      }
    }

    function decreaseTemp() {
      let temp = Number(setTemp);
      if (temp > 5) {
        temp--;
        setTemp = temp;
      }
    }
    switch (mode) {
      case "isCool":
        isCool = channel[2] === "true" ? "false" : "true";
        break;
      case "fanSpeed":
        fan = channel[6];
        break;
      case "isSleep":
        isSleep = channel[3] === "true" ? "false" : "true";
        break;
      case "temp":
        if (channel[6] === "increase") {
          increaseTemp();
        } else if (channel[6] === "decrease") {
          decreaseTemp();
        }
        break;
      default:
    }

    (async () => {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ title: "Fetch POST Request Example" }),
      };
      const url = `${localIP}/Termoostat/api/changeTermoostat/?fan=${fan}&temp=${setTemp}&iscool=${isCool}&issleep=${isSleep}&id=${channelID}`;
      const response = await fetch(url, requestOptions);
      setJsonData(await response.json());
    })();
  };

  // IR Cooler Handle Function

  const handleIR = (event) => {
    // ${fan}-${degree}-${power}-${mode}-${irId}-irMode-false
    const channel = event.target.id.split("-");
    let fan = channel[0],
      setTemp = Number(channel[1]) === null ? 18 : Number(channel[1]),
      power = channel[2],
      mode = channel[3],
      channelID = channel[4],
      irMode = channel[5];

    function increaseTemp() {
      let temp = Number(setTemp);
      if (temp < 30) {
        temp++;
        setTemp = temp;
      }
    }

    function decreaseTemp() {
      let temp = Number(setTemp);
      if (temp > 18) {
        temp--;
        setTemp = temp;
      }
    }
    switch (irMode) {
      case "irCoolerMode":
        mode = channel[6];
        break;
      case "fanSpeed":
        fan = channel[6];
        break;
      case "power":
        power = channel[2] === "true" ? "false" : "true";
        break;
      case "temp":
        if (channel[6] === "increase") {
          increaseTemp();
        } else if (channel[6] === "decrease") {
          decreaseTemp();
        }
        break;
      default:
    }

    (async () => {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ title: "Fetch POST Request Example" }),
      };
      // 192.168.1.166/IR/api/sendIRAC?id=441346&mode=1&degree=19&fan=1&power=true&result=Device1
      const url = `${localIP}/IR/api/sendIRAC?id=${channelID}&mode=${mode}&degree=${setTemp}&fan=${fan}&power=${power}`;

      const response = await fetch(url, requestOptions);
      setJsonData(await response.json());
    })();
  };

  return (
    <>
      <div className="container" dir="rtl">
        <div className="welcome">
          <div id="logo">
            <SettingIcon />
            <SenveeraLogo className="logo" />
          </div>
          <p>به سادگی خانه را مدیریت کن !</p>

          {/* the inside-outside div is display: none */}

          <div className="inside-outside">
            <div
              id="btnOut"
              className={btnActive.out ? "btnActive btn" : "btn"}
              onClick={handleBtnActive}
            >
              بیرون هستم
            </div>
            <div
              id="btnIn"
              className={btnActive.home ? "btnActive btn" : "btn"}
              onClick={handleBtnActive}
            >
              خانه هستم
            </div>
          </div>
        </div>
        <div className="quick-access">
          <h3>
            دسترسی سریع
            <RefreshButton
              className={`${refreshBtn} refreshBtn`}
              onClick={handleGetAPI}
            />
          </h3>
          {jsonData.length === 0 && <h3>دستگاهی یافت نشد !</h3>}
          {otherModesData !== undefined &&
            otherModesData.map((light) => (
              <ChannelBox
                data={light}
                name={light["packName"]}
                handleFunc={handleChannelStatus}
              />
            ))}
          {thermostatData !== undefined &&
            thermostatData.map((therm) => (
              <ThermostatBox
                data={therm}
                name={therm["packName"]}
                handleFunc={handleIsCool}
              />
            ))}
          {irData !== undefined &&
            irData.map((ir) =>
              ir["tblPackage_pin"].map(
                (item) =>
                  item["PinMode"] === 0 && (
                    <IRBox data={item} handleFunc={handleIR} />
                  )
              )
            )}
        </div>
        {/* commented for now */}
        {/* <FavoriteChannels/> */}
      </div>
      <TabBar page="dashboard" />
    </>
  );
}

export default Dashboard;
