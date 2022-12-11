import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getOptions(metric) {
  return {
    // type: 'line',
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          text: 'date',
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: metric
        },
        suggestedMin: 1,
        suggestedMax: 4
      }
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${metric}`,
      },
    },
  };
}

export default function Area({ type, data }) {
  return <Line options={getOptions(type)} data={data} />;
}
