import EditorPage from '@/app/editor/EditorPage';
import { Heading } from '@/components/ui/Heading';

const Editor = () => {
  return (
    <div className="flex flex-col justify-center">
      <Heading className="mb-14" level="1" align="center">
        Audio Editor
      </Heading>
      <EditorPage />
    </div>
  );
};

export default Editor;
