import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import SoundExtraction from "@/features/SoundExtraction";

function App() {
  return (
    <div className="w-dvw h-dvh mt-32 px-5">
      <Tabs className="max-w-[900px] mx-auto" defaultValue="sound">
        <TabsList className="">
          <TabsTrigger value="sound">Sound</TabsTrigger>
          <TabsTrigger value="sound2">Video</TabsTrigger>
        </TabsList>
        <TabsContent value="sound">
          <SoundExtraction />
        </TabsContent>
        <TabsContent value="sound2"></TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
