'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Info, Loader2 } from 'lucide-react';
import { getSimpleExplanationAction } from '@/lib/actions';
import { Skeleton } from '../ui/skeleton';

interface SimplifiedExplanationProps {
  term: string;
}

export default function SimplifiedExplanation({ term }: SimplifiedExplanationProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open && !explanation && !isLoading) {
      setIsLoading(true);
      try {
        const result = await getSimpleExplanationAction(term);
        setExplanation(result);
      } catch (error) {
        setExplanation('Could not load explanation.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
          <Info className="h-4 w-4" />
          <span className="sr-only">Explain {term}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{term}</h4>
            <p className="text-sm text-muted-foreground">
              A simple explanation.
            </p>
          </div>
          <div className="text-sm">
            {isLoading && (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            )}
            {explanation && <p>{explanation}</p>}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
