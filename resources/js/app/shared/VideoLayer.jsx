import React, { useRef} from 'react'
import { assets } from "../../_helpers";

export const VideoLayer =(props)=>{
    const showVideo = props.showVideo;
    const videoRef = useRef(null);

    const handleShowVideo = (e)=>{
        videoRef.current.pause();
        props.handleShowVideo();
    }

  return (
    <div className="layer_standard layer_video" style={{display: !showVideo? "none": "block"}}>
		<div className="sombra_layer" onClick={handleShowVideo}></div>
        <div className="caja">
            <div className="btn_close" onClick={handleShowVideo}></div>
			<video ref={videoRef} controls playsInline poster={ assets("/images/video-poster.jpg") }>
				<source src={ assets("/images/tutorial-mesa-partes.mp4") } type="video/mp4"/>
			</video>
			<div className="clear"></div>
		</div>
	</div>
  )
}
