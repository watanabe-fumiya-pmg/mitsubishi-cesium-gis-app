# プロジェクト名

仮称：三菱重工地図アプリ

# 概要

# デモ

- デモ URL: [https://example.com](https://example.com)

# 主な機能

- 機能 1
- 機能 2
- 機能 3

---

# アーキテクチャ

- 技術スタックの全体像
- システム構成図（必要に応じて画像を追加）

## 技術スタック

- フロントエンド: React, Javascript

  - resium が 19 系に対応中　安定板の 18 系を利用
    https://github.com/reearth/resium/issues/689
  - モジュールハンドラーは webpack を採用

- バックエンド: Node.js, Express

- インフラ: Docker

  - Docker ベースイメージとして、下記を推奨する。

  ```
  node : 22.11.0
  Ubuntu : 24.04
  ```

## デザインパターンについて

- プロバイダーパターン  
   Cesium の viewer のインスタンスをどのコンポーネントでも利用できるようにするため。  
   参考：https://zenn.dev/morinokami/books/learning-patterns-1/viewer/provider-pattern
- リポジトリパターン  
   API とモック API の切り替えを容易にするため。  
   参考：https://zenn.dev/tokyofactory/articles/99e4f6b6042f1c
- HOC パターン  
   ローディング等の共通仕様のため。  
   参考：https://zenn.dev/morinokami/books/learning-patterns-1/viewer/hoc-pattern

## スタイルについて

- `SCSS` および `react-bootstrap` を採用  
  `(案)地理空間情報処理・表示アプリケーション*開発仕様書_本文.pdf` の 4.5 のスタイルガイドを適用するために、スタイル全体のカスタマイズをできるようにするため。

## 開発規約の遵守について

`05\_電三-02-00246_A_HPC サーバシステム開発要領.pdf` の開発規約より命名規則やコーディング規則規約あり。

- 全て網羅していないが、以下ファイルで制御可能

  - app\eslint.config.js
  - 命名規則と JsDoc の警告設定
  - prettierrc と競合しないように設定
    app\.prettierrc
    package.json に設定を入れているため、以下コマンドで規約違反を検知できる。

    ```
    npm run lint
    npm run lint:fix
    ```

## ロギングについて

- アプリケーションのログ出力は winston を採用想定。node.js 必須。
- ログローテート処理およびファイル出力が必要なため、react のみでは実装不可の認識。
- fastapi 側でログローテート処理やファイル出力をしてもらえるなら、node.js も不要。

# 開発環境

- Visual Studio Code

  ```
  バージョン: 1.99.1 (user setup)
  コミット: 7c6fdfb0b8f2f675eb0b47f3d95eeca78962565b
  日付: 2025-04-04T15:58:59.624Z
  Electron: 34.3.2
  ElectronBuildId: 11161073
  Chromium: 132.0.6834.210
  Node.js: 20.18.3
  V8: 13.2.152.41-electron.0
  OS: Windows_NT x64 10.0.22631
  ```

- Docker Engine v28.0.4

  - お客様の仕様では 27.5.0 を利用。Windows でバージョン固定できるか要確認
  - Docker Desktop pro のライセンス契約が必要

- Github
  - Fine-grained personal access tokens を用いて、期間限定のリポジトリ管理を実施想定
  - ソースコード管理
    - リポジトリはどこで再作成するか要確認
  - issue 管理
    - issue テンプレートは別途作成予定
    - WBS 側にも issue 番号で進捗報告実施想定

# インストール方法

```
git clone https://github.com/watanabe-fumiya-pmg/mitsubishi-cesium-gis-app.git
cd app
npm ci
```

# 起動方法

## Docker コンテナ起動方法

```
TBD
```

## アプリ起動方法

```
npm run start
```

# テスト方法

```
TBD
```

# 環境変数

webpack に dotenv-webpack をインポートしているため、`app/src`配下に`.env`ファイルを作成してください。
| 変数名 | 説明 | 例 |
| ------- | ---- | --- |
| API_KEY | TD | TD |
| TD | TD | TD |

# ディレクトリ構成

詳細については、TBD

```
.
├─.vsocde
├─app
│  ├─public
│  │  └─data
│  └─src
│      ├─assets
│      │  └─styles
│      │      └─components
│      ├─components
│      ├─features
│      ├─pages
│      ├─providers
│      ├─routes
│      ├─services
│      └─utils
├─docker
└─server
```

# API 仕様

TBD

# コード修正方法

1. ブランチを作成 (git checkout -b feature/your-feature)
   - ブランチ命名規則に沿ってブランチ作成
2. 変更をコミット (git commit -m 'Add your feature')
   - コミット命名規則に則してコミットコメント作成
3. プッシュ (git push origin feature/your-feature)
4. プルリクエストを作成
   1. レビュアー招待規則に沿って、プルリクエスト作成
   2. 確認観点表に沿って、コード品質を担保して、マージ

# リリース履歴（Changelog / Release Notes）

- v1.0.0 - 初期リリース

# バグ事項（後ほど issue 管理）

- webpack での起動時に C ドライブを読み込む処理が入ってしまっているため、権限不足で起動できないことがある。要修正。
  参考：https://sixtusagbo.medium.com/how-i-solved-webpack-chokidar-error-error-ebusy-resource-busy-or-locked-lstat-c-dumpstack-log-e7d5fc76c861

- Cesium ION を用いない想定のため、コンソールログに出力される ION のロードエラーは解消する必要あり。
