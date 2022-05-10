import React, { useState, useEffect } from "react";
import ChannelBox from "./ChannelBox";
import ThermostatBox from "./ThermostatBox";
import TabBar from "./TabBar";
// import SVGPack from "./SVGPack";
import "./dashboard.css";
// import localIP from './ip-address.js'
import { ReactComponent as RefreshButton } from "../svg/arrow-rotate-right-solid.svg";
import { ReactComponent as SenveeraLogo } from "../svg/logo.svg";
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
    thermostatFromAPI = [];

  // Web Socket config

  // const url = { online: "http://192.168.1.166/", local: "http://192.168.4.1/" };
  // const ws = new WebSocket('ws://admin:admin@narmgostaran.com:9005/ws')
  useEffect(() => {
    // ws.onopen = () => {
    //   // on connecting, do nothing but log it to the console
    //   console.log('connected')
    //   }
    //   ws.onmessage = evt => {
    //     // listen to data sent from the websocket server
    //     const message = JSON.parse(evt.data)
    //     console.log(message)
    //     }

    //     ws.onclose = () => {
    //     console.log('disconnected')
    //     // automatically try to reconnect on connection loss

    //     }
    fetch(`${localUrl}`)
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch(function () {
        return console.log("error");
      });
  }, []);

  // Move to new Component
  // from here ==>

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

  // to here <==

  // Data Structure
  // With this function we structure our jsonData into an array.
  // we should also make other arrays for other modes

  const seperationOfData = () => {
    if (jsonData.length !== 0) {
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].hasOwnProperty("p")) {
          otherModesFromAPI.push(jsonData[i]);
        } else {
          thermostatFromAPI.push(jsonData[i]);
        }
      }
    }
  };

  seperationOfData();

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

  // console.log(thermostatData[0]['packId'])

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
    // let channelID,
    //     channelstatus;
    // use this for making on function for changing status of rele and strstatus
    // if (channel[1] === "1" || channel[1] === "0") {
    //   channelID = channel[0];
    //   channelstatus = channel[1] === "1" ? 0 : 1;
    // } else if (channel[1] === "true" || channel[1] === "false") {
    //   channelID = channel[0];
    //   channelstatus = channel[1] === "true" ? "false" : "true";
    // }
    const channelID = channel[0];
    const channelstatus = channel[1] === "1" ? 0 : 1;
    (async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ title: "Fetch POST Request Example" }),
      };
      const url = `${localIP}/Light/api/changerele/?id=${channelID}&status=${channelstatus}&result=Device1`;
      // console.log(
      //   `Channel with id : ${channelID} ${
      //     channelstatus === 1 ? "Turned On" : "Turned Off"
      //   }`
      // );
      const response = await fetch(url, requestOptions);
      setJsonData(await response.json());
    })();
  };

  // Change isCool

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
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ title: "Fetch POST Request Example" }),
      };
      const url = `${localIP}/Termoostat/api/changeTermoostat/?fan=${fan}&temp=${setTemp}&iscool=${isCool}&issleep=${isSleep}&id=${channelID}`;
      // 192.168.1.166/Termoostat/api/changeTermoostat/?fan=1&temp=20&iscool=true&issleep=true&id=714949
      // console.log(
      //   `Channel with id : ${channelID} ${
      //     channelstatus === 1 ? "Turned On" : "Turned Off"
      //   }`
      // );
      const response = await fetch(url, requestOptions);
      setJsonData(await response.json());
    })();
  };

  return (
    <>
      <div className="container" dir="rtl">
        <div className="welcome">
          <div id="logo">
            <SenveeraLogo className="logo" />
          </div>
          <p>به سادگی خانه را مدیریت کن !</p>
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
          {otherModesData === undefined ? (
            <h3>دستگاهی یافت نشد !</h3>
          ) : (
            otherModesData.map((light) => (
              <ChannelBox
                data={light}
                name={light["packName"]}
                handleFunc={handleChannelStatus}
              />
            ))
          )}
          {thermostatData === undefined ? (
            <h3 style={{ display: "none" }}>ترموستاتی پیدا نشد!</h3>
          ) : (
            thermostatData.map((therm) => (
              <ThermostatBox
                data={therm}
                name={therm["packName"]}
                handleFunc={handleIsCool}
              />
            ))
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
