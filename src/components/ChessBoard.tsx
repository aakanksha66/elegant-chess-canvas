import React, { useState, useEffect } from 'react';
import { BoardState, Position, BoardTheme, PieceStyle, Piece, PieceColor } from '../types/chess';
import { initializeBoard, getValidMoves, isMoveValid, makeMove } from '../utils/chessUtils';
import ChessPiece from './ChessPiece';

interface ChessBoardProps {
  boardTheme: BoardTheme;
  pieceStyle: PieceStyle;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ boardTheme, pieceStyle }) => {
  const [board, setBoard] = useState<BoardState>(initializeBoard());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>('white');
  const [capturedPieces, setCapturedPieces] = useState<Piece[]>([]);

  const getBoardColors = () => {
    switch (boardTheme) {
      case 'blue':
        return {
          light: 'bg-chess-light-blue',
          dark: 'bg-chess-dark-blue',
        };
      case 'forest':
        return {
          light: 'bg-chess-light-forest',
          dark: 'bg-chess-dark-forest',
        };
      case 'classic':
      default:
        return {
          light: 'bg-chess-light-classic',
          dark: 'bg-chess-dark-classic',
        };
    }
  };

  const { light, dark } = getBoardColors();

  const handleSquareClick = (row: number, col: number) => {
    const piece = board[row][col];
    
    if (!selectedPosition && piece && piece.color === currentTurn) {
      setSelectedPosition({ row, col });
      setValidMoves(getValidMoves(board, { row, col }));
      return;
    }
    
    if (selectedPosition) {
      if (selectedPosition.row === row && selectedPosition.col === col) {
        setSelectedPosition(null);
        setValidMoves([]);
        return;
      }
      
      if (piece && piece.color === currentTurn) {
        setSelectedPosition({ row, col });
        setValidMoves(getValidMoves(board, { row, col }));
        return;
      }
      
      const targetPosition = { row, col };
      if (isMoveValid(validMoves, targetPosition)) {
        if (board[row][col]) {
          setCapturedPieces([...capturedPieces, board[row][col]!]);
        }
        
        const newBoard = makeMove(board, selectedPosition, targetPosition);
        setBoard(newBoard);
        
        setSelectedPosition(null);
        setValidMoves([]);
        setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
      }
    }
  };

  const isValidMove = (row: number, col: number) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const getSquareStyle = (row: number, col: number) => {
    const isSelected = selectedPosition?.row === row && selectedPosition?.col === col;
    const isValidMoveSquare = isValidMove(row, col);
    const isLightSquare = (row + col) % 2 === 0;
    
    let classes = `w-full aspect-square flex items-center justify-center relative ${isLightSquare ? light : dark}`;
    
    if (isSelected) {
      classes += ' ring-2 ring-purple-500';
    }
    
    return classes;
  };

  const renderMoveIndicator = (row: number, col: number) => {
    if (!isValidMove(row, col)) return null;
    
    const hasPiece = !!board[row][col];
    
    return (
      <div className={`absolute inset-0 flex items-center justify-center animate-fade-in ${hasPiece ? 'capture-indicator' : ''}`}>
        {!hasPiece && (
          <div className="valid-move-indicator"></div>
        )}
      </div>
    );
  };

  const renderRowLabels = () => {
    return (
      <div className="flex flex-col justify-around h-full pr-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center justify-center text-xs text-gray-600">
            {8 - i}
          </div>
        ))}
      </div>
    );
  };

  const renderColLabels = () => {
    return (
      <div className="flex justify-around w-full pt-1">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((label, i) => (
          <div key={i} className="flex items-center justify-center text-xs text-gray-600">
            {label}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mb-4 text-purple-600">
        {currentTurn === 'white' ? "White's Turn" : "Black's Turn"}
      </div>
      
      <div className="flex">
        {renderRowLabels()}
        
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-8 border border-gray-300 shadow-md">
            {[...Array(8)].map((_, row) => (
              [...Array(8)].map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={getSquareStyle(row, col)}
                  onClick={() => handleSquareClick(row, col)}
                >
                  {board[row][col] && (
                    <ChessPiece 
                      piece={board[row][col]!} 
                      pieceStyle={pieceStyle}
                      isDragging={selectedPosition?.row === row && selectedPosition?.col === col}
                      isSelected={selectedPosition?.row === row && selectedPosition?.col === col}
                    />
                  )}
                  {renderMoveIndicator(row, col)}
                </div>
              ))
            ))}
          </div>
          
          {renderColLabels()}
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex gap-2 justify-center">
          {capturedPieces.filter(p => p.color === 'black').map((piece, i) => (
            <div key={i} className="text-xl opacity-70">
              <ChessPiece piece={piece} pieceStyle={pieceStyle} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          {capturedPieces.filter(p => p.color === 'white').map((piece, i) => (
            <div key={i} className="text-xl opacity-70">
              <ChessPiece piece={piece} pieceStyle={pieceStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
