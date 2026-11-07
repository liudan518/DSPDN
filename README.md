# DSPDN · Modern Multilingual Research Website

## 公开访问 / Public access

- **科研主页 / Research website:** [https://liudan518.github.io/DSPDN/](https://liudan518.github.io/DSPDN/)
- **论文 PDF / Paper PDF:** [https://liudan518.github.io/DSPDN/paper.pdf](https://liudan518.github.io/DSPDN/paper.pdf)

网页与论文均可公开访问，无需登录。The website and paper are publicly accessible without signing in.

网站通过 GitHub Pages 发布；更新 `main` 分支后会自动构建并部署。
The site is published with GitHub Pages and redeploys automatically when `main` is updated.

## 中文使用说明

本资源包由原始 `DSPDN.zip` 网页重构而成，保留原来的论文 PDF、所有原始科研图表和数据表格，不改变实验数值。

- 双击 `index.html` 即可打开本地网页；也可将整个文件夹部署至任意静态网页服务器。
- 顶部语言下拉菜单支持中文、English、Русский、Français、العربية（阿拉伯语自动切换右至左阅读方向）。
- 点击论文图件可以在弹窗中查看，使用 Esc 关闭；“查看原始图片”可在新标签页打开原文件。
- 结果区可切换 60、120、180 步预测指标，所有数值保留自原网页；宽表格在手机端可横向滚动。
- 所有 CSS、JavaScript、插图和论文 PDF 均存放在本地，无 CDN、第三方字体或分析追踪代码。
- 语言翻译位于 `assets/translations.json` 和浏览器直接使用的 `assets/i18n.js`；若修改翻译文本，请同步更新这两个文件。

**科研内容提醒：** 这是网页排版与多语本地化改版，不构成额外实验验证。新增的俄语、法语、阿拉伯语翻译建议在公开传播前请母语专家复核。原始英文摘要在不同语言下提供了译文；科学图件本身仍使用论文原始英文标注。

## English quick start

Open `index.html` locally, or deploy the entire directory as a static site. Select Chinese, English, Russian, French or Arabic from the navigation bar. Arabic uses RTL page direction; equations and research tables retain LTR ordering. Image lightbox, keyboard dismissal and forecast-horizon toggles are provided without any external runtime dependencies.

### Files

- `index.html`: page structure and preserved scientific content
- `assets/modern.css`: responsive layout and visual styling
- `assets/site.js`: languages, image lightbox, paper-title copy and table toggles
- `assets/i18n.js` / `assets/translations.json`: interface and scientific explanation translations
- `images/`: original figures and source-table screenshots
- `paper.pdf`: original manuscript from the uploaded archive
- `previews/`: desktop and mobile preview screenshots
