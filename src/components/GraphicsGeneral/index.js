import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const GraphicsGeneral = ({
  dataHorizontal = [],
  dataHorizontalB = [],
  dataVertical = [],
  labels = { a: "Beneficios", b: "Otra Linea" },
}) => {
  var midata = {
    labels: dataHorizontal,
    datasets: [
      // Cada una de las líneas del gráfico
      {
        label: labels.a,
        data: dataVertical,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(99, 200, 132)",
        backgroundColor: "rgba(99, 200, 132, 0.5)",
        pointRadius: 6,
        pointBorderColor: "rgba(99, 200, 132)",
        pointBackgroundColor: "rgba(99, 200, 132)",
      },
      {
        label: labels.b,
        data: dataHorizontalB,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  var misoptions = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "rgb(100, 100, 100)" },
      },
    },
  };
  return (
    <>
      <Line data={midata} options={misoptions} />
    </>
  );
};
