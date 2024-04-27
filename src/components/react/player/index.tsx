// import type { YouTubeConfig } from "react-player/youtube";
import { useId } from "react"
import ReactPlayer from "react-player";

type Props = {
    url: string
  }

const Player = ({url}:Props)=> {
    return(
        <ReactPlayer
            className="aspect-video rounded-lg [&>*]:rounded-lg [&_iframe]:rounded-lg"
            config={{
                soundcloud: {
                  options: {
                    autoplay: false,
                  },
                },
                twitch: {
                  options: {
                    autoplay: false,
                  },
                  playerId: useId(),
                },
                youtube: {
                    embedOptions: {
                        autoplay: 0,
                        cc_lang_pref: "ja",
                    },
                }
            }}
            url={url}
            controls
            width="100%"
            height="100%"
        />
    )
}

export default Player