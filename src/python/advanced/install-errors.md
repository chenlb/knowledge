# Python 库安装常见错误

## pip install pyaudio

[安装步骤](https://people.csail.mit.edu/hubert/pyaudio/)：
```bash
brew install portaudio

# macOS m1 安装会报错。
pip install pyaudio
```

::: details 报错内容如下：
```console
      /usr/local/include/Block.h:16:3: error: Never include this file directly. Use <lzma.h> instead.
      #       error Never include this file directly. Use <lzma.h> instead.
              ^
      /usr/local/include/Block.h:93:2: error: unknown type name 'lzma_check'
              lzma_check check;
              ^
      /usr/local/include/Block.h:148:2: error: unknown type name 'lzma_vli'
              lzma_vli compressed_size;
              ^
      /usr/local/include/Block.h:172:2: error: unknown type name 'lzma_vli'
              lzma_vli uncompressed_size;
              ^
      /usr/local/include/Block.h:200:2: error: unknown type name 'lzma_filter'
              lzma_filter *filters;
              ^
      /usr/local/include/Block.h:217:20: error: use of undeclared identifier 'LZMA_CHECK_SIZE_MAX'
              uint8_t raw_check[LZMA_CHECK_SIZE_MAX];
                                ^
      /usr/local/include/Block.h:231:2: error: unknown type name 'lzma_vli'
              lzma_vli reserved_int3;
              ^
      /usr/local/include/Block.h:232:2: error: unknown type name 'lzma_vli'
              lzma_vli reserved_int4;
              ^
      /usr/local/include/Block.h:233:2: error: unknown type name 'lzma_vli'
              lzma_vli reserved_int5;
              ^
      /usr/local/include/Block.h:234:2: error: unknown type name 'lzma_vli'
              lzma_vli reserved_int6;
              ^
      /usr/local/include/Block.h:235:2: error: unknown type name 'lzma_vli'
              lzma_vli reserved_int7;
              ^
      /usr/local/include/Block.h:236:2: error: unknown type name 'lzma_vli'
              lzma_vli reserved_int8;
              ^
      /usr/local/include/Block.h:237:2: error: unknown type name 'lzma_reserved_enum'
              lzma_reserved_enum reserved_enum1;
              ^
      /usr/local/include/Block.h:238:2: error: unknown type name 'lzma_reserved_enum'
              lzma_reserved_enum reserved_enum2;
              ^
      /usr/local/include/Block.h:239:2: error: unknown type name 'lzma_reserved_enum'
              lzma_reserved_enum reserved_enum3;
              ^
      /usr/local/include/Block.h:240:2: error: unknown type name 'lzma_reserved_enum'
              lzma_reserved_enum reserved_enum4;
              ^
      /usr/local/include/Block.h:261:2: error: unknown type name 'lzma_bool'
              lzma_bool ignore_check;
              ^
      /usr/local/include/Block.h:263:2: error: unknown type name 'lzma_bool'
              lzma_bool reserved_bool2;
              ^
      /usr/local/include/Block.h:264:2: error: unknown type name 'lzma_bool'
              lzma_bool reserved_bool3;
              ^
      fatal error: too many errors emitted, stopping now [-ferror-limit=]
      2 warnings and 20 errors generated.
      error: command '/usr/bin/clang' failed with exit code 1
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for pyaudio
Failed to build pyaudio
ERROR: Failed to build installable wheels for some pyproject.toml based projects (pyaudio)
```
:::

[解决方案](https://github.com/rogual/neovim-dot-app/issues/331#issuecomment-468986002)：
```bash
# 把 /usr/local/include/block.h 文件重命名为 block.h.old
mv /usr/local/include/block.h /usr/local/include/block.h.old
```

如果缺少 portaudio 库，可以使用 pip 参数 指明 portaudio 路径：
```bash
pip install --config-settings="--build-option=build_ext" \
   --config-settings="--build-option=--library-dirs=/usr/local/Cellar/portaudio/19.7.0/lib" \
   --config-settings="--build-option=--include-dirs=/usr/local/Cellar/portaudio/19.7.0/include" \
   pyaudio
```