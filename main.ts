input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Heart)
    RunSensor = true
    while (RunSensor) {
        Sensing()
        basic.pause(0)
    }
})
function ReadPin () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(0.1)
    Reading += pins.analogReadPin(AnalogPin.P0)
}
function Sensing () {
    Reading = 0
    for (let index = 0; index <= Samples; index++) {
        ReadPin()
    }
    BtnValue = Reading / Samples
    GraphVal = BtnValue - Offset
    led.plotBarGraph(
    GraphVal,
    255
    )
    if (GraphVal < Lowest) {
        Lowest = GraphVal
    }
    if (GraphVal > Highest) {
        Highest = GraphVal
    }
    serial.writeValue("o.current", GraphVal)
    serial.writeValue("o.high", Highest)
    serial.writeValue("o.low", Lowest)
}
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
    RunSensor = false
})
let BtnValue = 0
let Highest = 0
let GraphVal = 0
let Lowest = 0
let Offset = 0
let RunSensor = false
let Samples = 0
let Reading = 0
basic.showNumber(0)
Reading = 0
Samples = 500
RunSensor = false
Offset = 328
Sensing()
Lowest = GraphVal
Highest = GraphVal
