def on_button_pressed_a():
    global RunSensor
    basic.show_icon(IconNames.HEART)
    RunSensor = True
    while RunSensor:
        Sensing()
input.on_button_pressed(Button.A, on_button_pressed_a)

def ReadPin():
    global Reading
    pins.digital_write_pin(DigitalPin.P0, 1)
    basic.pause(0.1)
    Reading += pins.analog_read_pin(AnalogPin.P0)
def Sensing():
    global Reading, BtnValue, GraphVal
    Reading = 0
    index = 0
    while index <= Samples:
        ReadPin()
        index += 1
    BtnValue = Reading + Samples
    GraphVal = BtnValue - Offset
    serial.write_line("" + str((GraphVal)))
    led.plot_bar_graph(GraphVal, 255)

def on_button_pressed_b():
    global RunSensor
    basic.show_icon(IconNames.NO)
    RunSensor = False
input.on_button_pressed(Button.B, on_button_pressed_b)

GraphVal = 0
BtnValue = 0
Offset = 0
RunSensor = False
Samples = 0
Reading = 0
basic.show_number(0)
Reading = 0
Samples = 10
RunSensor = True
Offset = 328

def on_forever():
    pass
basic.forever(on_forever)
