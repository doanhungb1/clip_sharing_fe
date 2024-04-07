import React from 'react';
import YouTube from 'react-youtube';

const SharedClipComponent = ({ data }) => {
  // Options for the YouTube player
  const opts = {
    height: '200',
    width: '300',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // Event handlers
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div class='row'>
      <div className="h-full w-[300px] col-md-4">
        <YouTube videoId={data.youtube_video_id} opts={opts} onReady={onReady} />
      </div>
      <div className="col-md-8">
        <h4 className="font-bold">{data.title}</h4>
        <h4 className="text-sm font-semibold">
          Shared by {data.user_email ? data.user_email : "unknown"}
        </h4>
        <h4 className="text-sm">Description</h4>
        <p className="text-xs line-clamp-3">{data.description}</p>
      </div>
    </div>
  );
};

export default SharedClipComponent;