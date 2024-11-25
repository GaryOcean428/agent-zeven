import React, { useState } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface ExportButtonProps {
  data: unknown;
  filename: string;
  onExport: (success: boolean) => void;
}

export function ExportButton({ data, filename, onExport }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const validateData = (data: unknown): boolean => {
    if (!data) return false;
    if (typeof data !== 'object') return false;
    if (Array.isArray(data) && data.length === 0) return false;
    return true;
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      if (!validateData(data)) {
        throw new Error('Invalid data provided for export');
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `File ${filename}.json has been downloaded`,
      });

      onExport(true);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
      onExport(false);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      variant="default"
      className="flex items-center gap-2"
      disabled={isExporting}
    >
      <Download className="w-4 h-4" />
      {isExporting ? 'Exporting...' : 'Export'}
    </Button>
  );
}
