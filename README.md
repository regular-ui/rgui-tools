# rgui-tools

Developer Tools for Regular UI

## Commands

- `rgui-tools help`：查看帮助
- `rgui-tools init -c <components> <repo>`：初始化一个仓库（只支持以`ui-`开头的仓库，暂不支持多组件）。示例：`rgui-tools init -c Uploader ui-uploader`。

以下命令在仓库目录下（如`./ui-sample`）运行：

- `rgui-tools doc`：生成文档
- `rgui-tools gh-pages`：生成文档，并将`./doc`目录下的文档发布到该仓库的`gh-pages`中。
- `rgui-tools dist`：打包当前目录下的index文件
    - `-o, --output <output>`：库的文件名（不带后缀）。默认为`index`。
    - `--library <library>`：库的命名空间。默认为`RGUI`。
    - `--devtool <devtool>`：webpack的devtool参数
- `rgui-tools test`：运行测试
    - `--browsers <browsers>`：测试浏览器。多个以逗号隔开，默认为`PhantomJS`。
    - `--reporters <reporters>`：测试报告。多个以逗号隔开，默认为`nyan,coverage`。
- `rgui-tools lint`：验证代码风格
    - `-f, --fix`：验证时自动修复
- `rgui-tools publish`：修改version，提交代码，打tag，然后发布npm版本。
- `-w, --watch`：监听文件变更。上面的`doc`, `dist`, `test`, `lint`4种命令都可以配置该选项。
- `-O, --online-mode`：线上模式。`test`命令配置该选项后，会设置测试报告为`mocha,coverage,coveralls`。
- `-v, --verbose`：输出详细信息
- `-V, --version`：当前版本

集成命令：

- `rgui-tools dev`：相当于`rgui-tools doc+lint --watch --fix`，始终监听文件，自动修复lint问题。
