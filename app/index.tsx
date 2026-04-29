import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Color,
  importKIF,
  InitialPositionSFEN,
  Move,
  Position,
  Record as ShogiRecord,
  RecordMetadataKey,
  Square,
} from "tsshogi";
import { Board } from "@/components/shogi/Board";
import { Hand } from "@/components/shogi/Hand";
import { KIFInput } from "@/components/shogi/KIFInput";
import { PlaybackControls } from "@/components/shogi/PlaybackControls";
import { findLegalMoveAt, getLegalDestinations } from "@/lib/shogi/moves";

export default function Index() {
  const [record, setRecord] = useState<ShogiRecord | null>(null);
  const [currentPly, setCurrentPly] = useState(0);
  const [freePosition, setFreePosition] = useState(
    () => Position.newBySFEN(InitialPositionSFEN.STANDARD)!,
  );
  const [selected, setSelected] = useState<Square | null>(null);
  const [kifText, setKifText] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  const inReplayMode = record !== null;
  const replayPosition = useMemo(() => {
    if (!record) return null;
    return Position.newBySFEN(record.current.sfen);
  }, [record, currentPly]);
  const position = inReplayMode && replayPosition ? replayPosition : freePosition;

  const legalMoves = useMemo(() => {
    if (inReplayMode || !selected) return [];
    return getLegalDestinations(freePosition, selected);
  }, [inReplayMode, freePosition, selected]);
  const legalDestinations = useMemo(
    () => legalMoves.map((lm) => lm.to),
    [legalMoves],
  );

  const onSquareTap = (square: Square) => {
    if (inReplayMode) {
      setSelected((prev) => (prev?.equals(square) ? null : square));
      return;
    }

    const piece = freePosition.board.at(square);
    const turn = freePosition.color;

    if (selected === null) {
      if (piece && piece.color === turn) setSelected(square);
      return;
    }

    if (selected.equals(square)) {
      setSelected(null);
      return;
    }

    if (piece && piece.color === turn) {
      setSelected(square);
      return;
    }

    const lm = findLegalMoveAt(legalMoves, square);
    setSelected(null);
    if (!lm) return;

    if (lm.base && lm.promoted) {
      Alert.alert("成りますか?", undefined, [
        {
          text: "成る",
          onPress: () => executeMove(lm.promoted!),
        },
        {
          text: "成らず",
          onPress: () => executeMove(lm.base!),
        },
        { text: "キャンセル", style: "cancel" },
      ]);
    } else {
      executeMove(lm.promoted ?? lm.base!);
    }
  };

  const executeMove = (move: Move) => {
    const next = freePosition.clone();
    next.doMove(move);
    setFreePosition(next);
  };

  const loadKIF = () => {
    const trimmed = kifText.trim();
    if (!trimmed) {
      setParseError("KIF テキストが空です");
      return;
    }
    const result = importKIF(trimmed);
    if (result instanceof Error) {
      setParseError(result.message);
      return;
    }
    result.goto(0);
    setRecord(result);
    setCurrentPly(0);
    setParseError(null);
    setSelected(null);
  };

  const navigate = (action: () => void) => {
    if (!record) return;
    action();
    setCurrentPly(record.current.ply);
    setSelected(null);
  };

  const exitReplayMode = () => {
    setRecord(null);
    setCurrentPly(0);
    setSelected(null);
    setFreePosition(Position.newBySFEN(InitialPositionSFEN.STANDARD)!);
  };

  const blackName = record?.metadata.getStandardMetadata(
    RecordMetadataKey.BLACK_NAME,
  );
  const whiteName = record?.metadata.getStandardMetadata(
    RecordMetadataKey.WHITE_NAME,
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>shogi-trainer</Text>

      {inReplayMode && (blackName || whiteName) && (
        <Text style={styles.players}>
          ▲ {blackName ?? "先手"}  vs  △ {whiteName ?? "後手"}
        </Text>
      )}

      <Hand hand={position.whiteHand} color={Color.WHITE} />
      <Board
        position={position}
        selectedSquare={selected}
        legalDestinations={legalDestinations}
        onSquareTap={onSquareTap}
      />
      <Hand hand={position.blackHand} color={Color.BLACK} />

      {inReplayMode && record && (
        <PlaybackControls
          currentPly={currentPly}
          totalMoves={record.length}
          currentMoveText={record.current.displayText}
          onFirst={() => navigate(() => record.goto(0))}
          onPrev={() => navigate(() => record.goBack())}
          onNext={() => navigate(() => record.goForward())}
          onLast={() => navigate(() => record.goto(record.length))}
        />
      )}

      <KIFInput
        text={kifText}
        onChangeText={setKifText}
        onLoad={loadKIF}
        error={parseError}
      />

      {inReplayMode && (
        <Pressable style={styles.exitButton} onPress={exitReplayMode}>
          <Text style={styles.exitButtonLabel}>フリープレイに戻る</Text>
        </Pressable>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  players: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  exitButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  exitButtonLabel: {
    color: "#666",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
