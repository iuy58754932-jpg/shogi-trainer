import { ImmutablePosition, Move, Square } from "tsshogi";

/**
 * 指定マスへの合法手。
 * - base: 不成の指し手(合法でない場合は null)
 * - promoted: 成りの指し手(合法でない場合は null)
 *
 * base と promoted の両方が non-null なら任意の成り(ユーザー選択)。
 * promoted のみ non-null なら強制成り。
 * base のみ non-null なら成れない通常移動。
 */
export type LegalMove = {
  to: Square;
  base: Move | null;
  promoted: Move | null;
};

export function getLegalDestinations(
  position: ImmutablePosition,
  from: Square,
): LegalMove[] {
  const result: LegalMove[] = [];
  for (const to of Square.all) {
    const baseMove = position.createMove(from, to);
    if (!baseMove) continue;
    const baseValid = position.isValidMove(baseMove);
    const promotedMove = baseMove.withPromote();
    const promotedValid =
      promotedMove !== baseMove && position.isValidMove(promotedMove);
    if (!baseValid && !promotedValid) continue;
    result.push({
      to,
      base: baseValid ? baseMove : null,
      promoted: promotedValid ? promotedMove : null,
    });
  }
  return result;
}

export function findLegalMoveAt(
  legalMoves: LegalMove[],
  to: Square,
): LegalMove | null {
  return legalMoves.find((lm) => lm.to.equals(to)) ?? null;
}
