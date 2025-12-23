import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewButtonProps {
  previewPath?: string;
  label?: string;
}

const PreviewButton = ({ previewPath = '/', label = 'Preview Site' }: PreviewButtonProps) => {
  const handlePreview = () => {
    // Open in new tab with preview mode indicator
    const previewUrl = new URL(previewPath, window.location.origin);
    previewUrl.searchParams.set('preview', 'true');
    window.open(previewUrl.toString(), '_blank');
  };

  return (
    <Button 
      variant="outline" 
      onClick={handlePreview}
      className="gap-2"
    >
      <Eye className="w-4 h-4" />
      {label}
    </Button>
  );
};

export default PreviewButton;
