/*global chrome*/
import '../fake-db'
import React from 'react'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { ReactFlowProvider } from 'react-flow-renderer'

const chromeGetElement = () => {
    console.log('okoli johnson')

    chrome?.devtools?.inspectedWindow.eval(
        'jQuery.fn.jquery',
        function (result, isException) {
            console.log(result, isException)
            console.log('okoli')
            // throw `jdsjsjjs ${result} ${isException}`
            if (isException) {
                alert('the page is   not using jQuery')
            } else {
                alert('The page is using jQuery v' + result)
            }
        }
    )

    return
}

const getAllEvals = () => {
    chrome?.devtools?.inspectedWindow.eval(
        'inspect(document.body)',
        function (result, isException) {
            console.log(result, 'sdkjssjk')
            if (isException) {
                console.log('the page is not using jQuery')
            } else {
                console.log('The page is using jQuery v' + result)
            }
        }
    )

    chrome?.action?.onClicked?.addListener(function (tab) {
        console.log(tab, 'dskskls')
        chrome.debugger.attach({ tabId: tab.id }, '1.0', function () {
            chrome.debugger.sendCommand(
                { tabId: tab.id },
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
    })

    chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
        console.log(tabs, 'dsjkdskjdsjskkjsd')
        const activeTabId = tabs[0].id
        chrome?.action?.onClicked?.addListener(function (tab) {
            console.log(tab, 'alooajasjjsa')
            chrome.debugger.attach({ tabId: tab.id }, '1.0', function () {
                chrome.debugger.sendCommand(
                    { tabId: tab.id },
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
        })
    })

    chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id
        // chrome.action.onClicked.addListener(function (tab) {
        chrome.debugger.attach({ tabId: activeTabId.id }, '1.0', function () {
            chrome.debugger.sendCommand(
                { tabId: activeTabId.id },
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
        // });
    })
    return
}

function getXpath(result, exceptionInfo) {
    // var tabId = parseInt(window.location.search.substring(1))
    var tabId

    var hightCfg = {
        showInfo: true,
        showStyles: true,
        contentColor: { r: 155, g: 11, b: 239, a: 0.7 },
    }

    chrome?.runtime?.sendMessage({ name: 'message' }, (response) => {
        console.log(response, 'jehova')
        tabId = response?.sender?.tab?.id
        document.querySelector('body').innerHTML = response.text
        console.log(window, 'fjdkjdjd')

        window?.addEventListener('load', function () {
            // const activeTab = getCurrentTab()
            console.log(tabId, 'tabIdtabIdtabIdLORD')
            console.log(chrome, 'tabIdtabIdtabIdLORD')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'DOM.enable')
            chrome?.debugger?.sendCommand({ tabId: tabId }, 'Overlay.enable')

            chrome.debugger.sendCommand(
                { tabId: tabId },
                'Overlay.setInspectMode',
                { mode: 'searchForNode', highlightConfig: hightCfg }
            )
            chrome?.debugger?.onEvent?.addListener(onEvent)

            const text = 'select node'

            if (
                document.body.textContent
                    .toLowerCase()
                    .includes(text.toLowerCase())
            ) {
                console.log('✅ text exists on page')
            } else {
                console.log('⛔️ text does not exist on page')
            }

            console.log(document, 'documentdocumentdocument')
            console.log(document.querySelectorAll('button'))
            console.log(document.querySelectorAll('div'))
            console.log(
                document.getElementById('btn_inspect'),
                'kkkkkkkjjjjjjjjjjjjjjjjjjjj'
            )
            document
                .getElementById('btn_inspect')
                .addEventListener('click', function () {
                    chrome.debugger.sendCommand(
                        { tabId: tabId },
                        'Overlay.setInspectMode',
                        { mode: 'searchForNode', highlightConfig: hightCfg }
                    )
                })
        })
    })

    // async function getCurrentTab() {
    //     // let queryOptions = { active: true, lastFocusedWindow: true }
    //     // // `tab` will either be a `tabs.Tab` instance or `undefined`.
    //     // let abli = await chrome.tabs.query(queryOptions)
    //     // console.log(abli, 'dsjskjskjs')
    //     // let [tab] = await chrome.tabs.query(queryOptions)
    //     // console.log(tab, 'chrome alayeee')
    //     // return tab

    //     var tabId
    //     chrome.windows.getCurrent((w) => {
    //         console.log(w, 'chinonsoo')
    //         chrome.tabs.query({ active: true, windowId: w.id }, (tabs) => {
    //             const tabId = tabs[0].id
    //             // use tabId here...
    //             console.log(tabs, tabId, 'sjsdjsjks')
    //         })
    //     })

    //     console.log(tabId, 'sjsdjsjks')

    //     return tabId
    // }

    //listen events when page is loaded
    // window.addEventListener('load', function () {
    //     // const currentTab = getCurrentTab()
    //     chrome.debugger.sendCommand({ tabId: currentTab }, 'DOM.enable')
    //     chrome.debugger.sendCommand({ tabId: currentTab }, 'Overlay.enable')
    //     chrome.debugger.onEvent.addListener(onEvent)

    //     document
    //         .getElementById('btn_inspect')
    //         .addEventListener('click', function () {
    //             chrome.debugger.sendCommand(
    //                 { tabId: tabId },
    //                 'Overlay.setInspectMode',
    //                 { mode: 'searchForNode', highlightConfig: hightCfg }
    //             )
    //         })
    // })

    // window.addEventListener('unload', function () {
    //     chrome.debugger.detach({ tabId: tabId })
    // })

    // var requests = {}

    function onEvent(debuggeeId, message, params) {
        console.log('onEvent ...' + message)
        if (tabId != debuggeeId.tabId) return

        if (message == 'Network.inspectNodeRequested') {
            //do something..
            console.log(debuggeeId, message, params, 'okoliiii')
        }
    }
}
const App = () => {
    console.log(chrome, 'alem')
    const all_pages = useRoutes(AllPages())

    // getAllEvals()
    console.log('nafdaline')
    // chromeGetElement()
    getXpath()

    // chrome.devtools.inspectedWindow.getResources(
    //   {callback: getXpath}
    // )

    return (
        <ReactFlowProvider>
            <SettingsProvider>
                <MatxTheme>
                    <AuthProvider>{all_pages}</AuthProvider>
                </MatxTheme>
            </SettingsProvider>
        </ReactFlowProvider>
    )
}

export default App
