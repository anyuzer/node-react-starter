import React from 'react';
import { withTheme } from "styled-components";
import { utils, UX, Icons } from '@anyuzer/starter-ux-lib'
import EmbeddedStrings from "../Utils/EmbeddedStrings";
import UserState from "../Utils/UserState";
import Router from '../Utils/Router';

const { uxm, unitStr } = utils;
const { Flex, Container, Link } = UX;

// Most applications have some form of consistent navigation / interface elements that wrap content.
// An example of a traditional Web Shell (Fixed nav, scrolling content / footer)
class ExampleWebShell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: UserState.getTheme()
        }
    }

    getThemeToggle() {
        if(this.state.theme === 'dark') {
            return (
                <Icons.Moon
                    apply={{
                        color: 'red'
                    }}
                />
            )
        }
        return <Icons.Sun
            apply={{
                color: 'yellow'
            }}
        />
    }

    getNavLinks() {
        const theme = this.props.theme;
        return [
            ['/products', EmbeddedStrings.NAV_PRODUCTS()],
            ['/pricing', EmbeddedStrings.NAV_PRICING()]
        ].map(([uri, linkText]) => {
            return (
                <Link
                    url={uri}
                    text={linkText}
                    apply={{
                        marginLeft: uxm(8),
                        color: theme.colors.contrastText,
                        ':hover': {
                            color: theme.colors.contrastBorder
                        }
                    }}
                    routeHandler={Router.reroute}
                    key={uri}
                />
            )
        })
    }

    renderNav() {
        const theme = this.props.theme;
        return (
            <React.Fragment>
                    <Flex
                        apply={{
                            backgroundColor: theme.colors.contrastBackground,
                            color: theme.colors.contrastText,
                            position: 'fixed',
                            zIndex: 9,
                            top: 0,
                            width: '100%',
                            height: uxm(60),
                            boxShadow: `${unitStr([2,2,5,-2])} rgba(0,0,0,0.75)`,
                            flex: '0 0 auto',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Flex apply={{flexDirection: 'row', alignItems: 'center'}}>
                            <Link
                                apply={{
                                    fontSize: theme.fonts.size.lg,
                                    fontFamily: theme.fonts.family.feature,
                                    color: theme.colors.featureBackground,
                                    padding: unitStr([0, 0, 0, 16]),
                                    ':hover': {
                                        color: theme.colors.featureBorder
                                    }
                                }}
                                url={"/"}
                                routeHandler={Router.reroute}
                            >
                                EXAMPLE.COM
                            </Link>
                            <Flex apply={{alignItems: 'flex-end', height: uxm(30)}}>
                                {this.getNavLinks()}
                            </Flex>
                        </Flex>
                        <Flex
                            apply={{
                                width: uxm(60),
                                height: uxm(60),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderLeft: `${uxm(1)} solid ${theme.colors.contrastBorder}`
                            }}
                        >
                            {this.getThemeToggle()}
                        </Flex>
                    </Flex>
            </React.Fragment>
        );
    }

    renderFooter() {
        const theme = this.props.theme;
        return (
            <Flex
                apply={{
                    borderTop: `${uxm(1)} solid ${theme.colors.primaryBorder}`,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: theme.fonts.xs,
                    display: 'none',
                    padding: unitStr([8])
                }}
                mdStyle={{
                    display: 'flex'
                }}
            >
                {EmbeddedStrings.SHELL_FOOTER()}
            </Flex>
        )
    }

    render() {
        const { theme, children } = this.props;
        return (
            <React.Fragment>
                {this.renderNav()}
                <Container
                    boundingStyle={{
                        flex: '1 0 auto',
                        backgroundColor: theme.colors.background,
                        boxSizing: 'border-box',
                        paddingTop: uxm(20)
                    }}
                    mdStyle={{
                        paddingTop: uxm(60)
                    }}
                    containerStyle={{
                        paddingTop: unitStr([10])
                    }}
                    breakpoints={["sm","md","lg"]}
                >
                    {children}
                </Container>
                {this.renderFooter()}
            </React.Fragment>
        );
    }
}

export default withTheme(ExampleWebShell);