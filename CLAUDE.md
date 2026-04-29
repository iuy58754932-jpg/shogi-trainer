# shogi-trainer

将棋実戦の振り返り + 次の一手集・実戦詰将棋・仕掛け条件集を作成できるスマホアプリ。Expo (React Native) で iOS/Android 両対応、App Store / Play Store 配信を目標。

## コマンド

```bash
npm run android    # Android エミュレータで起動(メイン開発手段)
npm start          # Expo dev server のみ起動
npm run lint       # ESLint
```

## 技術スタック

- Expo SDK 54 / React Native 0.81 / React 19
- TypeScript (strict)
- expo-router (file-based routing、`app/` 配下)
- expo-sqlite (永続化)
- zustand (状態管理)

## 動作確認

- **主軸**: Android エミュレータ(Pixel 7 / API 36 Baklava)
  - 開発 PC は Windows + 有線 LAN + Wi-Fi なし、iPhone は 4G のみ
  - ローカル iPhone 検証は不可(同 Wi-Fi にできない、tunnel も不安定)
- **iOS**: 提出時に **EAS Build + TestFlight** で実機検証

## MVP スコープ

1. KIF テキスト取込(shogi-extend.com からコピペ)
2. 棋譜リスト(戦法・囲い・勝敗フィルタ)
3. 盤面再生 UI(1 手ずつ進む/戻る、現在局面表示)
4. 次の一手集(任意局面で正解手マーク → 練習)
5. 実戦詰将棋集(詰みの局面マーク → 練習)
6. 仕掛けの条件集(shogi-extend のメタタグを活用)

写真認識 / 自動詰み判定 / クラウド同期 / Web アプリ化は **MVP 範囲外**(v2+)。

## KIF 入力フロー(MVP)

1. ユーザーが将棋ウォーズで対局
2. shogi-extend.com の対局 URL を開く
   - URL 形式: `https://www.shogi-extend.com/swars/battles/{p1}-{p2}-{datetime}`
3. KIF テキストをコピー
4. アプリ内のテキストエリアに貼付け → パース → 保存

shogi-extend の KIF には **戦法・囲い・手筋・接触手・開戦手** 等のタグが自動付与されている(「仕掛けの条件集」機能ではこれを活用)。

## やらないこと

- Next.js / Web アプリ化(これは RN モバイルアプリ)
- iOS シミュレータでの動作確認(macOS 必須、ローカルでは動かない)
- 認証 / クラウド同期(オフライン専用)
- 写真からの棋譜読取(v2+)
