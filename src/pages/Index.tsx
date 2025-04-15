
import React, { useState } from 'react';
import ChessBoard from '@/components/ChessBoard';
import ThemeSelector from '@/components/ThemeSelector';
import { BoardTheme, PieceStyle } from '@/types/chess';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('classic');
  const [pieceStyle, setPieceStyle] = useState<PieceStyle>('standard');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">Elegant Chess</h1>
          <p className="text-gray-600">A beautiful, customizable chess experience</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="shadow-xl animate-scale-in">
              <CardContent className="pt-6">
                <ChessBoard boardTheme={boardTheme} pieceStyle={pieceStyle} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-purple-600">Customize</h2>
                  <ThemeSelector 
                    boardTheme={boardTheme}
                    pieceStyle={pieceStyle}
                    onBoardThemeChange={setBoardTheme}
                    onPieceStyleChange={setPieceStyle}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-purple-600">How to Play</h2>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Click on a piece to select it</li>
                    <li>• Purple dots show where you can move</li>
                    <li>• Click on a valid square to move</li>
                    <li>• Captured pieces appear below the board</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
