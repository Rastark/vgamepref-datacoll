import { background, extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Box: {
            baseStyle: {
                padding: "var(--chakra-space-12)",
                bg: "blue.100",
                fontWeight: "bold"
            },
            defaultProps: {
                size: 'lg', // default is md
                variant: 'sm', // default is solid
                colorScheme: 'green', // default is gray
            },
        }
    }
})

export default theme;