/*global chrome*/
var tabId

var hightCfg = {
    showInfo: true,
    showStyles: true,
    contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
}

// window?.addEventListener('load', function () {
//     chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
//         tabId = response?.sender?.tab?.id

//         chrome.debugger.sendCommand(
//             { tabId: tabId },
//             'Overlay.setInspectMode',
//             { mode: 'searchForNode', highlightConfig: hightCfg }
//         )

//         window?.addEventListener('load', function () {
//             chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
//             chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
//             chrome?.debugger?.onEvent?.addListener(onEvent)

//             document
//                 ?.getElementById('btn_inspect')
//                 ?.addEventListener('click', function () {
//                     chrome.debugger.sendCommand(
//                         { tabId: tabId },
//                         'Overlay.setInspectMode',
//                         { mode: 'searchForNode', highlightConfig: hightCfg }
//                     )
//                 })
//         })
//     })
// })

window?.addEventListener('unload', function () {
    chrome?.debugger?.detach({ tabId: tabId })
})

chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {

    console.log(response)
    window.postMessage({ type: "FROM_PAGE", text: response?.sender }, "*");
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



window.addEventListener('message', (event) => {
    // Only accept messages from the same frame
    console.log('lit')
    console.log(event, 'workingDeaddd')
    console.log('dskjkjsd')
    console.log('dskjkjsd', event.data)
    // if (event.source !== window) {
    //     return
    // }

    var message = event.data

    console.log(message, 'duell')

    // Only accept messages that we know are ours
    if (
        typeof message !== 'object' ||
        message === null ||
        (!!message.source && message.source !== 'dataaccessgateway-agent')
    ) {
        return
    }
    console.log(message, 'duell330')
    if(message.type === "FROM_PAGE"){
        console.log(chrome,'enteredd')
        chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {

            console.log(response, 'fdkjfddjdfkd')
            window.postMessage({ type: "FROM_EXTENSION_PAGE", text: response?.sender }, "*");
            // tabId = response?.sender?.tab?.id
        })

        console.log(chrome,'senttttttttttttttt')
    }
   
})

console.log(window, 'akkkajkka')
// window?.onmouseenter(function(event) {
//     event.target.addClass("el-selection");
// });

// window?.onmouseenter(function(event) {
//     event.target.removeClass("el-selection");
// });

// window?.onclick(function(event) {
//     console.log("selected: ", event.target);
//     return false;
// });