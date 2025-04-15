
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';
export type Position = { row: number; col: number };
export type Piece = {
  type: PieceType;
  color: PieceColor;
  id: string;
  hasMoved?: boolean;
};

export type BoardTheme = 'classic' | 'blue' | 'forest';
export type PieceStyle = 'standard' | 'modern' | 'minimalist';

export type BoardState = (Piece | null)[][];

export type GameState = {
  board: BoardState;
  currentTurn: PieceColor;
  selectedPiece: Position | null;
  validMoves: Position[];
  capturedPieces: Piece[];
  boardTheme: BoardTheme;
  pieceStyle: PieceStyle;
};
