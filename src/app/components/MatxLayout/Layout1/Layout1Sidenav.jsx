import React from 'react'
import Brand from '../../Brand/Brand'
import { convertHexToRGB } from 'app/utils/utils'
import { Box, styled, useTheme } from '@mui/system'
import Sidenav from '../../Sidenav/Sidenav'
import useSettings from 'app/hooks/useSettings'
import { Switch, Hidden } from '@mui/material'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant'

const SidebarNavRoot = styled(Box)(({ theme, width, primaryBg, bgImgURL }) => ({
    position: 'fixed',
    top: -12,
    // left: 0,
    // height: '10000px',
    // width: width,
    // boxShadow: themeShadows[8],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    // zIndex: 111,
    // overflow: 'scroll',
    // overflowX:'scroll',
    // color: theme.palette.text.primary,
    backgroundColor: '#F9F9F9',
    color: 'black',
    transition: 'all 250ms ease-in-out',
    // backgroundImage: `linear-gradient(to bottom, rgba(${primaryBg}, 0.96), rgba(${primaryBg}, 0.96)), url(${bgImgURL})`,
    '&:hover': {
        width: sideNavWidth,
        '& .sidenavHoverShow': {
            display: 'block',
        },
        '& .compactNavItem': {
            width: '100%',
            maxWidth: '100%',
            '& .nav-bullet': {
                display: 'block',
            },
            '& .nav-bullet-text': {
                display: 'none',
            },
        },
    },
}))

const NavListBox = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'black',
}))

const Layout1Sidenav = () => {
    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode, bgImgURL } = leftSidebar

    const getSidenavWidth = () => {
        switch (mode) {
            case 'compact':
                return sidenavCompactWidth
            default:
                return sideNavWidth
        }
    }
    // const primaryRGB = 'red'
    const primaryRGB = convertHexToRGB(theme.palette.primary.main)

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidenavToggle = () => {
        updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' })
    }

    return (
        <SidebarNavRoot
            // bgImgURL={bgImgURL}
            // primaryBg={primaryRGB}
            width={getSidenavWidth()}
        >
            <NavListBox>
                <Brand>
                    <Hidden smDown>
                        <Switch
                            onChange={handleSidenavToggle}
                            checked={leftSidebar.mode !== 'full'}
                            color="secondary"
                            size="small"
                        />
                    </Hidden>
                </Brand>
                <Sidenav />
            </NavListBox>
        </SidebarNavRoot>
    )
}

export default React.memo(Layout1Sidenav)
