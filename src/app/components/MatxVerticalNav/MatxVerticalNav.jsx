import { styled, Box } from '@mui/system'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import useSettings from 'app/hooks/useSettings'
import { Paragraph, Span } from '../Typography'
import { Icon, ButtonBase } from '@mui/material'
 
const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
    fontSize: '12px',
    marginTop: '20px',
    marginLeft: '15px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    display: mode === 'compact' && 'none',
    color: 'black',
 
}))

const ExtAndIntCommon = {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '4px',
    height: 44,
    whiteSpace: 'pre',
    marginBottom: '8px',
    textDecoration: 'none',
    justifyContent: 'space-between',
    transition: 'all 150ms ease-in',
    // backgroundColor:'red',
    paddingLeft:'1rem',
    // color:'white',
   
    '&:hover': {
        background: '#94ccf2',
    },
    '&.compactNavItem': {
        overflow: 'hidden',
        justifyContent: 'center !important',
    },
    '& .icon': {
        fontSize: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
        verticalAlign: 'middle',
    },
}
const ExternalLink = styled('a')(({ theme }) => ({
    ...ExtAndIntCommon,
    color: '#172B3E',
}))

const InternalLink = styled(Box)(({ theme }) => ({
    '& a': {
        ...ExtAndIntCommon,
        color: '#172B3E',
    },
    '& .navItemActive': {
        backgroundColor: '#369FFF',
    },
}))

const StyledText = styled(Span)(({ mode }) => ({
    fontSize: '0.875rem',
    paddingLeft: '0.8rem',
    display: mode === 'compact' && 'none',
}))

const BulletIcon = styled('div')(({ theme }) => ({
    padding: '2px',
    marginLeft: '24px',
    marginRight: '8px',
    overflow: 'hidden',
    borderRadius: '300px',
    background: theme.palette.text.primary,
}))

const BadgeValue = styled('div')(() => ({
    padding: '1px 8px',
    overflow: 'hidden',
    borderRadius: '300px',
}))

const MatxVerticalNav = ({ items }) => {
    const { settings } = useSettings()
    const { mode } = settings.layout1Settings.leftSidebar

    const renderLevels = (data) => {
        return data.map((item, index) => {
            if (item.type === 'label')
                return (
                    <ListLabel
                        key={index}
                        mode={mode}
                        className="sidenavHoverShow"
                    >
                        {item.label}
                    </ListLabel>
                )
            if (item.children) {
                return (
                    <div>

                    </div>
                )
            } else if (item.type === 'extLink') {
                return (
                    <ExternalLink
                        key={index}
                        href={item.path}
                        className={`${mode === 'compact' && 'compactNavItem'}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <ButtonBase
                            key={item.name}
                            name="child"
                            sx={{ width: '100%' }}
                        >
                            {(() => {
                                if (item.icon) {
                                    return (
                                        <img src={`/${item.icon}`} sx={{ width: 36 }}/>
                                      
                                    )
                                } else {
                                    return (
                                        <span className="item-icon icon-text">
                                            {item.iconText}
                                        </span>
                                    )
                                }
                            })()}
                            <StyledText
                                mode={mode}
                                className="sidenavHoverShow"
                            >
                                {item.name}
                            </StyledText>
                            <Box mx="auto"></Box>
                            {item.badge && (
                                <BadgeValue>{item.badge.value}</BadgeValue>
                            )}
                        </ButtonBase>
                    </ExternalLink>
                )
            } else {
                return (
                    <InternalLink key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `navItemActive ${mode === 'compact' && 'compactNavItem'}` : `${mode === 'compact' && 'compactNavItem'}`
                            }
                        >
                            <ButtonBase
                                key={item.name}
                                name="child"
                                sx={{ width: '100%' }}
                            >
                                {item?.icon ? (
                                     <img src={`/${item.icon}`} sx={{ width: 36 }}/>
                                ) : (
                                    <Fragment>
                                        <BulletIcon
                                            className={`nav-bullet`}
                                            sx={{
                                                display:
                                                    mode === 'compact' && 'none',
                                            }}
                                        />
                                        <Box
                                            className="nav-bullet-text"
                                            sx={{
                                                ml: '20px',
                                                fontSize: '11px',
                                                display:
                                                    mode !== 'compact' && 'none',
                                            }}
                                        >
                                            {item.iconText}
                                        </Box>
                                    </Fragment>
                                )}
                                <StyledText
                                    mode={mode}
                                    className="sidenavHoverShow"
                                >
                                    {item.name}
                                </StyledText>
                                <Box mx="auto"></Box>
                                {item.badge && (
                                    <BadgeValue className="sidenavHoverShow">
                                        {item.badge.value}
                                    </BadgeValue>
                                )}
                            </ButtonBase>
                        </NavLink>
                    </InternalLink>
                )
            }
        })
    }

    return <div className="navigation">{renderLevels(items)}</div>
}

export default React.memo(MatxVerticalNav)
