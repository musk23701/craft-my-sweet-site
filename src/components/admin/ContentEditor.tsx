import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, Image, Type, MoveUp, MoveDown } from 'lucide-react';
import MediaUploader from './MediaUploader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'quote';
  content: string;
  imageUrl?: string;
  level?: 'h2' | 'h3' | 'h4';
}

interface ContentEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const ContentEditor = ({ blocks, onChange }: ContentEditorProps) => {
  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      level: type === 'heading' ? 'h2' : undefined,
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter((block) => block.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock('paragraph')}
        >
          <Type className="w-4 h-4 mr-2" />
          Add Paragraph
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock('heading')}
        >
          <Type className="w-4 h-4 mr-2 font-bold" />
          Add Heading
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock('image')}
        >
          <Image className="w-4 h-4 mr-2" />
          Add Image
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock('quote')}
        >
          <span className="mr-2">"</span>
          Add Quote
        </Button>
      </div>

      {blocks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No content blocks yet. Add your first block above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={block.id} className="relative">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                    >
                      <MoveUp className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === blocks.length - 1}
                    >
                      <MoveDown className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {block.type}
                      </span>
                      {block.type === 'heading' && (
                        <Select
                          value={block.level || 'h2'}
                          onValueChange={(value) =>
                            updateBlock(block.id, { level: value as 'h2' | 'h3' | 'h4' })
                          }
                        >
                          <SelectTrigger className="w-20 h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="h2">H2</SelectItem>
                            <SelectItem value="h3">H3</SelectItem>
                            <SelectItem value="h4">H4</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    {block.type === 'image' ? (
                      <div className="space-y-2">
                        {block.imageUrl ? (
                          <div className="relative">
                            <img
                              src={block.imageUrl}
                              alt="Content"
                              className="max-h-48 rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => updateBlock(block.id, { imageUrl: '' })}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <MediaUploader
                            accept="image/*,.gif"
                            onUpload={(url) => updateBlock(block.id, { imageUrl: url })}
                          />
                        )}
                        <Input
                          placeholder="Image caption (optional)"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        />
                      </div>
                    ) : (
                      <Textarea
                        placeholder={
                          block.type === 'paragraph'
                            ? 'Enter your paragraph text...'
                            : block.type === 'heading'
                            ? 'Enter heading text...'
                            : 'Enter quote text...'
                        }
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        className="min-h-[80px]"
                      />
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeBlock(block.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
