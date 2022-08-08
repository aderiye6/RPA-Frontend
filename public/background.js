/*global chrome*/
var version = '1.0'
console.log(chrome, 'lauunnnnn')
var nodeId
var tabId
var HtmlSelection
//show popup page while click icon
chrome.action.onClicked.addListener(function (tab) {
    console.log(tab, 'CHINOSNSNSNNSNSN')
})

console.log(chrome, 'bacccccccccccccckg')
// const chromeExtensionListen = async (source, method, params) => {
//     console.log(source.tabId, method, params, ' ')
//     nodeId = params?.nodes[1]?.nodeId || params?.backendNodeId
//     if (method == 'DOM.setChildNodes') {
//         console.log(nodeId, 'nodeIdnodeIdnodeIdnodeIdnodeIdnodeId')

//         const call = await chrome.debugger.sendCommand(
//             { tabId: source.tabId },
//             'Overlay.getHighlightObjectForTest',
//             (result) => {
//                 console.log(result)
//             }
//         )

//         console.log(tabId, nodeId, 'checking')
//         const call1 = await chrome.debugger
//             .sendCommand(
//                 { tabId: source.tabId },
//                 'DOM.getOuterHTML',
//                 { nodeId: params.nodes[0].nodeId },
//                 (result) => {
//                     console.log(result, 'html')
//                     HtmlSelection = result.outerHTML
//                     chrome?.runtime?.sendMessage(
//                         { name: 'message' },
//                         (response) => {
//                             console.log(response, 'tamunaaaa')
//                         }
//                     )
//                     chrome?.runtime?.sendMessage(
//                         { name: HtmlSelection },
//                         (response) => {
//                             console.log(response, 'nazzareth')
//                         }
//                     )
//                 }
//             )
//             .then((data) => console.log(data, 'ewjwejkw'))
//             .catch((error) => {
//                 console.log(error, 'jksjjskjs')
//             })
//         console.log(tabId, nodeId, 'checking')
//         chrome.debugger
//             .sendCommand({ nodeId: params.nodes[0].nodeId }, 'DOM.getOuterHTML')
//             .then((data) => console.log(data, 'ewjwejkw'))
//             .catch((error) => {
//                 console.log(error, 'jksjjskjs')
//             })
//         const call2 = await chrome.debugger.sendCommand(
//             { nodeId: params.nodes[0].nodeId },
//             'DOM.getAttributes',
//             (result) => {
//                 console.log(result)
//             }
//         )

//         const call8 = await chrome.debugger.sendCommand(
//             { nodeId: params.nodes[0].nodeId },
//             'DOM.describeNode',
//             (result) => {
//                 console.log(result)
//             }
//         )
//         console.log(call, call1, call2, call8)
//     } else {
//         console.log('uu')

//         const call3 = await chrome.debugger.sendCommand(
//             { nodeId: params.backendNodeId },
//             'Overlay.getHighlightObjectForTest',
//             (result) => {
//                 console.log(result)
//             }
//         )
//         console.log(tabId, nodeId, 'checking')
//         await chrome.debugger.sendCommand(
//             { tabId: source.tabId },
//             'DOM.getOuterHTML',
//             { nodeId: params.backendNodeId },
//             (result) => {
//                 console.log(result)
//             }
//         )

//         const call5 = await chrome.debugger.sendCommand(
//             { backendNodeId: params.backendNodeId },
//             'DOM.describeNode',
//             (result) => {
//                 console.log(result)
//             }
//         )

//         const call7 = await chrome.debugger.sendCommand(
//             { backendNodeId: params.backendNodeId },
//             'DOM.describeNode',
//             (result) => {
//                 console.log(result)
//             }
//         )

//         console.log(call3, call5, call7)
//     }
// }

// chrome.debugger.onEvent.addListener(async function (source, method, params) {
//     chromeExtensionListen(source, method, params)
//     tabId = source.tabId
//     console.log(nodeId, 'nodeiddddddddddddddddididididididdd')
//     if (nodeId) {
//         console.log('viiteddddddd')

//         let seen = await chrome?.debugger?.sendCommand(
//             { tabId: tabId },
//             'DOM.getDocument',
//             { nodeId: nodeId },
//             (result) => {
//                 console.log(result)
//             }
//         )
//         console.log(seen)

//         console.log(tabId, nodeId, 'checking')
//         const call1 = await chrome.debugger
//             .sendCommand(
//                 { tabId: source.tabId },
//                 'DOM.getOuterHTML',
//                 { nodeId: nodeId },
//                 (result) => {
//                     console.log(result, 'html')
//                     HtmlSelection = result.outerHTML
//                     chrome?.runtime?.sendMessage(
//                         { name: 'message' },
//                         (response) => {
//                             console.log(response, 'tamunaaaa')
//                         }
//                     )
//                     chrome?.runtime?.sendMessage(
//                         { name: HtmlSelection },
//                         (response) => {
//                             console.log(response, 'nazzareth')
//                         }
//                     )
//                 }
//             )
//             .then((data) => console.log(data, 'ewjwejkw'))
//             .catch((error) => {
//                 console.log(error, 'jksjjskjs')
//             })

