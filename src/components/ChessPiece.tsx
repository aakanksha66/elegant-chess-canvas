
import React from 'react';
import { Piece, PieceStyle } from '../types/chess';
import { getPieceSymbol } from '../utils/chessUtils';

interface ChessPieceProps {
  piece: Piece;
  pieceStyle: PieceStyle;
  isDragging?: boolean;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, pieceStyle, isDragging }) => {
  // Use Unicode chess symbols as a fallback
  const pieceSymbol = getPieceSymbol(piece);
  
  // Different style classes based on selected piece style
  const styleClasses = {
    standard: "text-3xl md:text-4xl",
    modern: "text-3xl md:text-4xl font-bold",
    minimalist: "text-2xl md:text-3xl font-light"
  };
  
  // Provide different styling based on piece color and piece style
  const getPieceStyles = () => {
    const baseStyle = "chess-piece-transition";
    const hoverStyle = "chess-piece-hover";
    const dragStyle = isDragging ? "scale-110 animate-piece-move" : "";
    
    // Style-specific configurations
    switch (pieceStyle) {
      case 'modern':
        return `${baseStyle} ${hoverStyle} ${styleClasses.modern} ${piece.color === 'white' ? 'text-white' : 'text-black'} ${dragStyle}`;
      case 'minimalist':
        return `${baseStyle} ${hoverStyle} ${styleClasses.minimalist} ${piece.color === 'white' ? 'text-gray-200' : 'text-gray-800'} ${dragStyle}`;
      case 'standard':
      default:
        return `${baseStyle} ${hoverStyle} ${styleClasses.standard} ${piece.color === 'white' ? 'text-white' : 'text-black'} ${dragStyle}`;
    }
  };
  
  return (
    <div className={`flex items-center justify-center w-full h-full ${getPieceStyles()}`}>
      {pieceSymbol}
    </div>
  );
};

export default ChessPiece;
