import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import BarChat from "./BarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

import "./Bar.css";

function Bar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bar">
      <div className="bar_header">
        <Avatar src={user?.photoURL} />
        <div className="bar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="bar_search">
        <div className="bar_searchContainer">
          <SearchOutlined />
          <input placeholder="Szukaj kolegów" type="text"></input>
        </div>
      </div>
      <div className="bar_chats">
        <BarChat addNewChat />
        {rooms.map((room) => (
          <BarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Bar;