//         chrome?.debugger?.sendCommand(
//             { tabId: tabId },
//             'DOM.setInspectedNode',
//             { nodeId: nodeId },
//             (result) => {
//                 console.log(result)
//             }
//         )
//     }
// })

// chrome.debugger.onEvent.addListener(async function (source, method, params) {
//     console.log(source, method, params, 'updated calll')
//     tabId = source.tabId
//     nodeId = params.nodeId || params.nodes[0].nodeId

//     console.log(tabId, nodeId, 'checking')
//     const call1 = await chrome.debugger
//         .sendCommand(
//             { tabId: source.tabId },
//             'DOM.getOuterHTML',
//             { nodeId: nodeId },
//             (result) => {
//                 console.log(result, 'html')
//                 HtmlSelection = result.outerHTML
//                 chrome?.runtime?.sendMessage(
//                     { name: 'message' },
//                     (response) => {
//                         console.log(response, 'tamunaaaa')
//                     }
//                 )
//                 chrome?.runtime?.sendMessage(
//                     { name: HtmlSelection },
//                     (response) => {
//                         console.log(response, 'nazzareth')
//                     }
//                 )
//             }
//         )
//         .then((data) => console.log(data, 'ewjwejkw'))
//         .catch((error) => {
//             console.log(error, 'jksjjskjs')
//         })
// })

// chrome.runtime.onMessageExternal.addListener(function (
//     request,
//     sender,
//     sendResponse
// ) {
//     console.log(request, sender, sendResponse)
//     if (sender.url === 'blocklistedWebsite') return // don't allow this web page access

//     sendResponse('ok')
// })

chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    senderResponse
) {
    console.log(message, sender, 'naweeeeee')
    // getExtensionFunc(message, sender, senderResponse)
    //localhost:3000/dashboard/default  localhost:3000
    chrome?.tabs?.query({}, function (tabs) {
        console.log(tabs, 'sssjsjjsjs')
        senderResponse(tabs)
        tabs.forEach((tab) => {
            console.log(tab, 'atababb')
            chrome.tabs.sendMessage(tab.id, { message: 'message' })
        })
        senderResponse(tabs)
        console.log(tabs, 'afterrrrr')
    })
})

// const getExtensionFunc = async (message, sender, senderResponse) => {
//     console.log(message, 'kkkkkkk')
//     tabId = sender?.tab?.id
//     var hightCfg = {
//         showInfo: true,
//         showStyles: true,
//         contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
//     }

//     chrome.debugger.attach({ tabId: tabId }, '1.0', async function () {
//         chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
//         chrome?.debugger?.sendCommand({ tabId: tabId }, 'Inspector.enable')

//         chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
//         chrome?.debugger?.onEvent?.addListener(onEvent)

//         chrome.debugger.sendCommand(
//             { tabId: tabId },
//             'Overlay.setInspectMode',
//             { mode: 'searchForNode', highlightConfig: hightCfg },
//             function (result) {
//                 console.log(result, 'UPDATE')
//             }
//         )

//         const output = await chrome.debugger.sendCommand(
//             { tabId: tabId },
//             'Runtime.evaluate',
//             {
//                 expression:
//                     'console.log(document.body); inspect(document.body); HTMLInspector.inspect(document.body); console.log($0)',
//             },
//             function () {
//                 console.log('Result:', arguments)
//             }
//         )
//         const outputgame = await chrome.debugger.sendCommand(
//             { tabId: tabId },
//             'Runtime.evaluate',
//             {
//                 expression: '//*[@id="THE_ID"]',
//             },
//             function () {
//                 console.log('Result:', arguments)
//             }
//         )
//         console.log(output, outputgame, 'sdsksjkjs')

//         window.addEventListener('unload', function () {
//             chrome.debugger.detach({ tabId: tabId })
//         })

//         chrome.debugger.onEvent.addListener(function (source, method, params) {
//             console.log(source, method, params, 'called ming')
//         })

//         async function onEvent(debuggeeId, message, params) {
//             console.log('onEvent ...' + message, debuggeeId, params)
//             // if (tabId != debuggeeId.tabId) return
//             nodeId =
//                 params.nodeId || params.nodes[0].nodeId || params.backendNodeId

//             if (message === 'Network.inspectNodeRequested') {
//                 console.log('didupdate')
//                 //do something..
//             }
//         }
//     })
//     if (message.name === 'message') {
//         console.log('lookuppppp')
//         if (HtmlSelection) {
//             senderResponse({ HtmlSelection: HtmlSelection, sender })
//         }

//         return true
//     }
// }
