import React, { useState, useEffect } from "react";
import ChannelBox from "./ChannelBox";
import TabBar from "./TabBar";
import SVGPack from "./SVGPack";
import "./dashboard.css";
// import localIP from './ip-address.js'
import { ReactComponent as RefreshButton } from "../svg/arrow-rotate-right-solid.svg";
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
    lightMode = [],
    lightModeData;

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

  const lightModeFunc = () => {
    if (jsonData.length !== 0) {
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]["p"]) {
          lightMode.push(
            jsonData.map((channel) => ({
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
      }
    }
    lightModeData = lightMode[0];
  };

  lightModeFunc();

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

  return (
    <>
      <div className="container" dir="rtl">
        <div className="welcome">
          <div id="logo">
            <img src={SVGPack.logo} alt="senveera-logo" />
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
          {jsonData.length === 0 ? (
            <h3>دستگاهی یافت نشد !</h3>
          ) : (
            lightModeData.map((light) => (
              <ChannelBox
                data={light}
                name={light["packName"]}
                handleFunc={handleChannelStatus}
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
