
import React from 'react';
import { BoardTheme, PieceStyle } from '../types/chess';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ThemeSelectorProps {
  boardTheme: BoardTheme;
  pieceStyle: PieceStyle;
  onBoardThemeChange: (theme: BoardTheme) => void;
  onPieceStyleChange: (style: PieceStyle) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  boardTheme,
  pieceStyle,
  onBoardThemeChange,
  onPieceStyleChange
}) => {
  // Board theme preview colors
  const boardThemePreview = {
    classic: { light: 'bg-chess-light-classic', dark: 'bg-chess-dark-classic' },
    blue: { light: 'bg-chess-light-blue', dark: 'bg-chess-dark-blue' },
    forest: { light: 'bg-chess-light-forest', dark: 'bg-chess-dark-forest' }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <Tabs defaultValue="boardTheme" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger value="boardTheme">Board Theme</TabsTrigger>
          <TabsTrigger value="pieceStyle">Piece Style</TabsTrigger>
        </TabsList>
        
        <TabsContent value="boardTheme" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            {(['classic', 'blue', 'forest'] as BoardTheme[]).map((theme) => (
              <div key={theme} className="flex flex-col items-center gap-2">
                <div 
                  className={`grid grid-cols-2 w-16 h-16 cursor-pointer rounded ${
                    boardTheme === theme ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => onBoardThemeChange(theme)}
                >
                  <div className={boardThemePreview[theme].light}></div>
                  <div className={boardThemePreview[theme].dark}></div>
                  <div className={boardThemePreview[theme].dark}></div>
                  <div className={boardThemePreview[theme].light}></div>
                </div>
                <span className="text-sm capitalize">{theme}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pieceStyle" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            {(['standard', 'modern', 'minimalist'] as PieceStyle[]).map((style) => (
              <div key={style} className="flex flex-col items-center gap-2">
                <Button
                  variant={pieceStyle === style ? "default" : "outline"}
                  className={`w-16 h-16 flex items-center justify-center ${
                    pieceStyle === style ? 'bg-purple-500 hover:bg-purple-600' : ''
                  }`}
                  onClick={() => onPieceStyleChange(style)}
                >
                  <span className={`
                    ${style === 'standard' ? 'text-2xl' : ''}
                    ${style === 'modern' ? 'text-2xl font-bold' : ''}
                    ${style === 'minimalist' ? 'text-xl font-light' : ''}
                  `}>
                    ♚
                  </span>
                </Button>
                <span className="text-sm capitalize">{style}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeSelector;
