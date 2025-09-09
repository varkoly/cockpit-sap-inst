//@ts-nocheck
import React, { useContext, useEffect } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import cockpit from 'cockpit';
import { SapDataContext } from "../contexts/SapDataContext";
import { readSapInstallations } from "../common/common";
const _ = cockpit.gettext;

export const InstalledSystem = () => {

    const { sapData, updateNestedSapData } = useContext(SapDataContext);

    useEffect(() => {
        readSapInstallations(sapData)
        console.log(sapData)
    })

    if (sapData.installations.length == 0) {
        return (
            <h2>{_("No SAP Instant is installed")}</h2>
        )

    } else {
        return (
            <Table variant='compact'>
                <Thead>
                    <Tr>
                        <Th>SID</Th>
                        <Th>{_("Instant Number")}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sapData.installations.map((inst, rowIndex) => {
                        const isOddRow = (rowIndex + 1) % 2;
                        return (
                            <Tr key={inst.sid}>
                                <Td>{inst.sid}</Td>
                                <Td>{inst.instNumber}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        )
    }
}