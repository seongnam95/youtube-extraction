import { useWavesurfer } from "@wavesurfer/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import RegionsPlugin, {
  Region,
} from "wavesurfer.js/dist/plugins/regions.esm.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.esm.js";

interface AudioEditorProps {
  url?: string;
}

const AudioEditor: React.FC<AudioEditorProps> = ({ url = "/test.mp3" }) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  const [regionDuration, setRegionDuration] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: 0 });

  // Initialize Wavesurfer
  const { wavesurfer, isPlaying, isReady } = useWavesurfer({
    container: waveformRef,
    autoCenter: true,
    barWidth: 3,
    barRadius: 5,
    cursorColor: "#c0c0c0",
    waveColor: "#6241E6",
    progressColor: "#6241E6",
    plugins: useMemo(
      () => [
        HoverPlugin.create({
          lineColor: "#e56cdf",
          lineWidth: 2,
          labelBackground: "#555",
          labelColor: "#fff",
          labelSize: "11px",
        }),
      ],
      []
    ),
  });

  // Load audio file
  useEffect(() => {
    if (wavesurfer && url) wavesurfer.load(url);
  }, [url, wavesurfer]);

  // Add regions
  useEffect(() => {
    if (wavesurfer && isReady) {
      const wsRegion = wavesurfer.registerPlugin(RegionsPlugin.create());

      wsRegion.clearRegions();

      wsRegion.on("region-created", (region: Region) => {
        setRegionDuration({
          start: region.start,
          end: region.end,
        });

        /* Resize 방향에 따른 Seek 지점 변경 */
        region.on("update", (direction) => {
          wavesurfer.stop();

          if (direction === "start") {
            wavesurfer.setTime(region.start);
          } else if (direction === "end") {
            const endSeek =
              region.end - 2 >= region.start ? region.end - 2 : region.start;
            wavesurfer.setTime(endSeek);
          }
        });

        /* Resize 종료 시 play */
        region.on("update-end", () => wavesurfer.play());

        wavesurfer.on("audioprocess", (time) => {
          if (region && time >= region.end) {
            wavesurfer.stop();
            wavesurfer.setTime(region.start);
          }
        });
      });

      wsRegion.on("region-updated", (region: Region) => {
        setRegionDuration({
          start: region.start,
          end: region.end,
        });
      });

      wsRegion.addRegion({
        start: 0,
        end: wavesurfer.getDuration(),
      });
    }
  }, [wavesurfer, isReady]);

  const handlePlayPause = () => {
    wavesurfer?.playPause();
  };

  return (
    <>
      <div id="waveform-background">
        <div ref={waveformRef} id="waveform" />
      </div>
      <p>{Math.round(regionDuration.start)}</p>
      <p>{Math.round(regionDuration.end)}</p>
      {/* <p>{Math.round(region ? region.end : 0)}</p> */}
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </>
  );
};

export default AudioEditor;
