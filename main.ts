input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Heart)
    RunSensor = true
    while (RunSensor) {
        Sensing()
    }
})
function ReadPin () {
    pins.digitalWritePin(DigitalPin.P0, pins.analogReadPin(AnalogPin.P0))
    basic.pause(0.1)
    Reading += 1
}
function Sensing () {
    Reading = 0
    for (let index = 0; index <= Samples; index++) {
        ReadPin()
    }
    BtnValue = Reading + Samples
    GraphVal = BtnValue - Offset
    serial.writeLine("" + (GraphVal))
    led.plotBarGraph(
    GraphVal,
    255
    )
}
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
    RunSensor = false
})
let GraphVal = 0
let BtnValue = 0
let Offset = 0
let RunSensor = false
let Samples = 0
let Reading = 0
basic.showNumber(0)
Reading = 0
Samples = 10
RunSensor = true
Offset = 328
