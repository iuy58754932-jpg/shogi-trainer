import { StyleSheet, Text, View } from "react-native";
import { Color, ImmutableHand, PieceType } from "tsshogi";

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

const HAND_PIECE_ORDER: PieceType[] = [
  PieceType.ROOK,
  PieceType.BISHOP,
  PieceType.GOLD,
  PieceType.SILVER,
  PieceType.KNIGHT,
  PieceType.LANCE,
  PieceType.PAWN,
];

type HandProps = {
  hand: ImmutableHand;
  color: Color;
};

export function Hand({ hand, color }: HandProps) {
  const items = HAND_PIECE_ORDER.map((type) => ({
    type,
    count: hand.count(type),
  })).filter((item) => item.count > 0);

  const marker = color === Color.BLACK ? "▲" : "△";

  return (
    <View style={styles.container}>
      <Text style={styles.marker}>{marker}</Text>
      {items.length === 0 ? (
        <Text style={styles.empty}>なし</Text>
      ) : (
        items.map((item) => (
          <View key={item.type} style={styles.pieceItem}>
            <Text style={styles.piece}>{PIECE_KANJI[item.type]}</Text>
            {item.count > 1 && (
              <Text style={styles.count}>{item.count}</Text>
            )}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    minHeight: 36,
    gap: 6,
    flexWrap: "wrap",
    alignSelf: "center",
    maxWidth: 360,
  },
  marker: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginRight: 2,
  },
  empty: {
    fontSize: 12,
    color: "#888",
  },
  pieceItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  piece: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a0f06",
  },
  count: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a0f06",
    marginLeft: 1,
  },
});
