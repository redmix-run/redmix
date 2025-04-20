const foo = `class Bar {}

class Foo {
  public bar = new Bar()
}

export const ClassWithPrivate = () => {
  return <p>{new Foo().bar.toString()}</p>
}`

export default () => {
  return foo
}
