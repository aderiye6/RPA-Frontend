/*global chrome*/
var tabId

var hightCfg = {
    showInfo: true,
    showStyles: true,
    contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
}

window?.addEventListener('load', function () {
    chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
        tabId = response?.sender?.tab?.id

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Overlay.setInspectMode',
            { mode: 'searchForNode', highlightConfig: hightCfg }
        )

        window?.addEventListener('load', function () {
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
            chrome?.debugger?.onEvent?.addListener(onEvent)

            document
                ?.getElementById('btn_inspect')
                ?.addEventListener('click', function () {
                    chrome.debugger.sendCommand(
                        { tabId: tabId },
                        'Overlay.setInspectMode',
                        { mode: 'searchForNode', highlightConfig: hightCfg }
                    )
                })
        })
    })
})

window?.addEventListener('unload', function () {
    chrome?.debugger?.detach({ tabId: tabId })
})

chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
    tabId = response?.sender?.tab?.id

    window?.addEventListener('load', function () {
        chrome.debugger.attach({ tabId: tabId }, '1.0', function () {
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
            chrome.debugger.sendCommand(
                { tabId: tabId },
                'Overlay.setInspectMode',
                { mode: 'searchForNode', highlightConfig: hightCfg }
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
        })

        chrome?.debugger?.onEvent?.addListener(onEvent)

        document
            ?.getElementById('btn_inspect')
            ?.addEventListener('click', function () {
                chrome.debugger.sendCommand(
                    { tabId: tabId },
                    'Overlay.setInspectMode',
                    { mode: 'searchForNode', highlightConfig: hightCfg }
                )
            })
    })
})

function onEvent(debuggeeId, message, params) {
    console.log('onEvent ...' + message)
    if (tabId != debuggeeId.tabId) return

    if (message == 'Network.inspectNodeRequested') {
        console.log('update element')
    }
}
