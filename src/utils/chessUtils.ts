
import { BoardState, Piece, PieceColor, Position, PieceType } from '../types/chess';

// Initialize a new chess board with pieces in starting positions
export const initializeBoard = (): BoardState => {
  const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black', id: `black-pawn-${col}` };
    board[6][col] = { type: 'pawn', color: 'white', id: `white-pawn-${col}` };
  }
  
  // Set up other pieces
  const setupRow = (row: number, color: PieceColor) => {
    const backRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    backRow.forEach((type, col) => {
      board[row][col] = { type, color, id: `${color}-${type}-${col}` };
    });
  };
  
  setupRow(0, 'black');
  setupRow(7, 'white');
  
  return board;
};

// Check if a move is valid for a specific piece
export const getValidMoves = (board: BoardState, position: Position): Position[] => {
  const { row, col } = position;
  const piece = board[row][col];
  
  if (!piece) return [];
  
  const validMoves: Position[] = [];
  
  switch (piece.type) {
    case 'pawn':
      // Pawns move differently based on color
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      
      // Forward move (1 square)
      if (isInBounds(row + direction, col) && !board[row + direction][col]) {
        validMoves.push({ row: row + direction, col });
        
        // First move can be 2 squares
        if (row === startRow && !board[row + 2 * direction][col]) {
          validMoves.push({ row: row + 2 * direction, col });
        }
      }
      
      // Capture moves (diagonally)
      const captureOffsets = [{ r: direction, c: -1 }, { r: direction, c: 1 }];
      captureOffsets.forEach(offset => {
        const captureRow = row + offset.r;
        const captureCol = col + offset.c;
        
        if (isInBounds(captureRow, captureCol) && 
            board[captureRow][captureCol] &&
            board[captureRow][captureCol]?.color !== piece.color) {
          validMoves.push({ row: captureRow, col: captureCol });
        }
      });
      break;
      
    case 'rook':
      // Rooks move horizontally and vertically
      addStraightMoves(board, piece, row, col, validMoves);
      break;
      
    case 'knight':
      // Knights move in L-shape
      const knightOffsets = [
        { r: -2, c: -1 }, { r: -2, c: 1 },
        { r: -1, c: -2 }, { r: -1, c: 2 },
        { r: 1, c: -2 }, { r: 1, c: 2 },
        { r: 2, c: -1 }, { r: 2, c: 1 }
      ];
      
      knightOffsets.forEach(offset => {
        const targetRow = row + offset.r;
        const targetCol = col + offset.c;
        
        if (isInBounds(targetRow, targetCol) && 
            (!board[targetRow][targetCol] || board[targetRow][targetCol]?.color !== piece.color)) {
          validMoves.push({ row: targetRow, col: targetCol });
        }
      });
      break;
      
    case 'bishop':
      // Bishops move diagonally
      addDiagonalMoves(board, piece, row, col, validMoves);
      break;
      
    case 'queen':
      // Queens move horizontally, vertically, and diagonally
      addStraightMoves(board, piece, row, col, validMoves);
      addDiagonalMoves(board, piece, row, col, validMoves);
      break;
      
    case 'king':
      // Kings move one square in any direction
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (r === 0 && c === 0) continue;
          
          const targetRow = row + r;
          const targetCol = col + c;
          
          if (isInBounds(targetRow, targetCol) && 
              (!board[targetRow][targetCol] || board[targetRow][targetCol]?.color !== piece.color)) {
            validMoves.push({ row: targetRow, col: targetCol });
          }
        }
      }
      break;
  }
  
  return validMoves;
};

// Helpers for generating moves
const isInBounds = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

const addStraightMoves = (
  board: BoardState, 
  piece: Piece, 
  row: number, 
  col: number, 
  validMoves: Position[]
) => {
  // Horizontal and vertical directions
  const directions = [
    { r: 0, c: 1 }, // right
    { r: 0, c: -1 }, // left
    { r: 1, c: 0 }, // down
    { r: -1, c: 0 } // up
  ];
  
  directions.forEach(dir => {
    let targetRow = row + dir.r;
    let targetCol = col + dir.c;
    
    while (isInBounds(targetRow, targetCol)) {
      if (!board[targetRow][targetCol]) {
        validMoves.push({ row: targetRow, col: targetCol });
      } else {
        if (board[targetRow][targetCol]?.color !== piece.color) {
          validMoves.push({ row: targetRow, col: targetCol });
        }
        break;
      }
      
      targetRow += dir.r;
      targetCol += dir.c;
    }
  });
};

const addDiagonalMoves = (
  board: BoardState, 
  piece: Piece, 
  row: number, 
  col: number, 
  validMoves: Position[]
) => {
  // Diagonal directions
  const directions = [
    { r: 1, c: 1 }, // down-right
    { r: 1, c: -1 }, // down-left
    { r: -1, c: 1 }, // up-right
    { r: -1, c: -1 } // up-left
  ];
  
  directions.forEach(dir => {
    let targetRow = row + dir.r;
    let targetCol = col + dir.c;
    
    while (isInBounds(targetRow, targetCol)) {
      if (!board[targetRow][targetCol]) {
        validMoves.push({ row: targetRow, col: targetCol });
      } else {
        if (board[targetRow][targetCol]?.color !== piece.color) {
          validMoves.push({ row: targetRow, col: targetCol });
        }
        break;
      }
      
      targetRow += dir.r;
      targetCol += dir.c;
    }
  });
};

// Check if the move is valid (in the list of valid moves)
export const isMoveValid = (validMoves: Position[], targetPosition: Position): boolean => {
  return validMoves.some(move => move.row === targetPosition.row && move.col === targetPosition.col);
};

// Make a move and return the updated board
export const makeMove = (
  board: BoardState, 
  fromPosition: Position, 
  toPosition: Position
): BoardState => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[fromPosition.row][fromPosition.col];
  
  if (!piece) return board;
  
  // Mark piece as moved (for special rules like castling)
  piece.hasMoved = true;
  
  // Update board with the move
  newBoard[toPosition.row][toPosition.col] = piece;
  newBoard[fromPosition.row][fromPosition.col] = null;
  
  return newBoard;
};

// Get the piece symbol for display
export const getPieceSymbol = (piece: Piece): string => {
  const symbols: Record<PieceType, string> = {
    pawn: piece.color === 'white' ? '♙' : '♟',
    rook: piece.color === 'white' ? '♖' : '♜',
    knight: piece.color === 'white' ? '♘' : '♞',
    bishop: piece.color === 'white' ? '♗' : '♝',
    queen: piece.color === 'white' ? '♕' : '♛',
    king: piece.color === 'white' ? '♔' : '♚'
  };
  
  return symbols[piece.type];
};
