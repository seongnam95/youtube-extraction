import Footer from '@/components/layouts/Footer';
import SoundExtraction from '@/features/SoundExtraction';
import AudioWave from '@/features/SoundExtraction/components/AudioWave';

function App() {
  return (
    <div className="flex h-dvh w-dvw flex-col">
      {/* Content */}
      <div className="flex-1 px-8 pt-24">
        <AudioWave audioUrl="/test.mp3" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
