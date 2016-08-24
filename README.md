# rgui-tools

Developer Tools for Regular UI

## Commands

- `rgui-tools help`：查看帮助
- `rgui-tools init -c <components> <repo>`：初始化一个仓库（只支持以`ui-`开头的仓库，暂不支持多组件）。示例：`rgui-tools init -c Uploader ui-uploader`。

以下命令在仓库目录下（如`./ui-sample`）运行：

- `rgui-tools doc`：生成文档


- `-w, --watch`：监听文件变更

集成命令：

- `rgui-tools dev`：相当于









- `rgui-tools dev`：监听js、mcss和md等文件，实时更新脚本、样式和文档。
- `rgui-tools doc`：先清理`./doc`目录，然后重新生成文档。
- `rgui-tools gh-pages`：将`./doc`目录下的文档发布到该仓库的`gh-pages`中。
- `rgui-tools dist`：生成打包文件（会先清理`./dist`目录）。
    - `-l, --library`：库的命名空间
- `rgui-tools test`：运行测试（默认监听）
    - `-s, --single-run`：只运行一遍测试
    - `-O, --online`：线上模式
- `rgui-tools lint`：验证代码风格
    - `-f, --fix`：验证时自动修复
- `rgui-tools publish`：修改version，提交代码，打tag，然后发布npm版本。
