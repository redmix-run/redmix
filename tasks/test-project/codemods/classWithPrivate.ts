const foo = `class Bar {}

class Foo {
  // Without the correct babel plugins this will throw an error
  private b = new Bar()

  bar() {
    return this.b
  }
}

export const ClassWithPrivate = () => {
  return <p>{new Foo().bar().toString()}</p>
}`

export default () => {
  return foo
}
