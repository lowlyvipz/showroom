import axios from "axios";
import "../style.scss"
import React, { useState, useMemo, useEffect, useCallback } from "react";

import MainLayout from "pages/layout/MainLayout";
import RoomMulti from "../components/RoomMulti";
import RoomPlayer from "./components/RoomPlayer";
import { getLocalStorage } from "utils/helpers";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";

const RoomContainer = React.memo(({ number, data, setRoomOne, setRoomTwo, setRoomThree, setRoomFour }) => (
  <div className="multi-spacing">
    <RoomPlayer
      key={number}
      number={number}
      data={data}
      setRoomOne={setRoomOne}
      setRoomTwo={setRoomTwo}
      setRoomThree={setRoomThree}
      setRoomFour={setRoomFour}
    />
  </div>
));

const MultiRoomIDN = () => {
  const [roomOne, setRoomOne] = useState({});
  const [roomTwo, setRoomTwo] = useState({});
  const [roomThree, setRoomThree] = useState({});
  const [roomFour, setRoomFour] = useState({});
  const [layout, setLayout] = useState(
    localStorage.getItem("multi_room_idn") ?? "twoRoom"
  );

  const settingsLayout = (type) => {
    if (type !== layout) {
      setLayout(type);
      localStorage.setItem("multi_room_idn", type);
    }
  };

  useEffect(() => {
    const fetchRoomData = async (username, setRoom) => {
      try {
        const res = await axios.get(ROOM_LIVE_IDN_DETAIL(username));
        if (res?.data?.is_live) {
          setRoom(res.data);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    const roomOneData = getLocalStorage("roomOne");
    const roomTwoData = getLocalStorage("roomTwo");
    const roomThreeData = getLocalStorage("roomThree");
    const roomFourData = getLocalStorage("roomFour");

    if (roomOneData?.user?.username) {
      fetchRoomData(roomOneData.user.username, setRoomOne);
    }
    if (roomTwoData?.user?.username) {
      fetchRoomData(roomTwoData.user.username, setRoomTwo);
    }
    if (roomThreeData?.user?.username) {
      fetchRoomData(roomThreeData.user.username, setRoomThree);
    }
    if (roomFourData?.user?.username) {
      fetchRoomData(roomFourData.user.username, setRoomFour);
    }
  }, []);

  const renderLayout = () => {
    const commonProps = {
      setRoomOne,
      setRoomTwo,
      setRoomThree,
      setRoomFour,
    };

    return (
      <div className="d-flex flex-wrap">
        <RoomContainer number="1" data={roomOne} {...commonProps} />
        <RoomContainer number="2" data={roomTwo} {...commonProps} />
        {layout !== "twoRoom" && (
          <RoomContainer number="3" data={roomThree} {...commonProps} />
        )}
        {layout === "fourRoom" && (
          <RoomContainer number="4" data={roomFour} {...commonProps} />
        )}
      </div>
    );
  };

  return (
    <MainLayout title="Multi Room - IDN Live">
      <div className="mt-1 p-2">
        {renderLayout()}
        <RoomMulti
          isAndroid
          layout={layout}
          roomOne={roomOne}
          roomTwo={roomTwo}
          roomThree={roomThree}
          roomFour={roomFour}
          setRoomOne={setRoomOne}
          setRoomTwo={setRoomTwo}
          setRoomThree={setRoomThree}
          setRoomFour={setRoomFour}
          settingsLayout={settingsLayout}
        />
      </div>
    </MainLayout>
  );
};

export default MultiRoomIDN;
