import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BoxHeader from "../../components/BoxHeader";
import DashBoardBox from "../../components/DashBoardBox";
import { useGetKpisQuery, useGetProductsQuery } from "../../state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];
const Row2 = () => {
  const { data: productData } = useGetProductsQuery();
  const { data: operationalData } = useGetKpisQuery();
  const { palette } = useTheme();
  //Set up colors for piechart
  const pieColors = [palette.primary[800], palette.primary[300]];
  //Create variable OperationnalWxpenese
  const operationalExpenses = useMemo(() => {
    return (
      //when data exist
      operationalData &&
      operationalData[0]?.monthlyData?.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            //grab first three letters
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);
  //console.log("data:", data);
  return (
    <>
      <DashBoardBox gridArea="d">
        <BoxHeader title="Operational vs Non-Operational " sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "14px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              style={{ fontSize: "14px" }}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              style={{ fontSize: "14px" }}
              axisLine={false}
            />

            <Tooltip />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashBoardBox>
      <DashBoardBox gridArea="e">
        <PieChart
          width={100}
          height={100}
          margin={{
            top: 0,
            right: -10,
            left: 10,
            bottom: 0,
          }}
        >
          <Pie
            stroke="none"
            data={pieData}
            innerRadius={18}
            outerRadius={38}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
      </DashBoardBox>
      <DashBoardBox gridArea="f"></DashBoardBox>
    </>
  );
};

export default Row2;
