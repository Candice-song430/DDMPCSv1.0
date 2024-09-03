- Algorithms文件夹

  把实现各种算法全部写在该文件夹的对应文件夹中

  - data-reduction文件夹：数据约简
  - decision-tree文件夹：决策树
  - rule-extraction文件夹：规则抽取

- Services文件夹

  用来处理业务逻辑，主要调用Algorithms实现的各种算法，然后把结果返回给前端。



注意，Services中return的结构不要改变，例如：

```python
    return {
        'data': data
    }
```

可以修改变量名（即字典的value），例如：

```python
    return {
        'data': data
    }
```

但是不要修改字典的key



总之一句话，return语句最好不要改

```
# 方法一: 不需要把处理结果保存至本地，然后返回处理结果
# bio = io.BytesIO()
# writer = pandas.ExcelWriter(bio, engine='xlsxwriter')
# # 省略pandas处理结果，results为最后生成的dataframe对象

# TODO

# results = pandas.read_excel(base_path, keep_default_na=False)  # 把空值nan转化为''
# results.to_excel(writer, sheet_name='结果汇总')
# writer.save()

# bio.seek(0)  # 文件指针
# rv = make_response(bio.getvalue())
# bio.close()
# rv.headers['Content-Type'] = "application/vnd.ms-excel"
# rv.headers["Cache-Control"] = "no-cache"
## "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 这个是xlsx格式的，上面的是xls格式的
# return rv
```