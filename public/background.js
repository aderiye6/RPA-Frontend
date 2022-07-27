/*global chrome*/
var version = '1.0'

chrome.debugger.onEvent.addListener(function (source, method, params) {
    console.log(source, method, params, 'huj')
})


chrome?.runtime?.onMessage?.addListener(function (
    message,
    sender,
    senderResponse
) {
    var tabId = sender?.tab?.id
    var hightCfg = {
        showInfo: true,
        showStyles: true,
        contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
    }

    function onEvent(debuggeeId, message, params) {
        if (tabId != debuggeeId.tabId) return

        if (message == 'Network.inspectNodeRequested') {
            console.log('didupdate')
            //do something..
        }
    }

   
    chrome?.debugger?.attach({ tabId: tabId }, '1.0', function () {
        chrome?.debugger?.sendCommand(
            { tabId: tabId },
            'DOM.enable',
            function () {
                console.log('Result:', arguments)
            }
        )
        chrome?.debugger?.sendCommand(
            { tabId: tabId },
            'DOM.setInspectedNode',
            function () {
                console.log('Result:', arguments)
            }
        )
        chrome?.debugger?.sendCommand(
            { tabId: tabId },
            'DOM.requestNode',
            function () {
                console.log('Result:', arguments)
            }
        )
        chrome?.debugger?.sendCommand(
            { tabId: tabId },
            'Overlay.enable',
            function () {
                console.log('Result:', arguments)
            }
        )
        chrome?.debugger?.onEvent?.addListener(onEvent)

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Overlay.setInspectMode',
            { mode: 'searchForNode', highlightConfig: hightCfg },
            function (result) {
                console.log(result, 'UPDATE')
            }
        )

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'DOM.setInspectedNode',
            { mode: 'searchForNode', highlightConfig: hightCfg },
            function (result) {
                console.log(result, 'kolio')
            }
        )

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Overlay.setInspectMode',
            { mode: 'searchForNode', highlightConfig: hightCfg },
            function (result) {
                console.log(result, 'UPDATE')
            }
        )

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Runtime.evaluate',
            {
                expression:
                    'console.log(document.body); inspect(document.body);',
            },
            function () {
                console.log('Result:', arguments)
            }
        )

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Runtime.evaluate',
            {
                expression:
                    'console.log(document.body)',
            },
            function () {
                console.log('Result:', arguments)
            }
        )

        chrome?.debugger?.onEvent?.addListener(onEvent)

        window.addEventListener('unload', function () {
            chrome.debugger.detach({ tabId: tabId })
        })

        chrome.debugger.onEvent.addListener(function (source, method, params) {
            console.log(source, method, params, 'called ming')
        })
    })
    if (message.name === 'message') {
        senderResponse({ text: 'Petter Joe', sender })

        return true
    }
})
