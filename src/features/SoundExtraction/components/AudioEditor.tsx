import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useWavesurfer } from '@wavesurfer/react';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.esm.js';

import Pause from '@/assets/svg/pause.svg?react';
import Play from '@/assets/svg/play.svg?react';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { IconButton } from '@/components/ui/IconButton';

interface AudioEditorProps {
  url?: string;
}

const AudioEditor: React.FC<AudioEditorProps> = ({ url = '/test.mp3' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Wavesurfer
  const { wavesurfer, isPlaying, isReady } = useWavesurfer({
    container: containerRef,
    autoCenter: true,
    barWidth: 2,
    barRadius: 3,
    progressColor: '#4dd37e',
    waveColor: '#4dd37e',
  });

  useEffect(() => console.log(wavesurfer?.getDuration()), [wavesurfer]);

  // Load audio file
  useEffect(() => {
    if (wavesurfer && url) wavesurfer.load(url);
  }, [url, wavesurfer]);

  // Add regions
  useEffect(() => {
    if (wavesurfer && isReady) {
      const wsRegion = wavesurfer.registerPlugin(RegionsPlugin.create());

      wsRegion.clearRegions();

      wsRegion.on('region-created', (region: Region) => {
        /* Resize 방향에 따른 Seek 지점 변경 */
        region.on('update', (direction) => {
          wavesurfer.stop();

          if (direction === 'start') {
            wavesurfer.setTime(region.start);
          } else if (direction === 'end') {
            const endSeek = region.end - 2 >= region.start ? region.end - 2 : region.start;
            wavesurfer.setTime(endSeek);
          }
        });

        /* Resize 종료 시 play */
        region.on('update-end', () => wavesurfer.play());

        wavesurfer.on('audioprocess', (time) => {
          if (region && time >= region.end) {
            wavesurfer.stop();
            wavesurfer.setTime(region.start);
          }
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
    <div>
      <div id="waveform-background" className="mb-8">
        <div ref={containerRef} id="waveform" />
      </div>

      {/* Tools */}
      <Flex justify="between" className="px-2">
        {/* Play/Pause Button */}
        <IconButton circle variant="outline" size="xl" onClick={handlePlayPause}>
          {isPlaying ? <Pause className="w-5 fill-white" /> : <Play className="ml-3pxr w-5 fill-white" />}
        </IconButton>

        <Button>저장하기</Button>
      </Flex>
    </div>
  );
};

export default AudioEditor;
