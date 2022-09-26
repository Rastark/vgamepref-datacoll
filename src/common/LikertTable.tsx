import { 
    Radio, 
    RadioGroup, 
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import LikertScale from "./LikertScale";

const LikertTable: React.FC<{}> = () => {
    const [value, setValue] = React.useState('1');
    useEffect(() => setValue('1'), []);

    return(
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Brief-HEXACO-Personality-Inventory</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Strongly Disagree</Th>
                        <Th>Disagree</Th>
                        <Th>Neutral</Th>
                        <Th>Agree</Th>
                        <Th>Strongly Agree</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr radioGroup="testradio">
                    <Td><LikertScale/></Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>


    )
}

export default LikertTable;