/*global chrome*/
// var tabId = parseInt(window.location.search.substring(1))
var tabId

var hightCfg = {
    showInfo: true,
    showStyles: true,
    contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
}
console.log(window, 'jodssddsiosdiosdois')
console.log(chrome, 'jodssddsiosdiosdois')
//listen events when page is loaded

window?.addEventListener('load', function () {
    console.log(chrome, 'louseerrr')

    // chrome.debugger.sendCommand(
    //     { tabId: tabId },
    //     'Overlay.setInspectMode',
    //     { mode: 'searchForNode', highlightConfig: hightCfg }
    // )

    chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
        console.log(response, 'skillseet')
        tabId = response?.sender?.tab?.id
        // document.querySelector('body').innerHTML = response.text
        console.log(window, document, chrome, 'fjdkjdjd')

        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Overlay.setInspectMode',
            { mode: 'searchForNode', highlightConfig: hightCfg }
        )

        const text = 'select node'

        if (
            document.body.textContent.toLowerCase().includes(text.toLowerCase())
        ) {
            console.log('✅ text exists on page')
        } else {
            console.log('⛔️ text does not exist on page')
        }

        console.log(document, 'documentdocumentdocument')
        console.log(document.querySelectorAll('button'))
        console.log(document.querySelectorAll('div'))

        window?.addEventListener('load', function () {
            // const activeTab = getCurrentTab()
            console.log(tabId, 'tabIdtabIdtabId')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
            chrome?.debugger?.onEvent?.addListener(onEvent)
            console.log(
                document?.getElementById('btn_inspect'),
                'kkkkkkkjjjjjjjjjjjjjjjjjjjj'
            )
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

chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
    console.log(response, 'skillseet')
    tabId = response?.sender?.tab?.id
    // document.querySelector('body').innerHTML = response.text
    console.log(window, document, 'fjdkjdjd')

    chrome.debugger.sendCommand({ tabId: tabId }, 'Overlay.setInspectMode', {
        mode: 'searchForNode',
        highlightConfig: hightCfg,
    })

    const text = 'select node'

    if (document.body.textContent.toLowerCase().includes(text.toLowerCase())) {
        console.log('✅ text exists on page')
    } else {
        console.log('⛔️ text does not exist on page')
    }

    console.log(document, 'documentdocumentdocument')
    console.log(document.querySelectorAll('button'))
    console.log(document.querySelectorAll('div'))

    window?.addEventListener('load', function () {
        // const activeTab = getCurrentTab()
        console.log(tabId, 'tabIdtabIdtabId')
        console.log(chrome, 'tabIdtabIdtabId')
        chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
        chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
        chrome?.debugger?.onEvent?.addListener(onEvent)
        console.log(
            document?.getElementById('btn_inspect'),
            'kkkkkkkjjjjjjjjjjjjjjjjjjjj'
        )
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

window?.addEventListener('unload', function () {
    chrome?.debugger?.detach({ tabId: tabId })
})

chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
    console.log(response, 'skillseet')
    tabId = response?.sender?.tab?.id
    // document.querySelector('body').innerHTML = response.text
    console.log(window, document, 'fjdkjdjd')

    // async function getCurrentTab() {
    //     // let queryOptions = { active: true, lastFocusedWindow: true }
    //     // // `tab` will either be a `tabs.Tab` instance or `undefined`.
    //     // let abli = await chrome.tabs.query(queryOptions)
    //     // console.log(abli, 'dsjskjskjs')
    //     // let [tab] = await chrome.tabs.query(queryOptions)
    //     // console.log(tab, 'chrome alayeee ogaaa')
    //     // return tab

    //     // chrome.windows.getCurrent((w) => {
    //     //     chrome.tabs.query({ active: true, windowId: w.id }, (tabs) => {
    //     //         const tabId = tabs[0].id
    //     //         console.log(tabs, tabId, 'sjsdjsjks')
    //     //         // use tabId here...
    //     //     })
    //     // })

    //     console.log(tabId, 'sjsdjsjks')

    //     return tabId
    // }

    window?.addEventListener('load', function () {
        // const activeTab = getCurrentTab()
        console.log(tabId, 'tabIdtabIdtabId')
        console.log(chrome)

        chrome.debugger.attach({tabId: tabId}, "1.0", function () {
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
            chrome.debugger.sendCommand(
                { tabId: tabId },
                'Overlay.setInspectMode',
                { mode: 'searchForNode', highlightConfig: hightCfg }
            )

            chrome.debugger.sendCommand({tabId: tabId}, 'Runtime.evaluate', {
                expression: 'console.log(document.body); inspect(document.body);'
            }, function () {
                console.log('Result:', arguments);
            }); 
        });

        // chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
        // chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')
        // chrome.debugger.sendCommand(
        //     { tabId: tabId },
        //     'Overlay.setInspectMode',
        //     { mode: 'searchForNode', highlightConfig: hightCfg }
        // )
        chrome?.debugger?.onEvent?.addListener(onEvent)
        const text = 'select node'

        if (
            document.body.textContent.toLowerCase().includes(text.toLowerCase())
        ) {
            console.log('✅ text exists on page')
        } else {
            console.log('⛔️ text does not exist on page')
        }

        console.log(document, 'documentdocumentdocument')
        console.log(document.querySelectorAll('button'))
        console.log(document.querySelectorAll('div'))

        console.log(
            document?.getElementById('btn_inspect'),
            'kkkkkkkjjjjjjjjjjjjjjjjjjjj'
        )
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

var requests = {}

function onEvent(debuggeeId, message, params) {
    console.log('onEvent ...' + message)
    if (tabId != debuggeeId.tabId) return

    if (message == 'Network.inspectNodeRequested') {
        console.log('jodssddsiosdiosdois')
        //do something..
    }
}
