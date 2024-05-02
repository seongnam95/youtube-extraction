import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import SoundExtraction from '@/features/SoundExtraction';

function App() {
  return (
    <div className="mt-24 h-dvh w-dvw px-8">
      <Tabs className="mx-auto max-w-[700px]" defaultValue="sound">
        <TabsList className="">
          <TabsTrigger value="sound">Sound</TabsTrigger>
          <TabsTrigger value="sound2">Video</TabsTrigger>
        </TabsList>
        <TabsContent value="sound" className="py-3">
          <SoundExtraction />
        </TabsContent>
        <TabsContent value="sound2"></TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
