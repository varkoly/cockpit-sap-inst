// @ts-nocheck
/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useContext, useEffect, useState } from 'react';
import { Alert } from "@patternfly/react-core/dist/esm/components/Alert/index.js";
import { Card, CardBody, CardHeader, CardTitle } from "@patternfly/react-core/dist/esm/components/Card/index.js";
import { EmptyStatePanel } from "cockpit-components-empty-state.jsx";
import cockpit from 'cockpit';
import { Nav, NavItem, NavList } from '@patternfly/react-core/dist/esm/components/Nav';
import { Installation } from './components/installation';
import { InstalledSystem } from './components/installed-system';
import { readSapInstallations } from './common/common';
import { SapDataContext, SapDataProvider } from './contexts/SapDataContext';
import disks from './common/disks';

const _ = cockpit.gettext;

export const Application = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        disks.init(() => {
            console.log("Disks Initialized")
            setInitialized(true)
        })

    }, []);

    const [activeItem, setActiveItem] = React.useState('installed');
    const onSelect = (_event, result) => {
        setActiveItem(result.itemId)
        console.log(result.itemId)
    };

    if (initialized) {
        return (
            <SapDataProvider>
                <Card>
                    <CardTitle>{_("SAP Bussiness One Installer")}</CardTitle>
                    <CardHeader>
                        <Nav onSelect={onSelect} variant='horizontal-subnav'>
                            <NavList>
                                <NavItem preventDefault itemId="installed" key="installed" isActive={activeItem == 'installed'}>{_('Installed SAP Instants')}</NavItem>
                            </NavList>
                            <NavList>
                                <NavItem preventDefault itemId="install" key="install" isActive={activeItem == 'install'}>{_('Install SAP Products')}</NavItem>
                            </NavList>
                        </Nav>
                    </CardHeader>
                    <CardBody>
                        {activeItem == 'install' && <Installation />}
                        {activeItem == 'installed' && <InstalledSystem />}
                    </CardBody>
                </Card>
            </SapDataProvider>
        );
    }else{
        return  <EmptyStatePanel loading title={_("Loading...")} />;
    }
};
