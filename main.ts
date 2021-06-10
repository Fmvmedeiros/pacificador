// Testar se passou tempo
function TestaSom () {
    if (input.runningTime() > Tempo1 + 60000) {
        Contador = 0
    } else {
        Contador += 1
        Tempo1 = input.runningTime()
        if (Contador == 2) {
            basic.showLeds(`
                . . . . .
                # # # # #
                . . . . .
                # # # # #
                . . . . .
                `)
        } else {
            basic.showLeds(`
                # # # # #
                . . . . .
                # # # # #
                . . . . .
                # # # # #
                `)
        }
        basic.pause(1000)
    }
}
// Funções dos Botões:
input.onButtonPressed(Button.A, function () {
    State = 1
    Treshold += -5
    if (Treshold < 50) {
        Treshold = 50
    }
    basic.showNumber(Treshold)
    State = 0
    Contador = 0
})
input.onButtonPressed(Button.B, function () {
    State = 1
    Treshold += 5
    if (Treshold > 255) {
        Treshold = 255
    }
    basic.showNumber(Treshold)
    State = 0
    Contador = 0
})
/**
 * Setup:
 */
let SomIn = 0
let Tempo1 = 0
let Contador = 0
let State = 0
let Treshold = 0
let ContaLEDS = 0
Treshold = 129
State = 0
Contador = 0
Tempo1 = 0
basic.forever(function () {
    SomIn = input.soundLevel()
    if (SomIn >= Treshold && State == 0) {
        if (Contador == 0) {
            Contador = 1
            Tempo1 = input.runningTime()
            basic.showLeds(`
                . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                `)
            basic.pause(1000)
        } else if (Contador == 1) {
            TestaSom()
        } else if (Contador == 2) {
            TestaSom()
        } else if (Contador == 3) {
            if (input.runningTime() > Tempo1 + 60000) {
                Contador = 0
            } else {
                basic.showIcon(IconNames.EigthNote)
                basic.pause(3000)
                Contador = 0
            }
        }
    } else if (SomIn > Treshold - 50 && SomIn < Treshold) {
        led.plotBarGraph(
        Math.map(SomIn, Treshold - 50, Treshold, 0, 50),
        50
        )
    } else {
        if (State == 0) {
            basic.clearScreen()
            led.plot(2, Math.map(SomIn, 0, Treshold - 50, 4, 0))
        }
    }
})
