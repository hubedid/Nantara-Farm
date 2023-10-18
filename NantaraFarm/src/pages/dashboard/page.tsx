import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Select, {
  IndicatorSeparatorProps,
  ValueContainerProps,
  components,
} from "react-select";
import DrawerContainer from "./components/drawerContainer";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CameraRearOutlinedIcon from "@mui/icons-material/CameraRearOutlined";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { get, getWithAuth } from "../../api/api";
import { toastError, toastSuccess } from "./components/toast";

function Dashboard() {
  const twentyeightdays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28
  ];
  let twentyeightdata = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  const thirtydays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  let thirtydata = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  const thirtyonedays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let thirtyonedata = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  const daysPerMonth = [
    thirtyonedays, // January
    twentyeightdays,   // February
    thirtyonedays, // March
    thirtydays,      // April
    thirtyonedays,   // May
    thirtydays,      // June
    thirtyonedays,   // July
    thirtyonedays,   // August
    thirtydays,      // September
    thirtyonedays,   // October
    thirtydays,      // November
    thirtyonedays    // December
  ];
  const dataPerMonth = [
    thirtyonedata, // January
    twentyeightdata,   // February
    thirtyonedata, // March
    thirtydata,      // April
    thirtyonedata,   // May
    thirtydata,      // June
    thirtyonedata,   // July
    thirtyonedata,   // August
    thirtydata,      // September
    thirtyonedata,   // October
    thirtydata,      // November
    thirtyonedata    // December
  ];

  const options = [
    { value: 0, label: "Januari" },
    { value: 1, label: "Februari" },
    { value: 2, label: "Maret" },
    { value: 3, label: "April" },
    { value: 4, label: "Mei" },
    { value: 5, label: "Juni" },
    { value: 6, label: "Juli" },
    { value: 7, label: "Agustus" },
    { value: 8, label: "September" },
    { value: 9, label: "Oktober" },
    { value: 10, label: "November" },
    { value: 11, label: "Desember" },
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isGraphLoading, setIsGraphLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [graphAxis, setGraphAxis] = useState<number[]>([]);
  const [cameraList, setCameraList] = useState<any[]>([
    { nama: "Camera 3", status: "ON" },
    { nama: "Camera 1", status: "OFF" },
    { nama: "Camera 3", status: "ON" },
    { nama: "Camera 1", status: "OFF" },
    { nama: "Camera 3", status: "ON" },
    { nama: "Camera 3", status: "ON" },
    { nama: "Camera 3", status: "ON" },
    { nama: "Camera 3", status: "ON" },
  ]);

  const token = localStorage.getItem("access_token");
  const getDataGrafik = async () => {
    setIsGraphLoading(true);
    // if (token) {
      try {
        // setTrigger(false);
        const grafik = await get("avg-weight-per-specific-month?month="+(currentMonth+1));
        console.log(grafik)
        setData(
          grafik.data.data.map((data: any) => {
            return {
              date: data.date,
              average_weight: data.average_weight,
            };
          })
        );
        console.log(currentMonth)
        // let newMonthData = Array(graphAxis.length).fill(0);
        // console.log(newMonthData)
        setGraphAxis(daysPerMonth[currentMonth]);
        // dataPerMonth[currentMonth-1] = newMonthData;
        // data.forEach((item, index) => {
        //     let dateStr = item.date.toString().substr(8,2);
        //     if (dateStr[0] === "0"){
        //       dateStr = dateStr[1];
        //     }
        //     let date = parseInt(dateStr);
            
        //     console.log(date);
        //     newMonthData[date-1] = item.average_weight;
        // })
        // setGraphData(dataPerMonth[currentMonth]);
        toastSuccess(grafik.data.meta.message);
        setTrigger(true);
      } catch (error) {
        toastError("Get Monthly Data Graph Failed");
        console.log(error)
      } 
      // finally {
      //   // setIsGraphLoading(false)
      // }
    // }
  };

  useEffect(() => {
    let newMonthData = Array(graphAxis.length).fill(0);
    console.log(newMonthData)
    if (newMonthData && data){
      data.forEach((item, index) => {
        let dateStr = item.date.toString().substr(8,2);
        if (dateStr[0] === "0"){
          dateStr = dateStr[1];
        }
        let date = parseInt(dateStr);
        
        console.log(date);
        newMonthData[date-1] = item.average_weight;
    })
    setGraphData(newMonthData);
    setIsGraphLoading(false);
    }
  },[trigger, currentMonth, graphAxis])

  useEffect(() => {
    getDataGrafik();
    // setGraphAxis(daysPerMonth[currentMonth]);
    // const newMonthData = Array(graphAxis.length).fill(0);
    // dataPerMonth[currentMonth-1] = newMonthData;
    // data.forEach((item, index) => {
    //     let date = item.date
    //     console.log(date);
    //     dataPerMonth[currentMonth][date] = item.average_weight
    // })
    // setGraphData(dataPerMonth[currentMonth])
  },[currentMonth])

  // useEffect(() => {
  //   // console.log(currentMonth);
  //   // console.log(graphAxis);
  //   // console.log(graphData);
  //   // if (
  //   //   currentMonth === 1 ||
  //   //   currentMonth === 3 ||
  //   //   currentMonth === 5 ||
  //   //   currentMonth === 7 ||
  //   //   currentMonth === 8 ||
  //   //   currentMonth === 10 ||
  //   //   currentMonth === 12
  //   // ) {
  //   //   setGraphAxis(thirtyonedays);
  //   // } else if (
  //   //   currentMonth === 4 ||
  //   //   currentMonth === 6 ||
  //   //   currentMonth === 9 ||
  //   //   currentMonth === 11
  //   // ) {
  //   //   setGraphAxis(thirtydays);
  //   // } else {
  //   //   setGraphAxis(twentyeightdays);
  //   // }
  // }, [trigger]);

  

  // Dropdown Styles
  //   const IndicatorSeparator = ({
  //     innerProps,
  //   }: IndicatorSeparatorProps<any>) => {
  //     return <span style={{backgroundColor: 'white', opacity: 0, display: 'none'}} {...innerProps} />;
  //   };
  //   const ValueContainer = ({
  //     children,
  //     ...props
  //   }: ValueContainerProps<any>) => (
  //     <components.ValueContainer {...props}>{children}</components.ValueContainer>
  //   );
  return (
    <>
      <DrawerContainer height="100vh">
        <Box bgcolor={"#F5F5F5"} sx={{ p: 3, width: "100%" }} overflow={"auto"}>
          <Box>
            {/* Box 1 */}
            <Typography color={"#000000"} fontWeight={"bold"} fontSize={36}>
              Selamat Datang Kembali!
            </Typography>
            <Box
              borderRadius={4}
              bgcolor={"#FFFFFF"}
              sx={{ boxShadow: "0px 4px 50px -7px rgba(54, 8, 192, 0.20)" }}
              padding={2.5}
              marginTop={2}
              display={"flex"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                paddingRight={3}
                borderRight={1}
                borderColor={"#C3C3C3"}
                height={"100%"}
              >
                <Box display={"flex"} gap={1}>
                  <Typography color={"#777879"} textAlign={"center"}>
                    Estimasi Berat Hari ini
                  </Typography>
                  <Box
                    bgcolor={"#EEF0F2"}
                    borderRadius={5}
                    display={"flex"}
                    alignItems={"center"}
                    paddingX={0.5}
                  >
                    <ArrowUpwardOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#000000", height: 16, width: 16 }}
                    />
                    <Typography sx={{ color: "#000000" }} fontSize={12}>
                      10.0%
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  marginTop={1}
                  fontSize={30}
                  color={"#FF7F48"}
                  fontWeight={600}
                >
                  3.02 Kg
                </Typography>
                <Typography color={"#000000"}>Wed, Jul 24</Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                paddingX={3}
                borderRight={1}
                borderColor={"#C3C3C3"}
              >
                <Typography color={"#777879"} textAlign={"center"}>
                  Kenaikan dari Kemarin
                </Typography>
                <Typography
                  marginTop={1}
                  fontSize={30}
                  color={"#FF7F48"}
                  fontWeight={600}
                >
                  2%
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                paddingX={3}
                borderColor={"#C3C3C3"}
              >
                <Box display={"flex"} gap={1}>
                  <Typography color={"#777879"} textAlign={"center"}>
                    Kenaikan dari Hari Pertama
                  </Typography>
                  <Box
                    bgcolor={"#EEF0F2"}
                    borderRadius={5}
                    display={"flex"}
                    alignItems={"center"}
                    paddingX={0.5}
                  >
                    <ArrowUpwardOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#000000", height: 16, width: 16 }}
                    />
                    <Typography sx={{ color: "#000000" }} fontSize={12}>
                      3.2%
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  marginTop={1}
                  fontSize={30}
                  color={"#FF7F48"}
                  fontWeight={600}
                >
                  10%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            marginTop={3.5}
            width={"100%"}
            gap={3.5}
            maxHeight={418}
            flexGrow={1}
          >
            {/* Box 2 */}
            <Box
              borderRadius={4}
              bgcolor={"#FFFFFF"}
              sx={{ boxShadow: "0px 4px 50px -7px rgba(54, 8, 192, 0.20)" }}
              padding={2.5}
              paddingBottom={0}
              maxWidth={"75%"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  color={"#000000"}
                  fontSize={22}
                  fontWeight={"bold "}
                >
                  Estimasi Berat Ayam (Kg)
                </Typography>
                <Select
                  required={false}
                  options={options}
                  placeholder={"Bulan Ini"}
                  onChange={(selectedOption: any) =>
                    selectedOption && setCurrentMonth(selectedOption.value)
                  }
                  isSearchable={false}
                  theme={(theme: any) => ({
                    ...theme,
                    borderRadius: 8,
                    border: "2px",

                    colors: {
                      ...theme.colors,
                      primary: "#FF7F48",
                    },
                  })}
                  styles={{
                    control: (baseStyles: any, state: any) => ({
                      ...baseStyles,
                      borderRadius: 50,
                      height: "38px",
                      backgroundColor: "#F5F5F5",
                      border: state.isFocused
                        ? "2px solid #FF7F48"
                        : "2px solid #6B6B6B",
                      "&:hover": {
                        borderColor: state.isFocused ? "#FF7F48" : "#FF7F48",
                      },
                    }),
                    singleValue: (base: any) => ({
                      ...base,
                      color: "#FF7F48",
                      textAlign: "center",
                    }),
                    valueContainer: (base: any) => ({
                      ...base,
                      paddingRight: 0,
                      color: "#FF7F48",
                    }),
                    indicatorSeparator: (base: any) => ({
                      ...base,
                      display: "none",
                    }),
                    menu: (base: any) => ({
                      ...base,
                      color: "#000000",
                      minWidth: "120px",
                    }),
                  }}
                />
              </Box>
              {
                isGraphLoading ? 
                <Typography>
                  Kontol
                </Typography>
                :
                <LineChart
                  xAxis={[{ data: graphAxis }]}
                  series={[
                    {
                      data: graphData,
                      color: "#FF7F48",
                    },
                  ]}
                  width={800}
                  height={360}
                />
              }
            </Box>
            <Box
              borderRadius={4}
              bgcolor={"#FFFFFF"}
              sx={{ boxShadow: "0px 4px 50px -7px rgba(54, 8, 192, 0.20)" }}
              padding={2.5}
              width={"25%"}
            >
              <Typography color={"#000000"} fontSize={22} fontWeight={"bold "}>
                Status Kamera
              </Typography>
              <Box sx={{ width: 1, overflow: "auto", height: 345 }}>
                {cameraList.map((item, index) => {
                  return (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      width={1}
                      marginTop={1}
                      key={index}
                      overflow={"auto"}
                    >
                      <Box
                        borderRadius={50}
                        bgcolor={"#F5F5F5"}
                        height={48}
                        width={48}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <CameraRearOutlinedIcon
                          sx={{ color: "#FF7F48" }}
                          fontSize="large"
                        />
                      </Box>
                      <Typography color={"#000000"}>{item.nama}</Typography>
                      <Typography fontWeight={600} color={"#FF7F48"}>
                        {item.status}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </DrawerContainer>
    </>
  );
}

export default Dashboard;
