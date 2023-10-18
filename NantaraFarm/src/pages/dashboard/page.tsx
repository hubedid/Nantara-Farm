import { Box, Typography } from "@mui/material";
import DrawerContainer from "./drawerContainer";

function Dashboard() {
    return (
        <DrawerContainer height="100vh">
            <Box display={'flex'} flexDirection={'column'} bgcolor={"#F5F5F5"} sx={{ py: 3.5, px: 4, width: '100%' }}>
                <Typography color={"#000000"} fontWeight={"bold"} fontSize={40}>
                    Selamat Datang Kembali!
                </Typography>
                <Box >

                </Box>
            </Box>
        </DrawerContainer>
    );
}

export default Dashboard;