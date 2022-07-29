/*global chrome*/
var version = '1.0'

//show popup page while click icon
chrome.action.onClicked.addListener(function (tab) {
    chrome.debugger.attach(
        { tabId: tab.id },
        version,
        onAttach.bind(null, tab.id)
    )
})

chrome.debugger.onEvent.addListener(function (source, method, params) {
    console.log(source, method, params, 'huj')
})

function onAttach(tabId) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message)
        return
    }

    chrome.windows.create({
        url: 'headers.html?' + tabId,
        type: 'popup',
        width: 800,
        height: 600,
    })
}

window.addEventListener('message', (event) => {
    // Only accept messages from the same frame
    console.log(event, 'workingDeaddd')
    if (event.source !== window) {
        return
    }

    var message = event.data

    // Only accept messages that we know are ours
    if (
        typeof message !== 'object' ||
        message === null ||
        (!!message.source && message.source !== 'dataaccessgateway-agent')
    ) {
        return
    }
    chrome.runtime.sendMessage(message)
})

chrome.runtime.onMessageExternal.addListener(function (
    request,
    sender,
    sendResponse
) {
    console.log(request, sender, sendResponse)
    if (sender.url === 'blocklistedWebsite') return // don't allow this web page access
    // if (request.openUrlInEditor) openUrl(request.openUrlInEditor)

    // senderResponse()
    sendResponse('ok')
})

chrome.runtime.onMessage.addListener(function (
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

    chrome.debugger.attach({ tabId: tabId }, '1.0', function () {
        chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
        chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
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
            'Runtime.evaluate',
            {
                expression:
                    'console.log(document.body); inspect(document.body);',
            },
            function () {
                console.log('Result:', arguments)
            }
        )

        window.addEventListener('unload', function () {
            chrome.debugger.detach({ tabId: tabId })
        })

        chrome.debugger.onEvent.addListener(function (source, method, params) {
            console.log(source, method, params, 'called ming')
        })

        function onEvent(debuggeeId, message, params) {
            console.log('onEvent ...' + message, params)
            if (tabId != debuggeeId.tabId) return

            if (message == 'Network.inspectNodeRequested') {
                console.log('didupdate')
                //do something..
            }
        }
    })
    if (message.name === 'message') {
        senderResponse({ text: 'Petter Joe', sender })

        return true
    }
})
