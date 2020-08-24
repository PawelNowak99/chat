import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
import "./BarChat.css";

function BarChat({ id, name, addNewChat }) {
  const [urla, setUrl] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setUrl(Math.floor(Math.random() * 999));
  }, []);

  const createChat = () => {
    const roomName = prompt("Podaj nazwę");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="barChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${urla}.svg`} />
        <div className="barChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="barChat">
      <h2>dodaj chat</h2>
    </div>
  );
}

export default BarChat;
