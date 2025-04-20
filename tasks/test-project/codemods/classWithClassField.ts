const foo = `class Bar {}

class Foo {
  // Without the correct babel plugins this will throw an error
  public bar = new Bar()
}

export const ClassWithClassField = () => {
  return <p>{new Foo().bar.toString()}</p>
}`

export default () => {
  return foo
}
