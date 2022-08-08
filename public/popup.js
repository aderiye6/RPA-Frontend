/*global chrome*/
var tabId

var hightCfg = {
    showInfo: true,
    showStyles: true,
    contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
}

console.log(window, chrome, 'asjkasjajjkasj')

window?.addEventListener('unload', function () {
    chrome?.debugger?.detach({ tabId: tabId })
})

chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
    console.log(response, 'responseeeeee')

    // window.postMessage({ type: 'FROM_PAGE', text: response }, '*')
    // tabId = response?.sender?.tab?.id

    // window?.addEventListener('load', function () {
    //     chrome.debugger.attach({ tabId: tabId }, '1.0', function () {
    //         chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
    //         chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
    //         chrome.debugger.sendCommand(
    //             { tabId: tabId },
    //             'Overlay.setInspectMode',
    //             { mode: 'searchForNode', highlightConfig: hightCfg }
    //         )

    //         chrome.debugger.sendCommand(
    //             { tabId: tabId },
    //             'Runtime.evaluate',
    //             {
    //                 expression:
    //                     'console.log(document.body); inspect(document.body);',
    //             },
    //             function () {
    //                 console.log('Result:', arguments)
    //             }
    //         )
    //     })

    //     chrome?.debugger?.onEvent?.addListener(onEvent)

    //     document
    //         ?.getElementById('btn_inspect')
    //         ?.addEventListener('click', function () {
    //             chrome.debugger.sendCommand(
    //                 { tabId: tabId },
    //                 'Overlay.setInspectMode',
    //                 { mode: 'searchForNode', highlightConfig: hightCfg }
    //             )
    //         })
    // })
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
    if (message.type === 'FROM_PAGE') {
        console.log(chrome, 'enteredd')
        chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
            console.log(response, 'fdkjfddjdfkd')
            window.postMessage(
                { type: 'FROM_EXTENSION_PAGE', text: response?.sender },
                '*'
            )
            // tabId = response?.sender?.tab?.id
        })

        console.log(chrome, 'senttttttttttttttt')
    }
})

// document.body.addEventListener('click', function (ev) {
//     console.log(ev)
//     console.log(ev.toElement)

//     var xpath = window?.getElementXpath(ev.toElement)
//     console.log(xpath)
// })

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

function addHighlight(target) {
    target.classList.add('highlighted')
}

function removeHighlight(target) {
    target.classList.remove('highlighted')
}

var enabled = true

