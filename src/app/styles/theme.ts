import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
    fontFamily: 'SB Sans Text Mono, sans-serif',
    components: {
        Button: Button.extend({
            defaultProps: {
                color: '#5558fa',
            }
        }),
    },
})
