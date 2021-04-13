module.exports = class Controller {
  constructor(inputs, defaultOutput) {
    document.addEventListener("keydown", this.check.bind(this));
    this.inputs = inputs
    if (defaultOutput) {
      this.output = defaultOutput
    }
  }

  check() {
    this.inputs.forEach(input => {
      if (this.event.keyCode === input.keyCode) {
        if (this.output) {
          this.output = input.output
        }
        if (input.fun) {
          input.fun()
        }
      }
    })
  }
}