function onHighLightClick(target) {
    console.log(target, 'naimmmmm')
    return target
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

function message_broadcast(message) {
    localStorage.setItem('message', JSON.stringify(message))
    const channel = new BroadcastChannel('app-data')
    channel.postMessage(message)

    postData('http://localhost:5000/htmlpost', { html: message }).then((data) => {
        console.log(data, 'postHTML') // JSON data parsed by `data.json()` call
    })

    // var chanhhnel = new TabsChannel({
    //     id: 'a<->c'
    // });
    // channel.onReceive = function(message) {
    //     if (window.callPhantom) {
    //         window.callPhantom({
    //             message: message,
    //             page: 'c'
    //         });
    //     }
    // };

    chrome?.runtime?.sendMessage({ name: message }, (response) => {
        console.log(response, 'responseeeeee')
    })
    // navigator.serviceWorker.controller.postMessage({
    //     broadcast: message,
    // })
    // const url = 'http://localhost:3000'
    const url = '*'
    // const winRef = window.opener
    // const winRef = top.window.opener

    window.postMessage({ type: 'FROM_EXTENSION_PAGE', html: message }, url)

    // var image_container = document.getElementById("image_container")
    var eLFrame = document.getElementById('testFrame')
    var buttton = document.getElementById('btn')
    // var classFrame = document.getElementsByClassName('test')
    // var iframnid = document.querySelectorAll('iframe')
    console.log(eLFrame, buttton, 'dkkdkdkd')
    // console.log(iframnid, 'kdkkkdkd')
    // eLFrame.contentWindow.postMessage({ type: 'FROM_EXTENSION_PAGE', html: message }, '*')

    const iframe = document.createElement('iframe')

    iframe.setAttribute('id', 'ifrmm')
    iframe.setAttribute('src', 'http://localhost:3000/console/robo_console')
    console.log(iframe, 'kdkkkdkd')
    // iframe.contentWindow.postMessage({ type: 'FROM_EXTENSION_PAGE', html: message }, '*')

    var receiver = document.getElementById('receiver')
    console.log(receiver, 'jxjzjz')
    // receiver.contentWindow.postMessage('cookie data!', 'http://localhost:3000');

    console.log(iframe.contentWindow, 'goalgoalgoal')
    // var target = window.open('http://localhost:3000', 'title')
    // console.log(target, 'dmmdmdmd')
    // target.parent.postMessage(message, 'http://localhost:3000')

    console.log(window, 'check.opener')

    // window.parent
    // target.postMessage("hello kk", "http://localhost:3000")

    var config = {
        onHandshakeCallback: function () {
            console.log('onHandshakeCallback')
        },
        onPollingCallback: function () {
            console.log('onPollingCallback')
        },
        onChildCommunication: function () {
            console.log('onChildCommunication')
        },
    }
    // var jQueryScript = document.createElement('script')
    // jQueryScript.setAttribute(
    //     'src',
    //     'https://cdnjs.cloudflare.com/ajax/libs/across-tabs/1.0.0/across-tabs.min.js'
    // )
    // document.head.appendChild(jQueryScript)
    // document.write(
    //     unescape(
    //         "%3Cscript src='https://cdnjs.cloudflare.com/ajax/libs/across-tabs/1.0.0/across-tabs.min.js"
    //     )
    // )

    // var jQueryScriptChannel = document.createElement('script')
    // jQueryScript.setAttribute(
    //     'src',
    //     'https://cdn.rawgit.com/vitkarpov/tabs-channel/master/lib/index.js'
    // )
    // document.head.appendChild(jQueryScriptChannel)

    console.log(window, 'check.opener')

    //   var proxy = new TabsChannel({
    //     id: 'should-be-the-same-for-different-tabs'
    // });

    // var parent = new AcrossTabs.Parent(config)

    // chrome?.tabs?.query({active: true}, function(tabs){
    //     console.log(tabs, 'sssjsjjsjs')
    // })
}

// window.addEventListener("load", function() {
//     var image_container = document.getElementById("image_container")
//     var eLFrame = document.getElementById("testFrame")
//     var classFrame = document.getElementsByClassName('test')
//     var iframnid = document.querySelectorAll('iframe')
//     console.log(eLFrame,'olllll', image_container,'kjjjukkk', classFrame)
//     console.log(iframnid, 'ksdlsks')
//   });

window.addEventListener('mouseover', function (e) {
    addHighlight(e.target)
    window.addEventListener('click', function (e) {
        // e.preventDefault()
        console.log(e, 'content')
        const returnHTML = onHighLightClick(e.target)
        const innerHtml = returnHTML.innerHTML
        e.stopPropagation()
        // e.cancelBubble()
        e.stopImmediatePropagation()

        message_broadcast(innerHtml)
    })
})

window.addEventListener('mouseout', function (e) {
    removeHighlight(e.target)
    window.addEventListener('click', function (e) {
        // e.preventDefault()
        console.log(e, 'content')
        const returnHTML = onHighLightClick(e.target)
        const innerHtml = returnHTML.innerHTML
        e.stopPropagation()
        // e.cancelBubble()
        e.stopImmediatePropagation()
        message_broadcast(innerHtml)
    })
})

function hello() {
    console.log('gruelllllllllllll')

    var eLFrame = document.getElementById('testFrame')
    var buttton = document.getElementById('btn')
    // var classFrame = document.getElementsByClassName('test')
    // var iframnid = document.querySelectorAll('iframe')
    console.log(eLFrame, buttton, 'dkkdkdkd')

    var name = document.getElementById('info').value
    alert('Hello ' + name)
}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded')
    var eLFrame = document.getElementById('testFrame')
    console.log(eLFrame, 'nxnnx')
    document.getElementById('btn').addEventListener('click', hello)
})
