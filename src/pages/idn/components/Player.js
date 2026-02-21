import React from "react";
import ReactPlayer from "react-player";
import "../../streaming/video.scss";
import { HiUsers } from "react-icons/hi";
import { isMobile } from "react-device-detect";
import { gaTag } from "utils/gaTag";

export default function Player({ url, views, idnUrl, refreshKey }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const trackEvent = () => {
    gaTag({
      action: "redirect_idn_web",
      category: "IDN Live",
      label: "Live Stream",
    });
  }

  return (
    <div className="idn-live player-wrapper mb-3">
      <ReactPlayer
        key={refreshKey}
        className="react-player"
        config={{
          file: {
            forceHLS: !isSafari,
          },
        }}
        controls
        url={url}
        width="100%"
        height="750px"
        playing={true}
      />
    </div>
  );
}
