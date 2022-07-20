import './RoboConsole.css'
import { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'

export default function FlowConsoleArea(props) {
    const { menuFunctions, addNode } = props
    const [subMenuFunctions, setsubMenuFunctions] = useState({
        browser: false,
    })
    const [menuFunctionsClone, setmenuFunctionsClone] = useState()

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [show, setShow] = useState(false) // hide menu
    const flowBox = useRef(null)

    useEffect(() => {
        setmenuFunctionsClone(menuFunctions)
    }, [menuFunctions])

    const handleClick = (e) => {
        if (flowBox.current && !flowBox.current.contains(e.target)) {
            setShow(false)
        } else {
            console.log('CLICKED')
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
    })

    useEffect(() => {}, [subMenuFunctions, show])

    const searchMenuFunctions = (e) => {
        const search = e.target.value

        const duet = menuFunctions.map((element) => {
            return {
                ...element,
                function_list: element.function_list.filter((subElement) =>
                    subElement.function_name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ),
            }
        })

        if (duet[0].function_list.length !== 0) {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                Browser: true,
            }))
        } else {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                Browser: false,
            }))
        }
        if (duet[1].function_list.length !== 0) {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                CSV: true,
            }))
        } else {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                CSV: false,
            }))
        }

        if (search === '') {
            setsubMenuFunctions((prevState) => ({
                ...prevState,
                CSV: false,
                Browser: false,
            }))
        }

        setmenuFunctionsClone(duet)
    }

    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault()
                setShow(true)
                setAnchorPoint({ x: e.pageX, y: e.pageY })
            }}
            style={{ height: '100%', width: '100%' }}
            className="app"
        >
            {show ? (
                <div
                    ref={flowBox}
                    className="contextMenu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <div className="console_search">
                        {' '}
                        <TextField
                            // fullWidth
                            placeholder="Search..."
                            id="standard-bare"
                            variant="outlined"
                            defaultValue=""
                            onChange={(e) => searchMenuFunctions(e)}
                            InputProps={{
                                style: {
                                    width: '100%',
                                    paddingTop: '1rem',
                                    height: '40px',
                                    paddingLeft: '2px',
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    backgroundColor: '#ffffff',
                                },
                                endAdornment: (
                                    <IconButton>
                                        <SearchOutlined />
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>
                    {menuFunctionsClone?.map((menu) => (
                        <>
                            <div
                                className="function_menu_list"
                                key={menu.key}
                                onClick={(e) => {
                                    setsubMenuFunctions((prevState) => ({
                                        ...prevState,
                                        [`${menu.group_name}`]:
                                            !subMenuFunctions?.[
                                                `${menu.group_name}`
                                            ],
                                    }))
                                }}
                            >
                                <div className="menu_name">
                                    <div>
                                        {subMenuFunctions?.[
                                            `${menu.group_name}`
                                        ] ? (
                                            <b>&darr;</b>
                                        ) : (
                                            <b>{'>'}</b>
                                        )}
                                    </div>
                                    {menu?.group_name}
                                </div>
                            </div>
                            {subMenuFunctions?.[`${menu.group_name}`] && (
                                <>
                                    <div className="sub_menus_functions">
                                        {subMenuFunctions?.[
                                            `${menu.group_name}`
                                        ] &&
                                            menu?.function_list?.map(
                                                (funct) => (
                                                    <div
                                                        onClick={() =>
                                                            addNode(
                                                                funct?.function_name
                                                            )
                                                        }
                                                        className="dndnode sub_menu_function"
                                                        draggable
                                                    >
                                                        {funct?.function_name}
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </>
                            )}
                        </>
                    ))}
                </div>
            ) : (
                <> </>
            )}
            {props.children}
        </div>
    )
}
