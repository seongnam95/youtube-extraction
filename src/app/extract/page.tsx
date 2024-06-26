import ExtractPage from '@/app/extract/ExtractPage';
import { Heading } from '@/components/ui/Heading';

const Extract = () => {
  return (
    <div className="flex flex-col justify-center">
      <Heading className="mb-14" level="1" align="center">
        Audio Extractor
      </Heading>
      <ExtractPage />
    </div>
  );
};

export default Extract;
