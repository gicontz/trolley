import { Link } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ReactComponent as AppLogo } from '../assets/appLogo.svg';
import { ReactComponent as TagIcon } from '../assets/storeTagIcon.svg';
import { navs } from './navigations';

const Container = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.app.header.normal.BG_COLOR};
  box-shadow: 0px 4px 5px ${({ theme }) => theme.app.header.normal.BOX_SHADOW};
  width: 396px;
  height: 100%;
  left: 0;
  top: 0;
`;

const NavHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.app.header.normal.BORDER_COLOR};
  > .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavFooter = styled.div`
  display: flex;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0 5px;
`;

const StyledLink = styled(Link)`
  padding: 12px 33px;
  color: ${({ theme }) => theme.app.header.normal.TEXT_COLOR};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.app.header.hover.TEXT_COLOR};
    background-color: ${({ theme }) => theme.app.header.hover.BG_COLOR};
  }
  &[aria-current="page"] {
    color: ${({ theme }) => theme.app.header.hover.TEXT_COLOR};
    background-color: ${({ theme }) => theme.app.header.hover.BG_COLOR};
  }
`;

const LeftNavbar: FunctionComponent = () => {

  return (
    <Container>
      <NavHeader>
        <div className="toggle-container">
          <ToggleContainer>
            <TagIcon />
          </ToggleContainer>
        </div>
        <div className="logo-container">
          <AppLogo />
        </div>
      </NavHeader>
      <NavMenu>
        {navs.map(({ id, label, href }) => {
          return (
            <StyledLink to={href} key={id}>
              <span>{label}</span>
            </StyledLink>
          );
        })}
      </NavMenu>
      <NavFooter></NavFooter>
    </Container>
  );
};

export default LeftNavbar;
