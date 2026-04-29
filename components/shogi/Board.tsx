import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Color,
  ImmutablePosition,
  PieceType,
  Square,
} from "tsshogi";

const PIECE_KANJI: Record<PieceType, string> = {
  [PieceType.PAWN]: "歩",
  [PieceType.LANCE]: "香",
  [PieceType.KNIGHT]: "桂",
  [PieceType.SILVER]: "銀",
  [PieceType.GOLD]: "金",
  [PieceType.BISHOP]: "角",
  [PieceType.ROOK]: "飛",
  [PieceType.KING]: "玉",
  [PieceType.PROM_PAWN]: "と",
  [PieceType.PROM_LANCE]: "杏",
  [PieceType.PROM_KNIGHT]: "圭",
  [PieceType.PROM_SILVER]: "全",
  [PieceType.HORSE]: "馬",
  [PieceType.DRAGON]: "龍",
};

function getPieceKanji(type: PieceType, color: Color): string {
  if (type === PieceType.KING && color === Color.WHITE) return "王";
  return PIECE_KANJI[type];
}

const SQUARE_SIZE = 38;

type BoardProps = {
  position: ImmutablePosition;
  selectedSquare?: Square | null;
  onSquareTap?: (square: Square) => void;
};

export function Board({ position, selectedSquare, onSquareTap }: BoardProps) {
  return (
    <View style={styles.board}>
      {Array.from({ length: 9 }, (_, y) => (
        <View key={y} style={styles.row}>
          {Array.from({ length: 9 }, (_, x) => {
            const square = Square.newByXY(x, y);
            const piece = position.board.at(square);
            const isSelected = selectedSquare?.equals(square) ?? false;
            return (
              <Pressable
                key={x}
                style={[styles.square, isSelected && styles.squareSelected]}
                onPress={() => onSquareTap?.(square)}
              >
                {piece && (
                  <Text
                    style={[
                      styles.piece,
                      piece.color === Color.WHITE && styles.pieceGote,
                    ]}
                  >
                    {getPieceKanji(piece.type, piece.color)}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    borderColor: "#3a2918",
    backgroundColor: "#f5d398",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#3a2918",
    alignItems: "center",
    justifyContent: "center",
  },
  squareSelected: {
    backgroundColor: "#fde68a",
  },
  piece: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a0f06",
  },
  pieceGote: {
    transform: [{ rotate: "180deg" }],
  },
});
