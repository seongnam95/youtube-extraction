import { useWavesurfer } from "@wavesurfer/react";
import React, { useEffect, useMemo, useRef } from "react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";

interface AudioEditorProps {
  url?: string;
}

const AudioEditor: React.FC<AudioEditorProps> = ({ url = "/test.mp3" }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { wavesurfer, isPlaying, isReady } = useWavesurfer({
    container: waveformRef,
    url: url,
    waveColor: "purple",
    height: 100,
    plugins: useMemo(
      () => [
        Hover.create({
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

  useEffect(() => {
    if (isReady && wavesurfer) {
      const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());

      if (wsRegions) {
        wsRegions.addRegion({
          start: 0,
          end: wavesurfer.getDuration(),
          color: "rgba(216, 216, 216, 0.5)",
          drag: true,
          resize: true,
        });
      }

      wsRegions.on("region-updated", (region) => {
        console.log("Updated region", region);
      });
    }
  }, [wavesurfer, isReady]);

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <>
      <div ref={waveformRef} id="waveform" />
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </>
  );
};

export default AudioEditor;
