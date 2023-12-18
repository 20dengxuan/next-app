# TS 相关

### 1. 函数第二个参数类型是根据第一个参数类型
```ts
interface person{
  name: string
  id: number
}

function<T extends keyof person>fn(a: T, b: person[T]){}
```