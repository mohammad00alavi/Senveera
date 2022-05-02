import Channel from "./Channel";
import "./channelBox.css";

function ChannelBox(props) {
  return (
    <div className="channelBox" key={props.data["packid"]}>
      <span>{props.name}</span>
      <div className="channelGroup">
        {props.data["tblPackage_pin"].map((chann) => (
          <Channel
            data={chann}
            handleFunc={props.handleFunc}
            mode={props.data["mode"]}
          />
        ))}
      </div>
    </div>
  );
}

export default ChannelBox;
